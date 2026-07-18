import * as Clipboard from "expo-clipboard";
import * as Location from "expo-location";
import { useState } from "react";
import { Alert, ActivityIndicator, Text, View } from "react-native";
import { Button, Card, Header, colors, styles } from "@/components/SurveyUI";
export default function LocationScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const refresh = async () => {
    setLoading(true);
    const permission = await Location.requestForegroundPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Location access is needed.");
      setLoading(false);
      return;
    }
    const result = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    setData(result.coords);
    setLoading(false);
  };
  const copy = async () => {
    if (!data) return;
    await Clipboard.setStringAsync(`${data.latitude}, ${data.longitude}`);
    Alert.alert("Copied", "Current location copied to clipboard.");
  };
  return (
    <View style={styles.screen}>
      <Header
        title="Location"
        subtitle="Capture precise inspection coordinates"
      />
      <Card>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : data ? (
          <>
            <Text
              style={{ fontSize: 18, fontWeight: "800", color: colors.ink }}
            >
              Current position
            </Text>
            <Text style={{ marginTop: 14, color: colors.muted }}>
              Latitude: {data.latitude}
            </Text>
            <Text style={{ marginTop: 8, color: colors.muted }}>
              Longitude: {data.longitude}
            </Text>
            <Text style={{ marginTop: 8, color: colors.muted }}>
              Accuracy: {Math.round(data.accuracy || 0)} m
            </Text>
          </>
        ) : (
          <Text style={{ color: colors.muted }}>No location captured yet.</Text>
        )}
      </Card>
      <Button
        title={data ? "Refresh location" : "Get current location"}
        onPress={refresh}
      />
      <Button title="Copy current location" secondary onPress={copy} />
    </View>
  );
}
