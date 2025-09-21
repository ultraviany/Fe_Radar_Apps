import React, { useState, useContext, useCallback } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import Header from "./HeaderSection";
import ContactCard from "./ContactSection";
import NewsTabBar from "./NewsTabBar";
import NewsSection from "./NewsSection";
import { SaveContext } from "../Context/SaveContext";
import { LikeContext } from "../Context/LikeContext";
import { useFocusEffect } from "@react-navigation/native";
import BASE_URL from "../config";

export default function HomePage({ navigation }) {
  const [activeTab, setActiveTab] = useState("All Epaper");
  const { toggleSave, isNewsSaved } = useContext(SaveContext);
  const { likedNews, toggleLike, likesCount, hydrateLikes } =
    useContext(LikeContext);

  const [tulungagungNews, setTulungagungNews] = useState([]);
  const [blitarNews, setBlitarNews] = useState([]);
  const [trenggalekNews, setTrenggalekNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const quantity = 10;

  const fetchNews = async (pageNumber, isLoadMore = false) => {
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
          let fixedImage = item.image
            ? item.image
                .replace(/\\/g, "/")
                .replace(/^public\//, "")
                .replace(/^news\//, "")
            : "";

          const imageUrl = fixedImage
            ? `${BASE_URL}/news/${fixedImage}`
            : "https://via.placeholder.com/150";

          const regionMap = {
            TULUNGAGUNG: "Radar Tulungagung",
            BLITAR: "Radar Blitar",
            TRENGGALEK: "Radar Trenggalek",
          };

          return {
            id: String(item.id),
            image: imageUrl,
            region: item.region,
            regionLabel: regionMap[item.region] || item.region,
            date: item.publishedAt
              ? new Date(item.publishedAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "",
          };
        });

        if (pageNumber === 1) {
          setTulungagungNews(
            mapped.filter((n) => n.region.includes("TULUNGAGUNG"))
          );
          setBlitarNews(mapped.filter((n) => n.region.includes("BLITAR")));
          setTrenggalekNews(
            mapped.filter((n) => n.region.includes("TRENGGALEK"))
          );
        } else {
          setTulungagungNews((prev) => [
            ...prev,
            ...mapped.filter((n) => n.region.includes("TULUNGAGUNG")),
          ]);
          setBlitarNews((prev) => [
            ...prev,
            ...mapped.filter((n) => n.region.includes("BLITAR")),
          ]);
          setTrenggalekNews((prev) => [
            ...prev,
            ...mapped.filter((n) => n.region.includes("TRENGGALEK")),
          ]);
        }

        // 🔥 hydrate status like utk batch news yg baru dimuat
        const ids = mapped.map((n) => n.id);
        hydrateLikes(ids);

        if (json.data.data.length < quantity) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetch news:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setPage(1);
      setHasMore(true);
      fetchNews(1, false);
    }, [])
  );

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchNews(nextPage, true);
    }
  };

  const convertToISO = (dateStr) => {
    if (!dateStr) return "";
    const [day, monthName, year] = dateStr.split(" ");
    const monthMap = {
      Januari: "01",
      Februari: "02",
      Maret: "03",
      April: "04",
      Mei: "05",
      Juni: "06",
      Juli: "07",
      Agustus: "08",
      September: "09",
      Oktober: "10",
      November: "11",
      Desember: "12",
    };
    const month = monthMap[monthName];
    return `${year}-${month}-${day}`;
  };

  const getDataByTab = () => {
    if (activeTab === "All Epaper") {
      const combinedNews = [
        ...tulungagungNews,
        ...blitarNews,
        ...trenggalekNews,
      ];
      return combinedNews.sort((a, b) => {
        const dateA = new Date(convertToISO(a.date));
        const dateB = new Date(convertToISO(b.date));
        return dateB - dateA;
      });
    }

    switch (activeTab) {
      case "Radar Tulungagung":
        return tulungagungNews;
      case "Radar Blitar":
        return blitarNews;
      case "Radar Trenggalek":
        return trenggalekNews;
      default:
        return [];
    }
  };

  const newsData = getDataByTab();

  return (
    <FlatList
      data={newsData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <NewsSection
          data={[item]}
          onLike={toggleLike}
          isLiked={(id) => likedNews.includes(id)}
          likesCount={(id) => likesCount[id] || 0}
          onSave={toggleSave}
          isNewsSaved={isNewsSaved}
          navigation={navigation}
        />
      )}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      ListHeaderComponent={
        <>
          <View style={{ marginHorizontal: -16 }}>
            <Header />
          </View>
          <ContactCard />
          <NewsTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
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
      ListEmptyComponent={
        !loading && (
          <Text style={styles.emptyText}>Belum ada berita tersedia</Text>
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#64748B",
    fontSize: 14,
  },
});
