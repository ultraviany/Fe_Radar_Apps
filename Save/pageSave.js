// Save/pageSave.js
import React, { useContext, useEffect  } from "react";
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

export default function SavePage({ navigation }) {
  const { savedNews, toggleSave, fetchSavedNews, page, hasMore, loading } =
    useContext(SaveContext);

  useEffect(() => {
    fetchSavedNews(1); // ambil page pertama
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchSavedNews(page + 1);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.saveIcon}
        onPress={() => toggleSave(item)}
      >
        <Ionicons name="bookmark" size={16} color="#1E4B8A" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PageEpaper", { newsId: item.newsId })
        }
      >
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <View style={styles.regionRow}>
          <Ionicons name="newspaper-outline" size={14} color="#1E4B8A" />
          <Text style={styles.region}>{item.region}</Text>
        </View>
        <View style={styles.dateRow}>
          <Ionicons name="calendar-outline" size={14} color="#1E4B8A" />
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Tersimpan</Text>
          <Text style={styles.subTitle}>
            {savedNews.length} Epaper Tersimpan
          </Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        {savedNews.length === 0 ? (
          <Text style={styles.empty}>Belum ada berita disimpan</Text>
        ) : (
          <FlatList
            data={savedNews}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            onEndReached={loadMore} // load otomatis saat scroll bawah
            onEndReachedThreshold={0.5} // 50% sebelum bawah
            ListFooterComponent={
              loading ? (
                <Text style={{ textAlign: "center", padding: 10 }}>
                  Loading...
                </Text>
              ) : null
            }
          />
        )}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1E4B8A" },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: "#1E4B8A",
  },
  headerTextContainer: { flexDirection: "column" },
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
    backgroundColor: "#ffffffff",
    borderRadius: 12,
    flex: 0.48,
    overflow: "hidden",
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
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
    color: "#1E4B8A",
    fontWeight: "bold",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 0,
  },
  regionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  region: {
    fontSize: 13,
    color: "#1E4B8A",
    fontWeight: "600",
    marginLeft: 6,
  },
});
