import { router, useLocalSearchParams } from "expo-router";
import { Alert, Image, ScrollView, Text } from "react-native";
import { Button, Card, Header, colors, styles } from "@/components/SurveyUI";
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
    <ScrollView style={styles.screen}>
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
          <Text key={label} style={{ color: colors.ink, marginBottom: 12 }}>
            <Text style={{ fontWeight: "800" }}>{label}: </Text>
            {value}
          </Text>
        ))}
        {data.photo && (
          <Image
            source={{ uri: data.photo }}
            style={{ height: 180, borderRadius: 12, marginTop: 4 }}
          />
        )}
      </Card>
      {!id && (
        <>
          <Button title="Edit survey" secondary onPress={() => router.back()} />
          <Button title="Submit survey" onPress={submit} />
        </>
      )}
    </ScrollView>
  );
}
