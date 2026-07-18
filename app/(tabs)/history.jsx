import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
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
        (s) =>
          (priority === "All" || s.priority === priority) &&
          `${s.siteName} ${s.clientName}`
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
        <View style={{ flexDirection: "row", marginBottom: 12 }}>
          {["All", "High", "Medium", "Low"].map((p) => (
            <Pill
              key={p}
              label={p}
              active={priority === p}
              onPress={() => setPriority(p)}
            />
          ))}
        </View>
        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text
              style={{
                textAlign: "center",
                color: colors.muted,
                marginTop: 30,
              }}
            >
              No surveys found.
            </Text>
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
              <Card>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "800",
                      fontSize: 16,
                      color: colors.ink,
                    }}
                  >
                    {item.siteName}
                  </Text>
                  <Text
                    style={{
                      color:
                        item.priority === "High" ? "#DC2626" : colors.primary,
                      fontWeight: "700",
                    }}
                  >
                    {item.priority}
                  </Text>
                </View>
                <Text style={{ color: colors.muted, marginTop: 6 }}>
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
                  <Text
                    style={{
                      color: colors.danger,
                      marginTop: 12,
                      fontWeight: "700",
                    }}
                  >
                    Delete
                  </Text>
                </Pressable>
              </Card>
            </Pressable>
          )}
        />
      </View>
    </SafeScreen>
  );
}
