import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/db/drizzle/migrations";

import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { database, db } from "@/db";
import { Text, View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CurrentWeekProvider } from "@/providers/week";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { DefaultTheme } from "@/constants/theme";
import { ProfileProvider } from "@/providers/profile";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

const queryClient = new QueryClient();

export default function RootLayout() {
  useDrizzleStudio(database);

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <ProfileProvider>
          <CurrentWeekProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="task-form-modal"
                options={{
                  presentation: "formSheet",
                  headerShown: false,
                  sheetGrabberVisible: true,
                  sheetAllowedDetents: [0.4, 1.0],
                  contentStyle: {
                    backgroundColor: "white",
                  },
                }}
              />
              <Stack.Screen
                name="profile/edit"
                options={{
                  title: "Edit ID",
                  headerBackButtonDisplayMode: "minimal",
                }}
              />
            </Stack>
          </CurrentWeekProvider>
        </ProfileProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
