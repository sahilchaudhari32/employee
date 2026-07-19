import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Card,
  Field,
  Header,
  Pill,
  SafeScreen,
  colors,
  styles,
} from "@/components/SurveyUI";
import { useSurveys } from "@/context/SurveyContext";

export default function History() {
  const { surveys, deleteSurvey } = useSurveys();
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("All");
  const list = useMemo(
    () =>
      surveys.filter(
        (survey) =>
          (priority === "All" || survey.priority === priority) &&
          `${survey.siteName} ${survey.clientName}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [surveys, query, priority],
  );

  return (
    <SafeScreen>
      <View style={styles.screen}>
        <Header
          title="Survey history"
          subtitle={`${surveys.length} saved inspections`}
        />
        <Field
          label="Search"
          placeholder="Search site or client"
          value={query}
          onChangeText={setQuery}
        />
        <View style={historyStyles.filterRow}>
          {["All", "High", "Medium", "Low"].map((item) => (
            <Pill
              key={item}
              label={item}
              active={priority === item}
              onPress={() => setPriority(item)}
            />
          ))}
        </View>
        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={historyStyles.empty}>No surveys found.</Text>
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/preview",
                  params: { id: item.id },
                })
              }
            >
              <Card style={historyStyles.card}>
                <View style={historyStyles.cardHeader}>
                  <Text style={historyStyles.siteName}>{item.siteName}</Text>
                  <Text
                    style={
                      item.priority === "High"
                        ? historyStyles.highPriority
                        : historyStyles.priority
                    }
                  >
                    {item.priority}
                  </Text>
                </View>
                <Text style={historyStyles.meta}>
                  {item.clientName} · {item.date}
                </Text>
                <Pressable
                  onPress={() =>
                    Alert.alert(
                      "Delete survey",
                      "Remove this survey from history?",
                      [
                        { text: "Cancel" },
                        {
                          text: "Delete",
                          style: "destructive",
                          onPress: () => deleteSurvey(item.id),
                        },
                      ],
                    )
                  }
                >
                  <Text style={historyStyles.delete}>Delete</Text>
                </Pressable>
              </Card>
            </Pressable>
          )}
        />
      </View>
    </SafeScreen>
  );
}

const historyStyles = StyleSheet.create({
  filterRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  empty: {
    color: colors.muted,
    marginTop: 30,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  siteName: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "800",
  },
  meta: {
    color: "#111827",
    marginTop: 6,
  },
  priority: {
    color: colors.primary,
    fontWeight: "700",
  },
  highPriority: {
    color: colors.danger,
    fontWeight: "700",
  },
  delete: {
    color: colors.danger,
    fontWeight: "700",
    marginTop: 12,
  },
});
