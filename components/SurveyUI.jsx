import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const colors = {
  ink: "#123B5D",
  muted: "#5F7890",
  primary: "#328FC1",
  secondary: "#5B67D5",
  accent: "#22B8D6",
  pale: "#DFF7FF",
  background: "#DFF7FF",
  border: "rgba(255,255,255,0.3)",
  white: "#FFFFFF",
  danger: "#EF4444",
  success: "#22C55E",
  warning: "#F59E0B",
  glass: "rgba(255,255,255,0.68)",
  water: "#7FCDFF",
};
export function Header({ title, subtitle, back = false }) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      {back ? (
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Ionicons name="arrow-back" size={22} color={colors.ink} />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          style={styles.menuButton}
          accessibilityLabel="Open navigation menu"
        >
          <Ionicons name="menu" size={28} color={colors.primary} />
        </Pressable>
      )}
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
}
/** @param {{ children: any, style?: any }} props */
export function SafeScreen({ children, style = undefined }) {
  return (
    <LinearGradient
      colors={["#DFF7FF", "#7FCDFF", "#EEF2FF"]}
      style={styles.safe}
    >
      <SafeAreaView style={[styles.safeArea, style]}>{children}</SafeAreaView>
    </LinearGradient>
  );
}
/** @param {{ children: any, style?: any }} props */
export function Card({ children, style = undefined }) {
  return <View style={[styles.card, style]}>{children}</View>;
}
export function Field({ label, ...props }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor="#9CA3AF"
        style={[styles.input, props.multiline && styles.multiline]}
        {...props}
      />
    </View>
  );
}
export function Button({ title, onPress, secondary = false, danger = false }) {
  return (
    <Pressable onPress={onPress} style={styles.buttonWrap}>
      <LinearGradient
        colors={
          danger
            ? [colors.danger, "#F97316"]
            : secondary
              ? [colors.pale, "#E0E7FF"]
              : [colors.primary, colors.secondary]
        }
        style={styles.button}
      >
        <Text style={[styles.buttonText, secondary && styles.secondaryText]}>
          {title}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}
export function GlassCard({ children, style }) {
  return <Card style={style}>{children}</Card>;
}
export function GradientButton(props) {
  return <Button {...props} />;
}
export function Pill({ label, active, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.pill, active && styles.pillActive]}
    >
      <Text style={[styles.pillText, active && styles.pillTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}
export const styles = StyleSheet.create({
  safe: { flex: 1 },
  safeArea: { flex: 1 },
  screen: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
    paddingTop: 4,
  },
  back: { padding: 4 },
  menuButton: { padding: 4 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.ink,
    letterSpacing: -0.5,
  },
  subtitle: { color: colors.muted, marginTop: 3 },
  card: {
    backgroundColor: "rgba(255,255,255,0.42)",
    borderRadius: 20,
    borderColor: colors.border,
    borderWidth: 1,
    overflow: "hidden",
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  field: { marginBottom: 15 },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.ink,
    marginBottom: 7,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.64)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.9)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.ink,
  },
  multiline: { minHeight: 92, textAlignVertical: "top" },
  buttonWrap: {
    borderRadius: 14,
    marginTop: 4,
    overflow: "hidden",
  },
  button: {
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "800",
    fontSize: 16,
  },
  secondary: { backgroundColor: colors.pale },
  secondaryText: { color: colors.primary },
  danger: { backgroundColor: colors.danger },
  pill: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pillText: { color: colors.muted, fontWeight: "700" },
  pillTextActive: { color: colors.white },
});
