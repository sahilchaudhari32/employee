import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CameraScreen() {
  const cameraRef = useRef(null);

  const [permission, requestPermission] = useCameraPermissions();

  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [captureTime, setCaptureTime] = useState("");

  useEffect(() => {
    const getPermission = async () => {
      try {
        if (!permission?.granted) {
          const result = await requestPermission();
          if (!result?.granted) {
            setLoading(false);
            return;
          }
        }

        await MediaLibrary.requestPermissionsAsync();
        setLoading(false);
      } catch (error) {
        console.error("Permission error:", error);
        setLoading(false);
      }
    };

    getPermission();
  }, [permission, requestPermission]);

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    try {
      const result = await cameraRef.current.takePictureAsync();

      setPhoto(result.uri);
      setCaptureTime(new Date().toLocaleString());
    } catch (_error) {
      Alert.alert("Error", "Unable to capture photo.");
    }
  };

  const savePhoto = async () => {
    try {
      await MediaLibrary.saveToLibraryAsync(photo);
      Alert.alert("Success", "Photo saved to gallery.");
    } catch (_error) {
      Alert.alert("Error", "Failed to save photo.");
    }
  };

  const retakePhoto = () => {
    setPhoto(null);
    setCaptureTime("");
  };

  const deletePhoto = () => {
    Alert.alert(
      "Delete Photo",
      "Are you sure you want to delete this photo?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setPhoto(null);
            setCaptureTime("");
          },
        },
      ]
    );
  };

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>
          Camera permission is required.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={{ marginTop: 10 }}>Opening Camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!photo ? (
        <>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="back"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={takePhoto}
          >
            <Text style={styles.buttonText}>
              Capture Photo
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Image
            source={{ uri: photo }}
            style={styles.image}
          />

          <Text style={styles.time}>
            Capture Time: {captureTime}
          </Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#28A745" }]}
            onPress={savePhoto}
          >
            <Text style={styles.buttonText}>
              Save Image
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#FF9800" }]}
            onPress={retakePhoto}
          >
            <Text style={styles.buttonText}>
              Retake Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#E53935" }]}
            onPress={deletePhoto}
          >
            <Text style={styles.buttonText}>
              Delete Photo
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 15,
  },

  camera: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },

  image: {
    flex: 1,
    borderRadius: 12,
    resizeMode: "cover",
  },

  button: {
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  time: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 12,
    fontWeight: "600",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  permissionText: {
    fontSize: 16,
    marginBottom: 15,
  },
});
