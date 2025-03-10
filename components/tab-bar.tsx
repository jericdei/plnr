import { LayoutChangeEvent, View } from "react-native";
import React, { ComponentProps, useState } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import TabBarButton from "./tab-bar-button";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export type IoniconsName = ComponentProps<typeof Ionicons>["name"];

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });

  const buttonWidth = dimensions.width / state.routes.length;

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View
      className="flex-row absolute bottom-8 justify-between items-center bg-indigo-50 py-2 rounded-full mx-16 shadow"
      onLayout={onTabBarLayout}
    >
      <Animated.View
        className="absolute bg-indigo-600 rounded-full mx-3"
        style={[
          animatedStyle,
          {
            height: dimensions.height - 15,
            width: buttonWidth - 20,
          },
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        let iconName: IoniconsName = route.name as IoniconsName;

        if (route.name === "index") {
          iconName = "home";
        }

        if (route.name === "courses") {
          iconName = "folder";
        }

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            duration: 1500,
          });

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.key}
            iconName={iconName}
            routeName={route.name}
            label={label.toString()}
            color={isFocused ? "white" : colors.text}
            isFocused={isFocused}
            href={buildHref(route.name, route.params)}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
}
