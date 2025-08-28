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
// Biar card lebih ke samping → kurangi margin
const cardWidth = (screenWidth - 10 * 3) / 2;

export default function NewsCard({
  item,
  onLike,
  onSave,
  isLiked,
  isNewsSaved,
  navigation,
  showEditButton = false,
  showDeleteButton = false,
  onDelete,
}) {
  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <TouchableOpacity onPress={() => navigation.navigate("PageEpaper", { newsId: item.id })}>
        <Image
          source={{ uri: item.image }}
          style={styles.coverImage}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Bagian bawah putih */}
      <View style={styles.footer}>
        {/* Tombol Edit */}
        {showEditButton && (
          <TouchableOpacity
            style={[styles.editButton, { right: 36 }]}
            onPress={() => navigation.navigate("PageUpdate", { item })}
          >
            <Ionicons name="create-outline" size={18} color="#1E4B8A" />
          </TouchableOpacity>
        )}

        {/* Tombol Hapus */}
        {showDeleteButton && (
          <TouchableOpacity
            style={[styles.editButton, { right: 8 }]}
            onPress={() => onDelete(item)}
          >
            <Ionicons name="trash-outline" size={18} color="#1E4B8A" />
          </TouchableOpacity>
        )}

        {/* Region */}
        <View style={styles.row}>
          <Ionicons name="newspaper-outline" size={14} color="#1E4B8A" />
          <Text style={styles.regionText}>{item.regionLabel}</Text>
        </View>

        {/* Date */}
        <View style={[styles.row, { marginTop: 6 }]}>
          <Ionicons name="calendar-outline" size={14} color="#1E4B8A" />
          <Text style={styles.dateText}>{item.date}</Text>
        </View>

        {/* Tombol Like & Save */}
        {onLike && onSave && (
          <View style={styles.iconRow}>
            <TouchableOpacity onPress={() => onLike(item.id)}>
              <AntDesign
                name={isLiked ? "heart" : "hearto"}
                size={18}
                color={isLiked ? "red" : "#000"}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSave(item)}>
              <Ionicons
                name={isNewsSaved ? "bookmark" : "bookmark-outline"}
                size={18}
                color={isNewsSaved ? "#1E4B8A" : "#000"}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 320,
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 4,
  },
  coverImage: {
    width: "100%",
    height: 235,
    backgroundColor: "#ddd",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  footer: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 30,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    position: "relative",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  regionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1E4B8A",
    marginLeft: 6,
  },
  dateText: {
    fontSize: 12,
    color: "#1E4B8A",
    marginLeft: 6,
    fontWeight: "500",
  },
  iconRow: {
    flexDirection: "row",
    position: "absolute",
    right: 15,
    bottom: 4,
  },
  icon: {
    marginLeft: 6,
  },
  editButton: {
    position: "absolute",
    top: 8,
    backgroundColor: "#f8fafc",
    padding: 6,
    borderRadius: 50,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
});
