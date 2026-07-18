import * as Clipboard from "expo-clipboard";
import * as Location from "expo-location";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
} from "react-native";
import {
  Button,
  Card,
  Header,
  SafeScreen,
  colors,
  styles as uiStyles,
} from "@/components/SurveyUI";
export default function LocationScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const refresh = async () => {
    setLoading(true);
    const permission =
      await Location.requestForegroundPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Location access is needed.",
      );
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
    await Clipboard.setStringAsync(
      `${data.latitude}, ${data.longitude}`,
    );
    Alert.alert(
      "Copied",
      "Current location copied to clipboard.",
    );
  };
  return (
    <SafeScreen style={uiStyles.screen}>
      <Header
        title="Location"
        subtitle="Capture precise inspection coordinates"
      />
      <Card>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />
        ) : data ? (
          <>
            <Text style={styles.heading}>
              Current position
            </Text>
            <Text style={styles.latitude}>
              Latitude: {data.latitude}
            </Text>
            <Text style={styles.detail}>
              Longitude: {data.longitude}
            </Text>
            <Text style={styles.detail}>
              Accuracy: {Math.round(data.accuracy || 0)} m
            </Text>
          </>
        ) : (
          <Text style={styles.empty}>
            No location captured yet.
          </Text>
        )}
      </Card>
      <Button
        title={
          data ? "Refresh location" : "Get current location"
        }
        onPress={refresh}
      />
      <Button
        title="Copy current location"
        secondary
        onPress={copy}
      />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "800",
  },
  latitude: {
    color: colors.muted,
    marginTop: 14
  },

  detail: {
    color: colors.muted,
    marginTop: 8,
  },
  empty: {
    color: colors.muted
  },
});
