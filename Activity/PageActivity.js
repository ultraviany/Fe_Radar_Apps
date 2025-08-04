import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import TabButton from "./ActivityTabButton";
import ActivityCard from "./ActivityCard";
import { allActivities, commentsOnly, likedOnly } from "./ActivityService";
import { Ionicons } from "@expo/vector-icons";

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState("Semua");

  const getData = () => {
    if (activeTab === "Komentar") return commentsOnly;
    if (activeTab === "Disukai") return likedOnly;
    return allActivities;
  };

  return (
    <View style={styles.container}>
      <View style={styles.textHeader}>
        <Ionicons name="time" size={20} color="#2F5C9A" />
        <Text style={styles.header}>Aktivitas</Text>
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

      <ScrollView style={styles.scrollView}>
        {getData().map((item) => (
          <ActivityCard key={item.id} data={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 15,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 9,
  },
  textHeader: {
    fontSize: 18,
    fontWeight: "bold",
    flexDirection: "row",
    marginBottom: 15,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 12,
    // paddingHorizontal:12,
  },
  scrollView: {
    flex: 1,
  },
});
