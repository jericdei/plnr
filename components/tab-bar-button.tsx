import { Ionicons } from "@expo/vector-icons";
import { PlatformPressable } from "@react-navigation/elements";
import { Text } from "react-native";
import { IoniconsName } from "./tab-bar";
import { cn } from "@/utils/cn";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";

interface TabBarButtonProps {
  iconName: IoniconsName;
  label: string;
  color: string;
  isFocused: boolean;
  routeName: string;
  href?: string;
  onPress: () => void;
  onLongPress: () => void;
}

export default function TabBarButton({
  iconName,
  label,
  color,
  isFocused,
  onPress,
  onLongPress,
  href,
  routeName,
}: TabBarButtonProps) {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      {
        duration: 350,
      }
    );
  }, [scale, isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 12]);

    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  return (
    <PlatformPressable
      href={href}
      onPress={onPress}
      onLongPress={onLongPress}
      className="flex-1"
    >
      <Animated.View
        style={animatedIconStyle}
        className={cn(
          "items-center gap-2 rounded-2xl py-1 h-full flex-col justify-center"
        )}
      >
        <Ionicons size={28} name={iconName} color={color} />

        {routeName !== "task-form-modal" && (
          <Animated.Text
            className={cn(
              "text-xs font-medium",
              isFocused ? "text-indigo-400" : "text-black"
            )}
            style={animatedTextStyle}
          >
            {label.toString()}
          </Animated.Text>
        )}
      </Animated.View>
    </PlatformPressable>
  );
}
