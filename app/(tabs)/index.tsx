import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { Card, Header, colors, styles } from "@/components/SurveyUI";
import { useSurveys } from "@/context/SurveyContext";

const quickActions = [
  { label: "New Survey", route: "/(tabs)/survey" },
  { label: "History", route: "/(tabs)/history" },
  { label: "Camera", route: "/(tabs)/camera" },
  { label: "Location", route: "/(tabs)/location" },
];

export default function Dashboard() {
  const { surveys } = useSurveys();
  const today = new Date().toISOString().slice(0, 10);
  const todaysSurveyCount = surveys.filter(
    (survey: any) => survey.date === today,
  ).length;

  return (
    <ScrollView style={styles.screen}>
      <Header
        title="Good morning, Sahil"
        subtitle="Ready for your next inspection?"
      />

      <Card style={{ backgroundColor: colors.primary }}>
        <Text style={{ color: "#BFDBFE", fontWeight: "700" }}>
          TODAY&apos;S SURVEYS
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 42,
            fontWeight: "900",
            marginTop: 4,
          }}
        >
          {todaysSurveyCount}
        </Text>
        <Text style={{ color: "#DBEAFE" }}>
          Keep your field work moving.
        </Text>
      </Card>

      <Text
        style={{
          color: colors.ink,
          fontSize: 19,
          fontWeight: "800",
          marginBottom: 12,
        }}
      >
        Quick actions
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
        {quickActions.map(({ label, route }) => (
          <Pressable
            key={route}
            onPress={() => router.push(route as any)}
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 18,
              width: "47%",
            }}
          >
            <Text style={{ color: colors.ink, fontWeight: "800" }}>
              {label}
            </Text>
            <Text style={{ color: colors.muted, marginTop: 8 }}>
              Open module →
            </Text>
          </Pressable>
        ))}
      </View>

      <Text
        style={{
          color: colors.ink,
          fontSize: 19,
          fontWeight: "800",
          marginVertical: 16,
        }}
      >
        Recent surveys
      </Text>

      {surveys.slice(0, 3).map((survey: any) => (
        <Pressable
          key={survey.id}
          onPress={() =>
            router.push({
              pathname: "/(tabs)/preview",
              params: { id: survey.id },
            })
          }
        >
          <Card>
            <Text style={{ color: colors.ink, fontSize: 16, fontWeight: "800" }}>
              {survey.siteName}
            </Text>
            <Text style={{ color: colors.muted, marginTop: 5 }}>
              {survey.clientName} · {survey.date}
            </Text>
            <Text
              style={{
                color:
                  survey.priority === "High" ? "#DC2626" : colors.primary,
                fontWeight: "700",
                marginTop: 8,
              }}
            >
              {survey.priority} priority · {survey.status}
            </Text>
          </Card>
        </Pressable>
      ))}
    </ScrollView>
  );
}
