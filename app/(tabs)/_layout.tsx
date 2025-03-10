import TaskFormButton from "@/components/button/task-form-button";
import TabBar from "@/components/tab-bar";
import { colors } from "@/utils/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.indigo["400"],
        }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            animation: "shift",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="courses"
          options={{
            title: "Courses",
            headerShown: false,
            animation: "shift",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="folder" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
            headerShown: false,
            animation: "shift",
            tabBarIcon: ({ color }) => (
              <Ionicons size={28} name="calendar" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
