import {
  DarkTheme,
  DefaultTheme,
  DrawerActions,
  ThemeProvider,
  useNavigation,
} from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { router } from "expo-router";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SurveyProvider } from "@/context/SurveyContext";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

const drawerItems = [
  ["Dashboard", "/(tabs)"],
  ["New Survey", "/(tabs)/survey"],
  ["Survey History", "/(tabs)/history"],
  ["Camera", "/(tabs)/camera"],
  ["Contacts", "/(tabs)/contacts"],
  ["Location", "/(tabs)/location"],
  ["Clipboard", "/(tabs)/clipboard"],
  ["Profile", "/(tabs)/profile"],
];

function AppDrawerContent(props: any) {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      {drawerItems.map(([label, route]) => (
        <DrawerItem
          key={route}
          label={label}
          onPress={() => {
            navigation.dispatch(DrawerActions.closeDrawer());
            router.push(route as any);
          }}
        />
      ))}
    </DrawerContentScrollView>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SurveyProvider>
        <Drawer drawerContent={(props) => <AppDrawerContent {...props} />}>
          <Drawer.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              drawerItemStyle: { display: "none" },
            }}
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
