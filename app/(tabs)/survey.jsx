import { router } from "expo-router";
import * as Location from "expo-location";
import { useState } from "react";
import {
  ActivityIndicator,
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
  const [locationLoading, setLocationLoading] = useState(false);
  const update = (key, value) => setDraft({ ...draft, [key]: value });
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
  const captureLocation = async () => {
    setLocationLoading(true);
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Permission required",
          "Location access is needed for this survey.",
        );
        return;
      }
      const result = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      update("location", {
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
        accuracy: result.coords.accuracy,
      });
    } catch {
      Alert.alert("Location error", "Unable to capture the current location.");
    } finally {
      setLocationLoading(false);
    }
  };
  return (
    <SafeScreen>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 28 }}
        style={styles.screen}
      >
        <Header title="New survey" subtitle="Capture the essentials first" />
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
        <View style={pageStyles.locationCard}>
          <View style={pageStyles.locationHeader}>
            <Text style={pageStyles.locationTitle}>Survey location</Text>
            <Text style={pageStyles.locationStatus}>
              {draft.location ? "Captured" : "Optional"}
            </Text>
          </View>
          {draft.location ? (
            <Text style={pageStyles.locationValue}>
              {draft.location.latitude.toFixed(6)},{" "}
              {draft.location.longitude.toFixed(6)}
              {draft.location.accuracy
                ? `  ·  ±${Math.round(draft.location.accuracy)}m`
                : ""}
            </Text>
          ) : (
            <Text style={pageStyles.locationEmpty}>
              Add the site coordinates to this survey.
            </Text>
          )}
          <Button
            title={
              locationLoading
                ? "Getting location..."
                : draft.location
                  ? "Refresh location"
                  : "Get current location"
            }
            secondary
            onPress={captureLocation}
          />
          {locationLoading && (
            <ActivityIndicator color="#328FC1" style={pageStyles.loader} />
          )}
        </View>
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
        <Button title="Continue to preview" onPress={submit} />
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
  locationCard: {
    backgroundColor: "rgba(255,255,255,0.68)",
    borderColor: "rgba(255,255,255,0.85)",
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 18,
    padding: 16,
  },
  locationHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationTitle: { color: "#123B5D", fontSize: 16, fontWeight: "800" },
  locationStatus: { color: "#328FC1", fontSize: 12, fontWeight: "700" },
  locationValue: { color: "#123B5D", fontSize: 14, marginTop: 12 },
  locationEmpty: { color: "#5F7890", marginTop: 12 },
  loader: { marginTop: 10 },
});
