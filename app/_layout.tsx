import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Drawer } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SurveyProvider } from "@/context/SurveyContext";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SurveyProvider>
        <Drawer>
          <Drawer.Screen
            name="(tabs)"
            options={{ headerShown: false, title: "Dashboard" }}
          />
          <Drawer.Screen
            name="(tabs)/survey"
            options={{ title: "New Survey" }}
          />
          <Drawer.Screen name="(tabs)/camera" options={{ title: "Camera" }} />
          <Drawer.Screen
            name="(tabs)/contacts"
            options={{ title: "Contacts" }}
          />
          <Drawer.Screen
            name="(tabs)/location"
            options={{ title: "Location" }}
          />
          <Drawer.Screen
            name="(tabs)/clipboard"
            options={{ title: "Clipboard" }}
          />
          <Drawer.Screen
            name="(tabs)/history"
            options={{ title: "Survey History" }}
          />
          <Drawer.Screen
            name="modal"
            options={{ drawerItemStyle: { display: "none" } }}
          />
        </Drawer>
      </SurveyProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
