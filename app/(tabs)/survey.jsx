import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";

export default function CreateSurvey() {
  const [siteName, setSiteName] = useState("");
  const [clientName, setClientName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");

  const submitSurvey = () => {
    if ( siteName === "" || clientName === "" || description === "" || priority === "" || date === "" ) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    Alert.alert("Success", "Survey Created Successfully!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Survey</Text>

      <TextInput
        style={styles.input}
        placeholder="Site Name"
        value={siteName}
        onChangeText={setSiteName}
      />

      <TextInput
        style={styles.input}
        placeholder="Client Name"
        value={clientName}
        onChangeText={setClientName}
        required
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Priority (High/Medium/Low)"
        value={priority}
        onChangeText={setPriority}
        required
      />

      <TextInput
        style={styles.input}
        placeholder="Date (DD/MM/YYYY)"
        value={date}
        onChangeText={setDate}
        required
      />

      <TouchableOpacity style={styles.button} onPress={submitSurvey}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "skyblue",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});