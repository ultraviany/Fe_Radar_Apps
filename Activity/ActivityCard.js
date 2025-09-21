import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BASE_URL from "../config";

const formatTimeAgo = (iso) => {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} hari yang lalu`;
  if (hours > 0) return `${hours} jam yang lalu`;
  if (minutes > 0) return `${minutes} menit yang lalu`;
  return "Baru saja";
};

const formatImageUrl = (imagePath) => {
  if (!imagePath) return null;
  const cleanPath = imagePath.replace("public\\", "").replace(/\\/g, "/");
  return `${BASE_URL}/${cleanPath}`;
};

export default function ActivityCard({ data }) {
  const navigation = useNavigation(); //  tambahin ini

  const publishedDate = data.news?.publishedAt
    ? new Date(data.news.publishedAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {data.news?.image ? (
          <Image
            source={{ uri: formatImageUrl(data.news.image) }}
            style={styles.thumb}
            resizeMode="cover"
          />
        ) : null}

        <View style={styles.rightContent}>
          {/* Title */}
          <Text style={styles.title}>EPAPER | {publishedDate}</Text>

          {/* Content */}
          {data.type === "comment" && data.content ? (
            <Text style={styles.content}>"{data.content}"</Text>
          ) : (
            data.type === "like" && (
              <Text style={styles.content}>Kamu menyukai epaper ini</Text>
            )
          )}

          {/* Time */}
          <Text style={styles.time}>{formatTimeAgo(data.timestamp)}</Text>

          {/* Tag */}
          <TouchableOpacity
  onPress={() => navigation.navigate("PageEpaper", { newsId: data.news.id })}
>
  <View
    style={[
      styles.tag,
      data.type === "comment" ? styles.commentTag : styles.likedTag,
    ]}
  >
    <Text
      style={[
        styles.tagText,
        data.type === "comment" ? styles.commentText : styles.likedText,
      ]}
    >
      {data.type === "comment" ? "Komentar" : "Disukai"}
    </Text>
  </View>
</TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderColor: "#1E4B8A", // border biru
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  thumb: {
    width: 90,
    height: 120,
    borderRadius: 8,
    marginRight: 12,
  },
  rightContent: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1E1E1E",
  },
  content: {
    marginTop: 6,
    fontSize: 14,
    color: "#444",
  },
  time: {
    fontSize: 12,
    color: "#999",
    marginTop: 6,
  },
  tag: {
    marginTop: 10,
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  commentTag: {
    backgroundColor: "#f7951d55", // oranye muda
  },
  likedTag: {
    backgroundColor: "rgba(255, 179, 179, 0.52)", // merah muda
  },
  tagText: {
    fontWeight: "bold",
    fontSize: 13,
  },
  commentText: {
  color: "#F7941D", // kuning tua
},
likedText: {
  color: "#DE594A", // merah tua
},
});
