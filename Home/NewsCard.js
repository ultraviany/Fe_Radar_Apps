import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 16 * 3) / 2;

export default function NewsCard({
  item,
  onLike,
  onSave,
  isLiked,
  isNewsSaved,
  navigation,
}) {
  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <TouchableOpacity onPress={() => navigation.navigate("PageEpaper")}>
        <Image
          source={item.image}
          style={styles.coverImage}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Bagian bawah putih */}
      <View style={styles.footer}>
        {/* Region */}
        <View style={styles.row}>
          <Ionicons name="newspaper-outline" size={14} color="#2F5C9A" />
          <Text style={styles.regionText}>{item.region}</Text>
        </View>

        {/* Date */}
        <View style={[styles.row, { marginTop: 6 }]}>
          <Ionicons name="calendar-outline" size={14} color="#2F5C9A" />
          <Text style={styles.dateText}>{item.date}</Text>
        </View>

        {/* Icons */}
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => onLike(item.id)}>
            <AntDesign
              name={isLiked ? "heart" : "hearto"}
              size={18}
              color={isLiked ? "red" : "gray"}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSave(item)}>
            <Ionicons
              name={isNewsSaved ? "bookmark" : "bookmark-outline"}
              size={18}
              color={isNewsSaved ? "#2F5C9A" : "gray"}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180, // ukuran diperbesar
    height: 310, // ukuran diperbesar
    marginTop:8,
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  coverImage: {
    width: "100%",
    height: 240,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  footer: {
    backgroundColor: "#fff",
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    position: "relative",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  regionText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2F5C9A",
    marginLeft: 6,
  },
  dateText: {
    fontSize: 12,
    color: "gray",
    marginLeft: 6,
    fontWeight: "500",
  },
  iconRow: {
    flexDirection: "row",
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  icon: {
    marginLeft: 3,
  },
});
