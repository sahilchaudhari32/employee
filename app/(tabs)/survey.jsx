import { router } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Button,
  Field,
  Header,
  Pill,
  SafeScreen,
  styles,
} from "@/components/SurveyUI";
import { useSurveys } from "@/context/SurveyContext";

export default function Survey() {
  const { draft, setDraft } = useSurveys();
  const update = (key, value) =>
    setDraft({ ...draft, [key]: value });
  const submit = () => {
    if (
      !draft.siteName.trim() ||
      !draft.clientName.trim() ||
      !draft.description.trim() ||
      !draft.date.trim()
    ) {
      Alert.alert(
        "Required fields",
        "Site, client, description and date are required.",
      );
      return;
    }
    router.push("/(tabs)/preview");
  };
  return (
    <SafeScreen>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 28 }}
        style={styles.screen}
      >
        <Header
          title="New survey"
          subtitle="Capture the essentials first"
        />
        <Field
          label="Site name *"
          placeholder="Enter Site Name"
          value={draft.siteName}
          onChangeText={(v) => update("siteName", v)}
        />
        <Field
          label="Client name *"
          placeholder="Company or contact"
          value={draft.clientName}
          onChangeText={(v) => update("clientName", v)}
        />
        <Field
          label="Description *"
          placeholder="What are you inspecting?"
          value={draft.description}
          onChangeText={(v) => update("description", v)}
          multiline
        />
        <Text style={styles.label}>Priority</Text>
        <View style={pageStyles.priorityRow}>
          {["Low", "Medium", "High"].map((p) => (
            <Pill
              key={p}
              label={p}
              active={draft.priority === p}
              onPress={() => update("priority", p)}
            />
          ))}
        </View>
        <Field
          label="Date *"
          placeholder="YYYY-MM-DD"
          value={draft.date}
          onChangeText={(v) => update("date", v)}
        />
        <Field
          label="Notes"
          placeholder="Optional field notes"
          value={draft.notes}
          onChangeText={(v) => update("notes", v)}
          multiline
        />
        <Button
          title="Continue to preview"
          onPress={submit}
        />
      </ScrollView>
    </SafeScreen>
  );
}

const pageStyles = StyleSheet.create({
  priorityRow: {
    flexDirection: "row",
    marginBottom: 16,
    marginTop: 4,
  },
});
