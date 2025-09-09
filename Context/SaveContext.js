// SaveContext.js
import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.1.93:3000";
const quantity = 10; // jumlah save per page
const periode = new Date().getFullYear();

// Buat region
const regionLabels = {
  TULUNGAGUNG: "Radar Tulungagung",
  TRENGGALEK: "Radar Trenggalek",
  BLITAR: "Radar Blitar",
};

export const SaveContext = createContext();

export const SaveProvider = ({ children }) => {
  const [savedNews, setSavedNews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Ambil token & userId yang diset waktu login
  const getAuthInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      return { token, userId };
    } catch (err) {
      console.error("Failed getAuthInfo:", err);
      return { token: null, userId: null };
    }
  };

  // Fetch saved news dari be
  const fetchSavedNews = async (pageNumber = 1) => {
    if (loading) return; // cegah multiple request
    setLoading(true);

    try {
      console.log("🚀 Mulai fetch saved news...");

      const token = await AsyncStorage.getItem("token");
      console.log("📦 Token:", token);

      const res = await fetch(
        `${BASE_URL}/RadarApps/api/v1/get/saved/?periode=${periode}&page=${pageNumber}&quantity=${quantity}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("📡 Status response:", res.status);

      const data = await res.json();
      console.log("📥 Data dari API:", JSON.stringify(data, null, 2));

      if (res.ok && data.data) {
        const mappedData = data.data.map((item) => {
          console.log("🔎 Item yang sedang diproses:", item);
          return {
            id: item.id,
            newsId: item.newsId,
            userId: item.userId,
            image: `${BASE_URL}/${item.news.image}`,
            region: regionLabels[item.news.region] || "Tidak ada region",
            date: new Date(item.news.publishedAt).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }),
            pdfUrl: item.news.pdfUrl.map((url) => `${BASE_URL}/${url}`),
            onDelete: item.news.onDelete,
          };
        });

        setSavedNews((prev) =>
          pageNumber === 1 ? mappedData : [...prev, ...mappedData]
        );

        setPage(pageNumber);
        setHasMore(mappedData.length === quantity);
        console.log("✅ Hasil mapping data:", mappedData);
      } else {
        console.log("⚠️ API tidak mengembalikan data dengan format benar");
      }
    } catch (error) {
      console.error("❌ Error di fetchSavedNews:", error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle save dan unsave berita
  const toggleSave = async (item) => {
    try {
      const { token } = await getAuthInfo();
      if (!token) return;

      const newsId = item.newsId ?? item.id;

      if (!newsId) {
        console.warn("Item tidak punya newsId atau id:", item);
        return;
      }

      const isSaved = savedNews.some((news) => news.newsId === newsId);

      if (isSaved) {
        const savedItem = savedNews.find((n) => n.newsId === newsId);
        if (!savedItem) return;

        const res = await fetch(
          `${BASE_URL}/RadarApps/api/v1/saved/delete/${savedItem.id}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.ok) {
          setSavedNews((prev) => prev.filter((news) => news.newsId !== newsId));
          console.log(`🗑️ Berita dengan ID ${newsId} berhasil dihapus dari saved!`);
        } else {
          const errMsg = await res.json();
          console.warn("Failed delete saved:", errMsg.message);
        }
      } else {
        const res = await fetch(`${BASE_URL}/RadarApps/api/v1/saved/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newsId }),
        });

        const newSaved = await res.json();
        if (res.ok && newSaved.data) {
          await fetchSavedNews();
          console.log(`✅ Berita dengan ID ${newsId} berhasil disimpan!`);
        } else {
          console.warn("Failed create saved:", newSaved.message);
        }
      }
    } catch (err) {
      console.error("Failed toggle save:", err);
    }
  };

  const isNewsSaved = (id) => savedNews.some((news) => news.newsId === id);

  return (
    <SaveContext.Provider
      value={{
        savedNews,
        fetchSavedNews,
        toggleSave,
        isNewsSaved,
        page,
        hasMore,
        loading,
      }}
    >
      {children}
    </SaveContext.Provider>
  );
};
