//LikeContext
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.1.93:3000";

export const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likedNews, setLikedNews] = useState([]); // simpan daftar news yang di like
  const [loading, setLoading] = useState(false);

  // ambil token dari async
  const getToken = async () => {
    return await AsyncStorage.getItem("token");
  };

   const isLiked = (newsId) => {
    return likedNews.includes(newsId);
  };

  // toggle like dan unlike
  const toggleLike = async (newsId) => {
    try {
      setLoading(true);
      const token = await getToken();

      const res = await fetch(`${BASE_URL}/RadarApps/api/v1/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newsId }),
      });

      const data = await res.json();
      console.log("Like Response:", data);

      if (data.success) {
        setLikedNews((prev) => {
          if (prev.includes(newsId)) {
            console.log(" UNLIKE berhasil untuk newsId:", newsId);
            return prev.filter((id) => id !== newsId);
          } else {
            console.log("LIKE berhasil untuk newsId:", newsId);
            return [...prev, newsId];
          }
        });
      } else {
        console.warn("⚠️ Gagal like/unlike:", data.message || data);
      }
    } catch (error) {
      console.error("Error toggleLike:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LikeContext.Provider value={{ likedNews, toggleLike, loading, isLiked}}>
      {children}
    </LikeContext.Provider>
  );
};
