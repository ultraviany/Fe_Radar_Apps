import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ActivityCard({ data }) {
  return (
    <View style={styles.card}>
      <Text style={styles.time}>{data.time}</Text>
      <Text style={styles.title}>
        {data.title} | {data.date}
      </Text>
      {data.content ? <Text style={styles.content}>{data.content}</Text> : null}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.detailBtn}>
          <Text style={styles.btnText}>Lihat Detail</Text>
        </TouchableOpacity>
        {data.tag ? (
          <View
            style={[
              styles.tag,
              data.tag === "Komentar"
                ? styles.commentTag
                : styles.likedTag,
            ]}
          >
            <Text style={styles.tagText}>{data.tag}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 14,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderColor: "#2F5C9A",
    borderWidth:1,
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
  title: {
    fontSize:14,
    fontWeight: "bold",
    marginTop: 8,
  },
  content: {
    marginTop: 8,
    color: "#444",
  },
  footer: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailBtn: {
    backgroundColor: "#2F5C9A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize:14,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  commentTag: {
    backgroundColor: "#FFD580",
  },
  likedTag: {
    backgroundColor: "#FFB3B3",
  },
  tagText: {
    color: "#000",
    fontWeight: "bold",
    fontSize:14,
  },
});
