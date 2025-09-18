import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

export default function PageDelete() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const BASE_URL = "http://192.168.1.93:3000";
  const quantity = 1;

  useFocusEffect(
    useCallback(() => {
      resetAndFetch();
    }, [])
  );

  const resetAndFetch = async () => {
    setPage(1);
    setHasMore(true);
    setAllData([]);
    await fetchEpaper(1, false);
  };

  const fetchEpaper = async (pageNumber, isLoadMore) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const periode = new Date().getFullYear();
      const res = await fetch(
        `${BASE_URL}/RadarApps/api/v1/news/?periode=${periode}&page=${pageNumber}&quantity=${quantity}`
      );
      const json = await res.json();

      if (json?.data?.data?.length > 0) {
        const mapped = json.data.data.map((item) => {
          let fixedImage = item.image
            ? item.image
                .replace(/\\/g, "/")
                .replace(/^public\//, "")
                .replace(/^news\//, "")
            : "";

          const imageUrl = fixedImage
            ? `${BASE_URL}/news/${fixedImage}`
            : "https://via.placeholder.com/150";

          return {
            id: String(item.id),
            image: imageUrl,
            region: item.region || "Tidak diketahui",
            rawDate: new Date(item.publishedAt),
            dateFormatted: new Date(item.publishedAt).toLocaleDateString(
              "id-ID",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            ),
          };
        });

        setAllData((prev) => [...prev, ...mapped]);

        if (json.data.data.length < quantity) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Gagal fetch epaper:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleDelete = (item) => {
    Alert.alert(
      "Konfirmasi Hapus",
      `Yakin ingin menghapus Epaper tanggal ${item.dateFormatted}?`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token"); // ambil token dari storage
              if (!token) {
                Alert.alert(
                  "Gagal",
                  "Token tidak ditemukan, silakan login ulang."
                );
                return;
              }
              const res = await fetch(
                `${BASE_URL}/RadarApps/api/v1/news/delete/${item.id}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              const json = await res.json();

              if (json.success) {
                console.log(`PDF dengan ID ${item.id} berhasil dihapus.`);
                Alert.alert("Berhasil", json.message);
                resetAndFetch();
              } else {
                console.log(`Gagal menghapus PDF dengan ID ${item.id}`);
                Alert.alert("Gagal", json.message || "Gagal menghapus data");
              }
            } catch (error) {
              console.error("Gagal delete:", error);
            }
          },
        },
      ]
    );
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchEpaper(nextPage, true);
    }
  };

  const handleDateChange = (event, date) => {
    setShowPicker(false);
    if (date) setSelectedDate(date);
  };

  const filteredData = selectedDate
    ? allData.filter(
        (item) => item.rawDate.toDateString() === selectedDate.toDateString()
      )
    : allData;

  const regionMapping = {
    TULUNGAGUNG: "Radar Tulungagung",
    BLITAR: "Radar Blitar",
    TRENGGALEK: "Radar Trenggalek",
  };

  const renderItem = ({ item }) => {
    const regionLabel = regionMapping[item.region] || item.region;
    const isPdf = item.image.toLowerCase().endsWith(".pdf");

    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => navigation.navigate("PageEpaper", { epaper: item })}
        >
          {isPdf ? (
            <View
              style={[
                styles.coverImage,
                {
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ddd",
                },
              ]}
            >
              <Ionicons name="document-text-outline" size={64} color="#888" />
              <Text
                style={{ marginTop: 10, color: "#888", textAlign: "center" }}
              >
                PDF File
              </Text>
            </View>
          ) : (
            <Image
              source={{ uri: item.image }}
              style={styles.coverImage}
              resizeMode="cover"
            />
          )}
        </TouchableOpacity>

        <View style={styles.cardInfo}>
          <View style={styles.infoRow}>
            <Ionicons name="newspaper-outline" size={16} color="#1E3A8A" />
            <Text style={styles.infoText}>{regionLabel}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={16} color="#1E3A8A" />
            <Text style={styles.infoText}>{item.dateFormatted}</Text>
          </View>

          {/* Tombol Delete */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item)}
          >
            <Ionicons name="trash-outline" size={16} color="#fff" />
            <Text style={styles.deleteText}>Hapus</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EPAPER</Text>
        <Text style={styles.headerSubtitle}>
          <Text style={styles.yellowText}>RADAR </Text>
          <Text style={styles.whiteText}>TULUNGAGUNG</Text>
        </Text>
      </View>

      {/* FILTER TANGGAL */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setShowPicker(true)}
      >
        <Ionicons name="calendar-outline" size={18} color="#1E3A8A" />
        <Text style={styles.filterText}>
          {selectedDate
            ? selectedDate.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "Cari berdasarkan tanggal"}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* LIST */}
      {loading && allData.length === 0 ? (
        <ActivityIndicator
          size="large"
          color="#1E3A8A"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Tidak ada epaper untuk tanggal ini.
            </Text>
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator
                size="small"
                color="#1E3A8A"
                style={{ marginVertical: 10 }}
              />
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef1f4ed" },
  header: {
    backgroundColor: "#1E4B8A",
    paddingTop: Platform.OS === "ios" ? 90 : 70,
    paddingBottom: 30,
    alignItems: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: 20,
    zIndex: 1,
  },
  headerTitle: { fontSize: 35, fontWeight: "bold", color: "#fff" },
  headerSubtitle: { fontSize: 25, marginTop: 8 },
  yellowText: { color: "#efbe1eff", fontWeight: "bold" },
  whiteText: { color: "#fff", fontWeight: "bold" },
  list: { paddingHorizontal: 12, paddingTop: 20, paddingBottom: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    width: (screenWidth - 10 * 3) / 2,
    overflow: "hidden",
  },
  coverImage: {
    width: "100%",
    height: 235,
    backgroundColor: "#ddd",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardInfo: { padding: 10 },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  infoText: { marginLeft: 6, fontSize: 12, color: "#1E3A8A" },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  filterText: {
    marginLeft: 10,
    color: "#1E293B",
    fontWeight: "500",
    fontSize: 15,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#64748B",
    fontSize: 14,
  },
  deleteButton: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  deleteText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 12,
    fontWeight: "600",
  },
});
