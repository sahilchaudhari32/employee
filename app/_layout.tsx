import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
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
            name="modal"
            options={{ drawerItemStyle: { display: "none" } }}
          />
        </Drawer>
      </SurveyProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
