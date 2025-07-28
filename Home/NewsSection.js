import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import NewsCard from "./NewsCard";

export default function NewsSection({
  title,
  data,
  onLike,
  onSave,
  isLiked,
  isNewsSaved,
  showMoreButton,
  navigation, // <-- Tambahkan navigation
}) {
  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {showMoreButton && (
          <TouchableOpacity>
            <Text style={styles.moreButton}>Lainnya</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.cardScroll}
      >
        {data.map((item, index) => (
          <NewsCard
            key={index}
            item={item}
            onLike={onLike}
            onSave={onSave}
            isLiked={isLiked(item.id)}
            isNewsSaved={isNewsSaved(item.id)}
            navigation={navigation} // <-- Kirim ke NewsCard
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  moreButton: {
    fontSize: 14,
    color: "#2F5C9A",
    fontWeight: "500",
  },
  cardScroll: {
    flexDirection: "row",
    marginBottom: 10,
  },
});
