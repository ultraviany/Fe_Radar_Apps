import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import TabButton from "./ActivityTabButton";
import ActivityCard from "./ActivityCard";
import { Ionicons } from "@expo/vector-icons";
import { useActivities } from "./ActivityService";

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState("Semua");
  const { comments, likes, activities, loading } = useActivities();

  const getData = () => {
    if (activeTab === "Komentar") return comments;
    if (activeTab === "Disukai") return likes;
    return activities;
  };

  // 🔥 Tambahin di sini untuk cek data sebelum render
  console.log("🔥 Rendered Data:", getData());

  return (
    <View style={styles.container}>
      <View style={styles.textHeader}>
        <Ionicons name="time" size={20} color="#2F5C9A" />
        <Text style={styles.header}>Aktivitas ({getData().length})</Text>
      </View>

      <View style={styles.tabContainer}>
        <TabButton
          label="Semua Aktivitas"
          active={activeTab === "Semua"}
          onPress={() => setActiveTab("Semua")}
        />
        <TabButton
          label="Komentar"
          active={activeTab === "Komentar"}
          onPress={() => setActiveTab("Komentar")}
        />
        <TabButton
          label="Berita disukai"
          active={activeTab === "Disukai"}
          onPress={() => setActiveTab("Disukai")}
        />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#2F5C9A"
          style={{ marginTop: 30 }}
        />
      ) : (
        <ScrollView style={styles.scrollView}>
          {getData().map((item, idx) => (
            <ActivityCard key={`${item.type}-${item.id}`} data={item} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 15,
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 9,
  },
  textHeader: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  scrollView: {
    flex: 1,
  },
});
