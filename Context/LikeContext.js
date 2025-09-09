import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.1.93:3000";

export const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likedNews, setLikedNews] = useState([]); // daftar newsId yg dilike user
  const [loading, setLoading] = useState(false);
  const [likesCount, setLikesCount] = useState({}); // { newsId: count }

  const getToken = async () => {
    return await AsyncStorage.getItem("token");
  };

  const isLiked = (newsId) => likedNews.includes(newsId);

  // 🔥 Hydrate status like & count dari backend
  const hydrateLikes = async (newsIds = []) => {
    if (!Array.isArray(newsIds) || newsIds.length === 0) return;
    try {
      const token = await getToken();
      const uniqueIds = Array.from(new Set(newsIds));

      const results = await Promise.all(
        uniqueIds.map(async (id) => {
          try {
            const res = await fetch(`${BASE_URL}/RadarApps/api/v1/likes/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const json = await res.json();
            return {
              id,
              liked: !!json?.data?.likedByUser,
              count: json?.data?.likesCount ?? 0,
            };
          } catch {
            return { id, liked: false, count: 0 };
          }
        })
      );

      setLikedNews((prev) => {
        const set = new Set(prev);
        results.forEach((r) => {
          if (r.liked) set.add(r.id);
          else set.delete(r.id);
        });
        return Array.from(set);
      });

      setLikesCount((prev) => {
        const next = { ...prev };
        results.forEach((r) => {
          next[r.id] = r.count;
        });
        return next;
      });
    } catch (e) {
      console.warn("hydrateLikes failed:", e);
    }
  };

  // toggle like/unlike
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
        setLikedNews((prev) =>
          prev.includes(newsId)
            ? prev.filter((id) => id !== newsId) // unlike
            : [...prev, newsId] // like
        );

        if (data.data?.likesCount !== undefined) {
          setLikesCount((prev) => ({
            ...prev,
            [newsId]: data.data.likesCount,
          }));
        }
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
    <LikeContext.Provider
      value={{
        likedNews,
        toggleLike,
        loading,
        isLiked,
        likesCount,
        hydrateLikes, // expose untuk HomePage
      }}
    >
      {children}
    </LikeContext.Provider>
  );
};
