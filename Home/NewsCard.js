import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function NewsCard({ item, onLike, onSave, isLiked, isNewsSaved }) {
  return (
    <View style={styles.card}>
      <TouchableOpacity>
        <Image source={item.image} style={styles.coverImage} />
      </TouchableOpacity>
      <View style={styles.cardFooter}>
        <View style={styles.iconRow}>
          <Ionicons name="calendar-outline" size={14} color="#2F5C9A" />
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => onLike(item.id)}>
            <AntDesign
              name={isLiked ? "heart" : "hearto"}
              size={16}
              color={isLiked ? "red" : "gray"}
              style={styles.iconMargin}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSave(item)}>
            <Ionicons
              name={isNewsSaved ? "bookmark" : "bookmark-outline"}
              size={16}
              color={isNewsSaved ? "#2F5C9A" : "gray"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    marginRight: 12,
    backgroundColor: "#gray",
    borderRadius: 12,
    overflow: "hidden",
  },
  coverImage: {
    width: "100%",
    height: 230,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingBottom: 12,
    paddingTop: 12,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    marginLeft: 6,
    color: "gray",
    fontWeight: "bold",
  },
  iconMargin: {
    marginHorizontal: 8,
  },
});
