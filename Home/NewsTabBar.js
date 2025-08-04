import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";

const categories = ["All Epaper", "Radar Tulungagung", "Radar Blitar", "Radar Trenggalek"];

export default function NewsTabBar({ activeTab, setActiveTab }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.tab,
            activeTab === category ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab(category)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === category ? styles.activeText : styles.inactiveText,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    gap: 8,
    paddingVertical: 10,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
  },
  activeTab: {
    backgroundColor: "#1E4B8A",
    borderColor: "#1E4B8A",
  },
  inactiveTab: {
    backgroundColor: "#fff",
    borderColor: "#1E4B8A",
  },
  tabText: {
    fontSize: 12,
    fontWeight: "500",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inactiveText: {
    color: "#1E4B8A",
  },
});
