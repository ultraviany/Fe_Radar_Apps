import React, { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const BASE_URL = "http://192.168.1.6:3000";

export const useActivities = () => {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      const fetchData = async () => {
        setLoading(true);
        try {
          const token = await AsyncStorage.getItem("token");
          const headers = token ? { Authorization: `Bearer ${token}` } : {};

          // === Fetch Comments ===
          const resComments = await fetch(
            `${BASE_URL}/RadarApps/api/v1/activity/comments`,
            { headers }
          );
          let commentsData = resComments.ok ? await resComments.json() : [];
          console.log("📌 Raw Comments Response:", commentsData);

          // Ambil array sesuai struktur API
          if (commentsData && commentsData.data) {
            commentsData = commentsData.data;
          } else if (commentsData && commentsData.comments) {
            commentsData = commentsData.comments;
          }

          // === Fetch Likes ===
          const resLikes = await fetch(
            `${BASE_URL}/RadarApps/api/v1/activity/likes`,
            { headers }
          );
          let likesData = resLikes.ok ? await resLikes.json() : [];
          console.log("📌 Raw Likes Response:", likesData);

          if (likesData && likesData.data) {
            likesData = likesData.data;
          } else if (likesData && likesData.likes) {
            likesData = likesData.likes;
          }

          // === Normalisasi ===
          const commentsNormalized = (Array.isArray(commentsData) ? commentsData : []).map((c) => ({
            id: c.id || c._id,
            type: "comment",
            timestamp: c.createdAt || null,
            content: c.content || "",
            news: c.news || null,
          }));

          const likesNormalized = (Array.isArray(likesData) ? likesData : []).map((l) => ({
            id: l.id || l._id,
            type: "like",
            timestamp: l.likedAt || null,
            news: l.news || null,
          }));

          // Gabung + urutkan terbaru
          const combined = [...commentsNormalized, ...likesNormalized].sort(
            (a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0)
          );

          if (!mounted) return;

          setComments(commentsNormalized);
          setLikes(likesNormalized);
          setActivities(combined);

          console.log("✅ Fetched Activities:", {
            comments: commentsNormalized,
            likes: likesNormalized,
            combined: combined,
          });
        } catch (err) {
          console.error("❌ Error fetch activities:", err);
          if (mounted) {
            setComments([]);
            setLikes([]);
            setActivities([]);
          }
        } finally {
          if (mounted) setLoading(false);
        }
      };

      fetchData();

      return () => {
        mounted = false;
      };
    }, [])
  );

  return { comments, likes, activities, loading };
};
