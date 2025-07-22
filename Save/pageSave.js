import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SaveContext } from "../Context/SaveContext";
import { Ionicons } from "@expo/vector-icons";

export default function SavePage() {
  const { savedNews, toggleSave } = useContext(SaveContext);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* ICON SAVE */}
      <TouchableOpacity
        style={styles.saveIcon}
        onPress={() => toggleSave(item)}
      >
        <Ionicons name="bookmark" size={16} color="#2F5C9A" />
      </TouchableOpacity>

      {/* bagian cover */}
      <TouchableOpacity>
        <Image source={item.image} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={14} color="#2F5C9A" />
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Tersimpan</Text>
          <Text style={styles.subTitle}>
            {savedNews.length} Epaper Tersimpan
          </Text>
        </View>
      </View>

      {/* kalo ini tidak ada yang save */}
      <View style={styles.contentContainer}>
        {savedNews.length === 0 ? (
          <Text style={styles.empty}>Belum ada berita disimpan</Text>
        ) : (
          <FlatList
            data={savedNews}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2F5C9A",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: "#2F5C9A",
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
  },
  headerTextContainer: {
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 12,
  },
  subTitle: {
    fontSize: 14,
    color: "#ddd",
    marginLeft: 12,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    marginTop: -5,
  },
  empty: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 50,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
    // elevation: 4,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // shadowOffset: { width: 0, height: 2 },
    flex: 0.48,
    // position: 'relative',
  },
  saveIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 1,
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: 230,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    paddingHorizontal: 8,
    paddingBottom: 12,
    paddingTop: 12,
  },
  date: {
    fontSize: 12,
    marginLeft: 6,
    color: "gray",
    fontWeight: "bold",
  },
  savedTime: {
    fontSize: 12,
    color: "#777",
  },
  listContent: {
    paddingBottom: 0,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 4,
  },

});
