import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { router } from "expo-router";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
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
  return (
    <BlurView intensity={85} tint="light" style={drawerStyles.container}>
      <View style={drawerStyles.brand}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={drawerStyles.logo}
        />
        <Text style={drawerStyles.brandTitle}>Smart Survey</Text>
        <Text style={drawerStyles.brandSubtitle}>
          Field inspection workspace
        </Text>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={drawerStyles.menu}
      >
        {drawerItems.map(([label, route, icon]) => (
          <Pressable
            key={route}
            style={drawerStyles.item}
            android_ripple={{ color: "#BCEBFA" }}
            onPress={() => {
              props.navigation.closeDrawer();
              router.push(route as any);
            }}
          >
            <Ionicons
              name={icon as any}
              color="#328FC1"
              size={23}
              style={drawerStyles.itemIcon}
            />
            <Text style={drawerStyles.label}>{label}</Text>
          </Pressable>
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
    backgroundColor: "#DFF7FF",
    borderRadius: 18,
    height: 54,
    marginBottom: 14,
    resizeMode: "contain",
    width: 54,
  },
  brandTitle: { color: "#FFFFFF", fontSize: 24, fontWeight: "900" },
  brandSubtitle: { color: "#C7F1F5", marginTop: 4 },
  menu: { paddingHorizontal: 12, paddingTop: 18 },
  item: {
    alignItems: "center",
    borderRadius: 14,
    flexDirection: "row",
    marginVertical: 3,
    minHeight: 52,
    paddingHorizontal: 16,
  },
  itemIcon: { marginRight: 16 },
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
