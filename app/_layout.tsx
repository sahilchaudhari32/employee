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
            options={{
              headerShown: false,
              drawerItemStyle: { display: "none" },
            }}
          />
          <Drawer.Screen name="dashboard" options={{ title: "Dashboard" }} />
          <Drawer.Screen name="survey" options={{ title: "New Survey" }} />
          <Drawer.Screen name="camera" options={{ title: "Camera" }} />
          <Drawer.Screen name="contacts" options={{ title: "Contacts" }} />
          <Drawer.Screen name="location" options={{ title: "Location" }} />
          <Drawer.Screen name="clipboard" options={{ title: "Clipboard" }} />
          <Drawer.Screen name="history" options={{ title: "Survey History" }} />
          <Drawer.Screen name="profile" options={{ title: "Profile" }} />
          <Drawer.Screen name="preview" options={{ title: "Survey Preview" }} />
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
