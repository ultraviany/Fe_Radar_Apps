import React from "react";
import { View, StyleSheet } from "react-native";
import NewsCard from "./NewsCard";

export default function NewsSection({
  data,
  onLike,
  onSave,
  isLiked,
  isNewsSaved,
  navigation,
}) {
  // Buat array berisi baris-baris (tiap baris berisi 2 item)
  const rows = [];
  for (let i = 0; i < data.length; i += 2) {
    rows.push(data.slice(i, i + 2));
  }

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
              onLike={onLike}
              onSave={onSave}
              isLiked={isLiked(item.id)}
              isNewsSaved={isNewsSaved(item.id)}
              navigation={navigation}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
