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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const BASE_URL = "http://192.168.1.93:3000"; // ganti sesuai server
const quantity = 1;

export default function HomeUpdate() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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
    if (isLoadMore) setLoadingMore(true);
    else setLoading(true);

    try {
      const periode = new Date().getFullYear();
      const res = await fetch(
        `${BASE_URL}/RadarApps/api/v1/news/?periode=${periode}&page=${pageNumber}&quantity=${quantity}`
      );
      const json = await res.json();

      if (json?.data?.data?.length > 0) {
        const mapped = json.data.data.map((item) => {
          const fixedImage = item.image
            ? item.image.replace(/\\/g, "/").replace(/^public\//, "").replace(/^news\//, "")
            : "";
          return {
            id: String(item.id),
            image: fixedImage ? `${BASE_URL}/news/${fixedImage}` : "https://via.placeholder.com/150",
            region: item.region || "Tidak diketahui",
            rawDate: new Date(item.publishedAt),
            dateFormatted: new Date(item.publishedAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          };
        });

        setAllData((prev) => [...prev, ...mapped]);
        if (json.data.data.length < quantity) setHasMore(false);
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
          onPress={() =>
            navigation.navigate("PageEpaper", { epaper: { ...item, rawDate: item.rawDate.toISOString() } })
          }
        >
          {isPdf ? (
            <View
              style={[
                styles.coverImage,
                { justifyContent: "center", alignItems: "center", backgroundColor: "#ddd" },
              ]}
            >
              <Ionicons name="document-text-outline" size={64} color="#888" />
              <Text style={{ marginTop: 10, color: "#888", textAlign: "center" }}>PDF File</Text>
            </View>
          ) : (
            <Image source={{ uri: item.image }} style={styles.coverImage} resizeMode="cover" />
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

          {/* Tombol Edit di kanan bawah */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("PageUpdate", { id: item.id }) // navigasi ke halaman update dengan mengirim id
            }
          >
            <Ionicons name="create-outline" size={25} color="#1E3A8A" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EPAPER</Text>
        <Text style={styles.headerSubtitle}>
          <Text style={styles.yellowText}>RADAR </Text>
          <Text style={styles.whiteText}>TULUNGAGUNG</Text>
        </Text>
      </View>

      {/* FILTER TANGGAL */}
      <TouchableOpacity style={styles.filterButton} onPress={() => setShowPicker(true)}>
        <Ionicons name="calendar-outline" size={18} color="#1E3A8A" />
        <Text style={styles.filterText}>
          {selectedDate
            ? selectedDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
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
        <ActivityIndicator size="large" color="#1E3A8A" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Tidak ada epaper untuk tanggal ini.</Text>
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator size="small" color="#1E3A8A" style={{ marginVertical: 10 }} /> : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef1f4ed" },
  header: { backgroundColor: "#1E4B8A", paddingTop: Platform.OS === "ios" ? 90 : 70, paddingBottom: 30, alignItems: "center", position: "relative" },
  backButton: { position: "absolute", top: Platform.OS === "ios" ? 60 : 40, left: 20, zIndex: 1 },
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
  coverImage: { width: "100%", height: 235, backgroundColor: "#ddd", borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  cardInfo: { padding: 10 },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  infoText: { marginLeft: 6, fontSize: 12, color: "#1E3A8A" },
  filterButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", marginHorizontal: 16, marginTop: 16, paddingVertical: 14, paddingHorizontal: 16, borderRadius: 12, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 2, elevation: 3 },
  filterText: { marginLeft: 10, color: "#1E293B", fontWeight: "500", fontSize: 15 },
  emptyText: { textAlign: "center", marginTop: 40, color: "#64748B", fontSize: 14 },
  editButton: {
  alignSelf: "flex-end",   // taruh di kanan bawah dalam cardInfo
  paddingHorizontal: 3,   // jarak kiri-kanan
  paddingVertical: 6,      // jarak atas-bawah
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,           // tebal border
  borderColor: "#1E3A8A",  // warna border
  borderRadius: 8,         // membulatkan sudut
}
});
