import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  Modal,
  Image,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.1.93:3000";

// buat menampilkan waktu
const formatTimeAgo = (dateString) => {
  const now = new Date();
  const commentDate = new Date(dateString);
  const diff = Math.floor((now - commentDate) / 1000); // selisih dalam detik

  if (diff < 60) return `${diff} detik lalu`;
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} hari lalu`;

  // jika lebih dari seminggu, tampilkan tanggal pendek
  return commentDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
};

export default function PageComment({ navigation, route }) {
  const newsId = route?.params?.newsId;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [region, setRegion] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const quantity = 10; // jumlah komentar per page
  const periode = new Date().getFullYear();

  const parseJsonSafe = (text) => {
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  };

  const fetchComments = async (pageNumber = 1, isLoadMore = false) => {
    try {
      if (isLoadMore) setLoadingMore(true);
      else setLoading(true);

      const savedToken = await AsyncStorage.getItem("token");
      const savedUserName = await AsyncStorage.getItem("userName");
      const savedUserId = await AsyncStorage.getItem("userId");

      setToken(savedToken);
      setUserName(savedUserName);
      setUserId(savedUserId);

      // Fetch detail berita
      if (!isLoadMore) {
        const newsUrl = `${BASE_URL}/RadarApps/api/v1/news/${newsId}`;
        const resNews = await fetch(newsUrl);
        const jsonNews = parseJsonSafe(await resNews.text());
        if (jsonNews?.success && jsonNews?.data) {
          setRegion(jsonNews.data.region || "");
          setPublishedAt(jsonNews.data.publishedAt || "");
        }
      }

      // Fetch komentar
      const commentsUrl = `${BASE_URL}/RadarApps/api/v1/comments/all?newsId=${newsId}&periode=${periode}&page=${pageNumber}&quantity=${quantity}`;
      const res = await fetch(commentsUrl, {
        headers: {
          Authorization: savedToken ? `Bearer ${savedToken}` : "",
          "Content-Type": "application/json",
        },
      });
      const result = parseJsonSafe(await res.text());

      if (Array.isArray(result?.data)) {
        const mapped = result.data.map((c) => ({
          id: c.id,
          userId: c.user?.id,
          name: c.user?.username || c.user?.name || "Anonymous",
          comment: c.content,
          userImage: c.user?.image || null, // menambahkan image
          timeAgo: formatTimeAgo(c.created_at), // meanmbahkan waktu
        }));
        if (isLoadMore) setComments((prev) => [...prev, ...mapped]);
        else setComments(mapped);

        if (result.data.length < quantity) setHasMore(false);
        else setHasMore(true);
      } else {
        if (!isLoadMore) setComments([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error("❌ Gagal fetch komentar:", error);
      if (!isLoadMore) setComments([]);
      setHasMore(false);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreComments = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchComments(nextPage, true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setPage(1);
      setHasMore(true);
      fetchComments(1, false);
    }, [newsId])
  );

  const handleSendComment = async () => {
    if (!newComment.trim()) return;
    if (!token) {
      Alert.alert("Error", "Anda harus login terlebih dahulu untuk komentar.");
      return;
    }
    try {
      const postUrl = `${BASE_URL}/RadarApps/api/v1/comments/create`;
      const response = await fetch(postUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newsId, content: newComment }),
      });
      const result = await response.json();

      if (result?.success) {
        setComments((prev) => [
          ...prev,
          {
            id: result.data?.id,
            userId: userId,
            name: userName || "Anda",
            comment: result.data?.content ?? newComment,
          },
        ]);
        setNewComment("");
      } else {
        Alert.alert("Error", result?.message || "Gagal membuat komentar.");
      }
    } catch (error) {
      console.error("❌ Error saat create comment:", error);
      Alert.alert("Error", "Terjadi kesalahan saat menghubungi server.");
    }
  };

  const handleCommentPress = (comment) => {
    setSelectedComment(comment);
    setModalVisible(true);
  };

  const handleDeleteComment = async () => {
    if (!selectedComment) return;
    try {
      const res = await fetch(
        `${BASE_URL}/RadarApps/api/v1/comments/delete/${selectedComment.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await res.json();

      if (result?.success) {
        setComments((prev) => prev.filter((c) => c.id !== selectedComment.id));
        Alert.alert("Sukses", "Komentar berhasil dihapus");
      } else {
        Alert.alert("Error", result?.message || "Gagal menghapus komentar");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Terjadi kesalahan server");
    } finally {
      setModalVisible(false);
      setSelectedComment(null);
    }
  };

  // render item comment, menampilkan profile image, username dan hasil comment
  const CommentItem = ({ item, userId, handleCommentPress }) => {
    const [expanded, setExpanded] = useState(false);

    const MAX_LENGTH = 100;
    const isLong = item.comment.length > MAX_LENGTH;
    const displayedText = expanded
      ? item.comment
      : isLong
      ? item.comment.slice(0, MAX_LENGTH) + "..."
      : item.comment;

    return (
      <TouchableOpacity
        onPress={() => item.userId === userId && handleCommentPress(item)}
      >
        <View style={styles.commentCard}>
          <View style={styles.commentHeader}>
            {item.userImage ? (
              <Image
                source={{ uri: `${BASE_URL}/user/${item.userImage}` }}
                style={styles.avatarComment}
              />
            ) : (
              <Ionicons
                name="person-circle"
                size={40}
                color="#3B82F6"
                style={styles.avatarComment}
              />
            )}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexShrink: 1,
              }}
            >
              <Text style={styles.commentName}>{item.name}</Text>
              {item.timeAgo && (
                <Text style={styles.commentTime}> • {item.timeAgo}</Text>
              )}
            </View>
          </View>

          {/* isi komentar */}
          <Text style={styles.commentText}>
            {displayedText}
            {isLong && !expanded && (
              <Text style={styles.moreText} onPress={() => setExpanded(true)}>
                {" "}
                selengkapnya
              </Text>
            )}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={
        Platform.OS === "ios" ? 0 : StatusBar.currentHeight || 24
      }
    >
      <StatusBar barStyle="light-content" backgroundColor="#1E4B8A" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.inner}>
          <SafeAreaView style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>EPAPER</Text>
            <Text style={styles.headerSubtitle}>
              <Text style={styles.yellowText}>RADAR</Text>
              <Text style={styles.whiteText}> {region.toUpperCase()}</Text>
            </Text>
          </SafeAreaView>

          <Text style={styles.date}>
            {region
              ? `RADAR ${region}, ${new Date(publishedAt).toLocaleDateString(
                  "id-ID",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}`
              : ""}
          </Text>

          <Text style={styles.commentLabel}>Komentar ({comments.length}) </Text>

          <FlatList
            data={comments}
            renderItem={({ item }) => (
              <CommentItem
                item={item}
                userId={userId}
                handleCommentPress={handleCommentPress}
              />
            )}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : index.toString()
            } // pakai index kalau id null
            contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
            onEndReached={loadMoreComments}
            onEndReachedThreshold={0.2}
            ListFooterComponent={
              loadingMore ? (
                <ActivityIndicator
                  size="small"
                  color="#1E4B8A"
                  style={{ marginVertical: 10 }}
                />
              ) : null
            }
            ListEmptyComponent={
              !loading && (
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 20,
                    color: "#6B7280",
                  }}
                >
                  Belum ada komentar
                </Text>
              )
            }
          />

          {/* INPUT KOMENTAR */}
          <View style={styles.commentInputArea}>
            <Ionicons name="person-circle-outline" size={28} color="#6B7280" />
            <TextInput
              style={styles.input}
              placeholder="Tambahkan Komentar"
              placeholderTextColor="#9CA3AF"
              value={newComment}
              onChangeText={setNewComment}
              returnKeyType="send"
              onSubmitEditing={handleSendComment}
            />
            <TouchableOpacity onPress={handleSendComment}>
              <Ionicons
                name="send"
                size={24}
                color={newComment.trim() ? "#1E3A8A" : "#9CA3AF"}
              />
            </TouchableOpacity>
          </View>

          {/* MODAL HAPUS */}
          <Modal visible={modalVisible} transparent animationType="fade">
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <Text style={{ fontSize: 16 }}>Hapus komentar ini?</Text>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <TouchableOpacity
                    onPress={handleDeleteComment}
                    style={styles.modalButton}
                  >
                    <Text style={{ color: "white" }}>Hapus</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={[styles.modalButton, { backgroundColor: "white" }]}
                  >
                    <Text style={{ color: "#1E4B8A" }}>Batal</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  inner: { flex: 1 },
  header: {
    backgroundColor: "#1E4B8A",
    paddingTop: Platform.OS === "android" ? 70 : 90,
    paddingBottom: 30,
    alignItems: "center",
    position: "relative",
  },
  backButton: { position: "absolute", top: 40, left: 20, zIndex: 1 },
  headerTitle: { fontSize: 35, fontWeight: "bold", color: "#fff" },
  headerSubtitle: { fontSize: 25, marginTop: 8 },
  yellowText: { color: "#efbe1eff", fontWeight: "bold" },
  whiteText: { color: "#fff", fontWeight: "bold" },
  date: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 25,
    fontSize: 15,
  },
  commentCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  commentName: { fontWeight: "bold", fontSize: 14 },
  commentText: { fontSize: 14, color: "#111827" },
  commentInputArea: {
    // position: "absolute",
    backgroundColor: "#F3F4F6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    color: "#111827",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "80%",
  },
  modalButton: {
    flex: 1,
    backgroundColor: "#1E4B8A",
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E4B8A",
  },
  commentLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  avatarComment: {
    width: 40,
    height: 40,
    borderRadius: 15,
    marginRight: 8,
  },
  commentTime: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 4,
    flexShrink: 1,
  },
  moreText: {
  color: "#a3a4a5ff",
  fontWeight: "bold",
}
});
