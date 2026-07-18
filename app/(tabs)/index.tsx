import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { router, Router } from "expo-router";

export default function Dashboard() {
  const student = {
    name: "Sahil Chaudhari",
    enrollment: "SUK250054CE091",
    course: "B.Tech CSE",
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.welcome}>👋 Welcome, {student.name}</Text>
        <Text style={styles.subText}> Have a great day! Complete your surveys on time. </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Student Details</Text>

        <Text style={styles.info}>
          <Text style={styles.label}>Name:</Text> {student.name}
        </Text>

        <Text style={styles.info}>
          <Text style={styles.label}>Enrollment:</Text>{" "}
          {student.enrollment}
        </Text>

        <Text style={styles.info}>
          <Text style={styles.label}>Course:</Text> {student.course}
        </Text>
      </View>

      <View style={styles.countCard}>
        <Text style={styles.cardTitle}>Today's Survey Count</Text>
        <Text style={styles.count}>5</Text>
      </View>


      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionCard} onPress={()=> router.push("/(tabs)/survey")} >
          <Text style={styles.actionText}>Start Survey</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={()=> router.push("/(tabs)/history")} >
          <Text style={styles.actionText}>Survey History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={()=> router.push("/(tabs)/contacts")} >
          <Text style={styles.actionText}>Contacts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={()=> router.push("/(tabs)/preview")} >
          <Text style={styles.actionText}>Survay Preview</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Survey Summary</Text>

        <Text style={styles.summary}>Health Survey - Completed</Text>
        <Text style={styles.summary}>Education Survey - Completed</Text>
        <Text style={styles.summary}>Feedback Survey - Pending</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },

  header: {
    backgroundColor: "skyblue",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  welcome: {
    fontSize: 20,
    fontWeight: "bold",
  },

  subText: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },

  info: {
    fontSize: 16,
    marginTop: 5,
  },

  label: {
    fontWeight: "bold",
  },

  countCard: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },

  count: {
    fontSize: 35,
    color: "white",
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  actionCard: {
    width: "48%",
    backgroundColor: "#e6e6e6",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },

  actionText: {
    fontSize: 15,
    fontWeight: "bold",
  },

  summary: {
    fontSize: 15,
    marginTop: 5,
  },
});