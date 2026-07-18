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
import { BlurView } from "expo-blur";
import { StyleSheet, Text, View } from "react-native";
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
    <BlurView intensity={85} tint="light" style={drawerStyles.container}>
      <View style={drawerStyles.brand}>
        <View style={drawerStyles.logo}>
          <Text style={drawerStyles.logoText}>SF</Text>
        </View>
        <Text style={drawerStyles.brandTitle}>Smart Field</Text>
        <Text style={drawerStyles.brandSubtitle}>Survey workspace</Text>
      </View>
      <DrawerContentScrollView {...props} contentContainerStyle={drawerStyles.menu}>
      {drawerItems.map(([label, route]) => (
        <DrawerItem
          key={route}
          label={label}
          labelStyle={drawerStyles.label}
          style={drawerStyles.item}
          onPress={() => {
            navigation.dispatch(DrawerActions.closeDrawer());
            router.push(route as any);
          }}
        />
      ))}
      </DrawerContentScrollView>
    </BlurView>
  );
}

const drawerStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "rgba(226,249,251,0.92)" },
  brand: {
    backgroundColor: "#087EA4",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    padding: 24,
    paddingTop: 54,
  },
  logo: {
    alignItems: "center",
    backgroundColor: "#DDF6FA",
    borderRadius: 18,
    height: 54,
    justifyContent: "center",
    marginBottom: 14,
    width: 54,
  },
  logoText: { color: "#087EA4", fontSize: 18, fontWeight: "900" },
  brandTitle: { color: "#FFFFFF", fontSize: 24, fontWeight: "900" },
  brandSubtitle: { color: "#C7F1F5", marginTop: 4 },
  menu: { paddingHorizontal: 12, paddingTop: 18 },
  item: { borderRadius: 14, marginVertical: 3 },
  label: { color: "#0B2942", fontSize: 15, fontWeight: "700" },
});

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
