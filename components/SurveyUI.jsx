import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const colors = {
  ink: "#0B2942",
  muted: "#5D7890",
  primary: "#087EA4",
  pale: "#DDF6FA",
  background: "#EAFBFC",
  border: "rgba(255,255,255,0.75)",
  white: "#FFFFFF",
  danger: "#DC2626",
  success: "#059669",
  glass: "rgba(255,255,255,0.72)",
  water: "#C7F1F5",
};
export function Header({ title, subtitle, back = false }) {
  return (
    <View style={styles.header}>
      {back && (
        <Pressable
          onPress={() => router.back()}
          style={styles.back}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color={colors.ink}
          />
        </Pressable>
      )}
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </View>
    </View>
  );
}
/** @param {{ children: any, style?: any }} props */
export function SafeScreen({
  children,
  style = undefined,
}) {
  return (
    <SafeAreaView style={[styles.safe, style]}>
      {children}
    </SafeAreaView>
  );
}
/** @param {{ children: any, style?: any }} props */
export function Card({ children, style = undefined }) {
  return (
    <View style={[styles.card, style]}>{children}</View>
  );
}
export function Field({ label, ...props }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor="#9CA3AF"
        style={[
          styles.input,
          props.multiline && styles.multiline,
        ]}
        {...props}
      />
    </View>
  );
}
export function Button({
  title,
  onPress,
  secondary = false,
  danger = false,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        secondary && styles.secondary,
        danger && styles.danger,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          secondary && styles.secondaryText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}
export function Pill({ label, active, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.pill, active && styles.pillActive]}
    >
      <Text
        style={[
          styles.pillText,
          active && styles.pillTextActive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}
export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  screen: {
    flex: 1,
    backgroundColor: colors.background,
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
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.ink,
    letterSpacing: -0.5,
  },
  subtitle: { color: colors.muted, marginTop: 3 },
  card: {
    backgroundColor: colors.glass,
    borderRadius: 20,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
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
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    alignItems: "center",
    marginTop: 4,
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
