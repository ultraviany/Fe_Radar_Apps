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
    backgroundColor: "#2F5C9A",
    borderColor: "#2F5C9A",
  },
  inactiveTab: {
    backgroundColor: "#fff",
    borderColor: "#2F5C9A",
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
    color: "#2F5C9A",
  },
});
