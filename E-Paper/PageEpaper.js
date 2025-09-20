import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import ImageViewer from "react-native-image-zoom-viewer";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const BASE_URL = "http://192.168.1.6:3000";

//ukuran preview
const PREVIEW_WIDTH = screenWidth * 0.8;
const PREVIEW_HEIGHT = screenHeight * 0.45;

export default function PageEpaper({ navigation, route }) {
  const newsId = route?.params?.newsId;
  const [pdfImages, setPdfImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [region, setRegion] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [zoomVisible, setZoomVisible] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const fetchPdfPages = async () => {
        try {
          const res = await fetch(`${BASE_URL}/RadarApps/api/v1/news/${newsId}/pages`);
          const json = await res.json();
          if (json?.success && Array.isArray(json?.data)) {
            setPdfImages(json.data.map((rel) => ({ url: `${BASE_URL}${rel}` })));
          }

          const resNews = await fetch(`${BASE_URL}/RadarApps/api/v1/news/${newsId}`);
          const jsonNews = await resNews.json();
          if (jsonNews?.success && jsonNews?.data) {
            setRegion(jsonNews.data.region || "");
            setPublishedAt(jsonNews.data.publishedAt || "");
          }
        } catch (e) {
          console.log("❌ Gagal fetch PDF pages:", e);
        } finally {
          setLoading(false);
        }
      };

      if (newsId) fetchPdfPages();
      else setLoading(false);
    }, [newsId])
  );

  const onScrollEnd = (e) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
    if (newIndex !== currentIndex) setCurrentIndex(newIndex);
  };

  const openZoom = (index) => {
    setZoomIndex(index);
    setZoomVisible(true);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
        width: PREVIEW_WIDTH,
        height: PREVIEW_HEIGHT,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 8,
      }}
      onPress={() => openZoom(index)}
    >
      <Image
        source={{ uri: item.url }}
        style={{
          width: PREVIEW_WIDTH,
          height: PREVIEW_HEIGHT,
          resizeMode: "contain",
          borderRadius: 12,
        }}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EPAPER</Text>
        <Text style={styles.headerSubtitle}>
          <Text style={styles.yellowText}>RADAR</Text>
          <Text style={styles.whiteText}> {region.toUpperCase()}</Text>
        </Text>
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 120 }}
      >
        {/* TANGGAL */}
        <Text style={styles.date}>
          {region
            ? `RADAR ${region}, ${new Date(publishedAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}`
            : ""}
        </Text>

        {/* EPAPER */}
        <View style={styles.epaperContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" style={{ flex: 1 }} />
          ) : pdfImages.length > 0 ? (
            <FlatList
              data={pdfImages}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, i) => String(i)}
              renderItem={renderItem}
              onMomentumScrollEnd={onScrollEnd}
            />
          ) : (
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Tidak ada PDF tersedia.</Text>
          )}
        </View>

        {/* PAGINATION */}
        <Text style={styles.pagination}>
          {pdfImages.length > 0 ? currentIndex + 1 : 0} / {pdfImages.length}
        </Text>
      </ScrollView>

      {/* KOMENTAR STICKY */}
      <TouchableOpacity
        style={styles.commentArea}
        onPress={() => navigation.navigate("PageComment", { newsId})}
      >
        <Ionicons name="chatbubble-ellipses" size={28} color="#000" style={styles.commentIcon} />
        <View style={styles.commentBox}>
          <Text style={styles.placeholderText}>Tambahkan Komentar</Text>
        </View>
      </TouchableOpacity>

      {/* MODAL ZOOM */}
      <Modal visible={zoomVisible} transparent={true} onRequestClose={() => setZoomVisible(false)}>
        <ImageViewer
          imageUrls={pdfImages}
          index={zoomIndex}
          enableSwipeDown={true}
          onSwipeDown={() => setZoomVisible(false)}
          backgroundColor="#000"
          enableImageZoom={true} // zoom aktif di modal
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", alignItems: "center" },
  header: {
    backgroundColor: "#1E4B8A",
    paddingTop: 90,
    paddingBottom: 30,
    alignItems: "center",
    position: "relative",
    width: "100%",
  },
  backButton: { position: "absolute", top: 60, left: 20, zIndex: 1 },
  headerTitle: { fontSize: 35, fontWeight: "bold", color: "#fff" },
  headerSubtitle: { fontSize: 25, marginTop: 8 },
  yellowText: { color: "#efbe1eff", fontWeight: "bold" },
  whiteText: { color: "#fff", fontWeight: "bold" },
  date: { fontWeight: "bold", marginTop: 20, fontSize: 15 },
  epaperContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E4B8A",
    borderRadius: 10,
    marginTop: 10,
    height: screenHeight * 0.5,
    width: screenWidth * 0.85,
  },
  pagination: { marginTop: 16, fontWeight: "bold", fontSize: 16 },
  commentArea: {
    position: "absolute",
    bottom: 30,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentIcon: { paddingRight: 16 },
  commentBox: { flex: 1, backgroundColor: "#F3F4F6", padding: 14, borderRadius: 20, marginLeft: 12 },
  placeholderText: { color: "#9CA3AF", fontSize: 16 },
});
