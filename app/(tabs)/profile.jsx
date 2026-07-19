import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import {
  Card,
  Header,
  SafeScreen,
  colors,
  styles,
} from "@/components/SurveyUI";
import { useSurveys } from "@/context/SurveyContext";

export default function Profile() {
  const { surveys } = useSurveys();

  return (
    <SafeScreen>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={profileStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <Header title="Profile" subtitle="Your field survey workspace" />

        <Card style={profileStyles.profileCard}>
          <View style={profileStyles.avatar}>
            <Text style={profileStyles.avatarText}>SC</Text>
          </View>
          <View style={profileStyles.profileInfo}>
            <Text style={profileStyles.name}>Sahil Chaudhari</Text>
            <Text style={profileStyles.role}>Field Survey Student</Text>
            <View style={profileStyles.verified}>
              <Ionicons
                name="checkmark-circle"
                size={15}
                color={colors.success}
              />
              <Text style={profileStyles.verifiedText}>Active account</Text>
            </View>
          </View>
        </Card>

        <View style={profileStyles.statsRow}>
          <Stat label="Surveys" value={surveys.length} />
          <Stat
            label="Completed"
            value={
              surveys.filter((survey) => survey.status === "Completed").length
            }
          />
          <Stat label="Course" value="CSE" />
        </View>

        <Text style={profileStyles.sectionTitle}>Student details</Text>
        <Card style={profileStyles.detailsCard}>
          <InfoRow
            icon="card-outline"
            label="Enrollment"
            value="SUK250054CE091"
          />
          <InfoRow
            icon="school-outline"
            label="Program"
            value="B.Tech Computer Science"
          />
          <InfoRow
            icon="calendar-outline"
            label="Workspace"
            value="Smart Survey"
            last
          />
        </Card>

        <Text style={profileStyles.sectionTitle}>About the app</Text>
        <Card style={profileStyles.aboutCard}>
          <View style={profileStyles.aboutIcon}>
            <Ionicons
              name="shield-checkmark-outline"
              size={24}
              color={colors.primary}
            />
          </View>
          <Text style={profileStyles.aboutText}>
            Capture reliable site information, photos, contacts, notes, and
            location details in one field-ready workspace.
          </Text>
        </Card>
      </ScrollView>
    </SafeScreen>
  );
}

function Stat({ label, value }) {
  return (
    <View style={profileStyles.stat}>
      <Text style={profileStyles.statValue}>{value}</Text>
      <Text style={profileStyles.statLabel}>{label}</Text>
    </View>
  );
}

function InfoRow({ icon, label, value, last = false }) {
  return (
    <View style={[profileStyles.infoRow, !last && profileStyles.infoBorder]}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <View style={profileStyles.infoText}>
        <Text style={profileStyles.infoLabel}>{label}</Text>
        <Text style={profileStyles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const profileStyles = StyleSheet.create({
  content: { paddingBottom: 32 },
  profileCard: {
    alignItems: "center",
    backgroundColor: colors.primary,
    flexDirection: "row",
    padding: 22,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: "#DBEAFE",
    borderRadius: 34,
    height: 68,
    justifyContent: "center",
    width: 68,
  },
  avatarText: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: "900",
  },
  profileInfo: { marginLeft: 16 },
  name: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "900",
  },
  role: { color: "#DBEAFE", marginTop: 4 },
  verified: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    marginTop: 9,
  },
  verifiedText: {
    color: "#BBF7D0",
    fontSize: 12,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 22,
  },
  stat: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 16,
    flex: 1,
    padding: 14,
  },
  statValue: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: "900",
  },
  statLabel: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4,
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10,
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
  },
  infoRow: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 13,
  },
  infoBorder: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  infoText: { marginLeft: 13 },
  infoLabel: { color: "#111827", fontSize: 12 },
  infoValue: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 3,
  },
  aboutCard: { alignItems: "center", flexDirection: "row" },
  aboutIcon: {
    alignItems: "center",
    backgroundColor: colors.pale,
    borderRadius: 22,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  aboutText: {
    color: colors.muted,
    flex: 1,
    lineHeight: 20,
    marginLeft: 14,
  },
});
