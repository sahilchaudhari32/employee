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
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SurveyProvider } from "@/context/SurveyContext";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

const drawerItems = [
  ["Dashboard", "/(tabs)", "home-outline"],
  ["New Survey", "/(tabs)/survey", "create-outline"],
  ["Survey History", "/(tabs)/history", "time-outline"],
  ["Camera", "/(tabs)/camera", "camera-outline"],
  ["Contacts", "/(tabs)/contacts", "people-outline"],
  ["Location", "/(tabs)/location", "location-outline"],
  ["Clipboard", "/(tabs)/clipboard", "clipboard-outline"],
  ["Profile", "/(tabs)/profile", "person-outline"],
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
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={drawerStyles.menu}
      >
        {drawerItems.map(([label, route, icon]) => (
          <DrawerItem
            key={route}
            label={label}
            labelStyle={drawerStyles.label}
            style={drawerStyles.item}
            icon={({ color, size }) => (
              <Ionicons name={icon as any} color={color} size={size} />
            )}
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
  container: { flex: 1, backgroundColor: "rgba(223,247,255,0.9)" },
  brand: {
    backgroundColor: "#328FC1",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    padding: 24,
    paddingTop: 54,
  },
  logo: {
    alignItems: "center",
    backgroundColor: "#DFF7FF",
    borderRadius: 18,
    height: 54,
    justifyContent: "center",
    marginBottom: 14,
    width: 54,
  },
  logoText: { color: "#328FC1", fontSize: 18, fontWeight: "900" },
  brandTitle: { color: "#FFFFFF", fontSize: 24, fontWeight: "900" },
  brandSubtitle: { color: "#C7F1F5", marginTop: 4 },
  menu: { paddingHorizontal: 12, paddingTop: 18 },
  item: { borderRadius: 14, marginVertical: 3 },
  label: { color: "#123B5D", fontSize: 15, fontWeight: "700" },
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
