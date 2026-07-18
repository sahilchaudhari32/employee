import { router, useLocalSearchParams } from "expo-router";
import { Alert, Image, ScrollView, StyleSheet, Text } from "react-native";
import {
  Button,
  Card,
  Header,
  SafeScreen,
  colors,
  styles as uiStyles,
} from "@/components/SurveyUI";
import { useSurveys } from "@/context/SurveyContext";
export default function Preview() {
  const { draft, surveys, createSurvey } = useSurveys();
  const { id } = useLocalSearchParams();
  const data = id ? surveys.find((s) => s.id === id) || draft : draft;
  const submit = () => {
    if (id) {
      Alert.alert("Submitted", "This survey is already in history.");
      return;
    }
    const saved = createSurvey(data);
    Alert.alert("Survey submitted", `${saved.id} was saved successfully.`, [
      {
        text: "View history",
        onPress: () => router.replace("/(tabs)/history"),
      },
    ]);
  };
  return (
    <SafeScreen>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 28 }}
        style={uiStyles.screen}
      >
        <Header
          title="Survey preview"
          subtitle={id ? data.id : "Review before submitting"}
          back
        />
        <Card>
          {[
            ["Site", data.siteName],
            ["Client", data.clientName],
            ["Description", data.description],
            ["Priority", data.priority],
            ["Date", data.date],
            ["Contact", data.contact || "Not selected"],
            [
              "Location",
              data.location
                ? `${data.location.latitude.toFixed(5)}, ${data.location.longitude.toFixed(5)}`
                : "Not captured",
            ],
            ["Notes", data.notes || "No notes"],
          ].map(([label, value]) => (
            <Text key={label} style={styles.detail}>
              <Text style={styles.detailLabel}>{label}: </Text>
              {value}
            </Text>
          ))}
          {data.photo && (
            <Image source={{ uri: data.photo }} style={styles.photo} />
          )}
        </Card>
        {!id && (
          <>
            <Button
              title="Edit survey"
              secondary
              onPress={() => router.back()}
            />
            <Button title="Submit survey" onPress={submit} />
          </>
        )}
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  detail: { color: colors.ink, marginBottom: 12 },
  detailLabel: { fontWeight: "800" },
  photo: { borderRadius: 12, height: 180, marginTop: 4 },
});
