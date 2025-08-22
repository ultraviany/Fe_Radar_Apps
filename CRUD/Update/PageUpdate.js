import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.1.93:3000";

export default function PageUpdate({ navigation, route }) {
  const { id } = route.params || {}; // id news dari homeupdate

  const [cover, setCover] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [selectedWilayah, setSelectedWilayah] = useState(null);
  const [wilayahModalVisible, setWilayahModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const wilayahList = ["Radar Tulungagung", "Radar Trenggalek", "Radar Blitar"];

  // fetch berita
  const fetchDetail = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/RadarApps/api/v1/news/${id}`);
      const json = await res.json();
      const data = json?.data || json;

      // Normalisasi path image ( opsional )
      const fixedImage = data?.image
        ? data.image
            .replace(/\\/g, "/")
            .replace(/^public\//, "")
        : null;

      setCover(
        fixedImage
          ? {
              uri: `${BASE_URL}/news/${fixedImage}?t=${Date.now()}`,
              name: fixedImage.split("/").pop(),
              type: "image/jpeg",
              existing: true,
            }
          : null
      );

      // pdf

      setPdf(
        data?.pdfUrl
          ? {
              uri: data.pdfUrl.startsWith("http")
                ? data.pdfUrl
                : `${BASE_URL}/${data.pdfUrl.replace(/^public\//, "")}`,
              name: data.pdfUrl.split("/").pop(),
              type: "application/pdf",
              existing: true,
            }
          : null
      );

      if (data?.region) {
        const map = {
          TULUNGAGUNG: "Radar Tulungagung",
          BLITAR: "Radar Blitar",
          TRENGGALEK: "Radar Trenggalek",
        };
        setSelectedWilayah(map[data.region] || "Radar Tulungagung");
      } else {
        // fallback
        setSelectedWilayah("Radar Tulungagung");
      }
    } catch (error) {
      console.error("Gagal fetch detail:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        if (active) await fetchDetail();
      })();
      return () => {
        active = false;
      };
    }, [fetchDetail])
  );

  const pickCoverFromGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Izin akses galeri dibutuhkan!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setCover({
        uri: asset.uri,
        name: asset.fileName || asset.uri.split("/").pop(),
        type: asset.mimeType || "image/jpeg",
        existing: false,
      });
    }
  };

  const handlePdfUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setPdf({
        uri: asset.uri,
        name: asset.name || "file.pdf",
        type: asset.mimeType || "application/pdf",
        existing: false,
      });
    }
  };

  const handleSave = async () => {
    if (!cover || !pdf || !selectedWilayah) {
      Alert.alert(
        "Lengkapi Data",
        "Silakan unggah cover, file PDF, dan pilih wilayah terlebih dahulu."
      );
      return;
    }

    try {
      console.log("📤 Mengirim update ke BE...");
      console.log("Cover:", cover);
      console.log("PDF:", pdf);
      console.log("Wilayah:", selectedWilayah);

      const regionMap = {
        "Radar Tulungagung": "TULUNGAGUNG",
        "Radar Blitar": "BLITAR",
        "Radar Trenggalek": "TRENGGALEK",
      };

      const formData = new FormData();
      formData.append("id", id);
      formData.append("region", regionMap[selectedWilayah] || "TULUNGAGUNG");

      if (!cover.existing) {
        formData.append("image", {
          uri: cover.uri.startsWith("file://")
            ? cover.uri
            : "file://" + cover.uri,
          name: cover.name || "cover.jpg",
          type: cover.type || "image/jpeg",
        });
      }

      if (!pdf.existing) {
        formData.append("pdfUrl", {
          uri: pdf.uri.startsWith("file://") ? pdf.uri : "file://" + pdf.uri,
          name: pdf.name || "file.pdf",
          type: pdf.type || "application/pdf",
        });
      }

      // 🔎 Debug log di sini
      for (let pair of formData._parts) {
        console.log(pair[0], pair[1]);
      }

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Gagal", "Token tidak ditemukan, silakan login ulang");
        return;
      }

      const res = await fetch(`${BASE_URL}/RadarApps/api/v1/news/update/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // penting!
        },
        body: formData,
      });

      console.log("Response:", res);

      const result = await res.json();
      console.log("Response BE:", result);

      if (res.ok) {
        Alert.alert("Sukses", "Berita berhasil diperbarui!");
        navigation.navigate("HomeUpdate", { refresh: true }); 
      } else {
        Alert.alert("Error", result.message || "Gagal update berita.");
      }
    } catch (error) {
      console.error("Gagal update:", error);
      Alert.alert("Error", "Terjadi kesalahan saat update.");
    }
  };

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1E4B8A" />
      </View>
    );

  return (
    <View style={styles.container}>
      {/* Header */}
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

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Edit Berita</Text>
        <Text style={styles.desc}>
          Pastikan form yang diisi sesuai dengan judul yang tertera.
        </Text>

        {/* Cover */}
        <Text style={styles.label}>Edit Cover E-paper</Text>
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={pickCoverFromGallery}
        >
          <Entypo name="image" size={24} color="#aaa" />
          <Text style={styles.uploadText}>
            {cover ? cover.name : "Upload cover e-paper"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.note}>*maksimal 100MB</Text>

        {/* PDF */}
        <Text style={styles.label}>Edit PDF E-paper</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={handlePdfUpload}>
          <Ionicons name="document-text" size={24} color="#aaa" />
          <Text style={styles.uploadText}>
            {pdf ? pdf.name : "Upload PDF e-paper"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.note}>
          *pastikan format file yang Anda kirim .pdf
        </Text>

        {/* Wilayah */}
        <Text style={styles.label}>Wilayah</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setWilayahModalVisible(true)}
        >
          <View style={styles.row}>
            <Text>{selectedWilayah || "📍 Pilih wilayah asal e-paper"}</Text>
            <Ionicons name="chevron-down" size={20} color="#000" />
          </View>
        </TouchableOpacity>

        <Modal
          visible={wilayahModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setWilayahModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setWilayahModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <FlatList
                data={wilayahList}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedWilayah(item);
                      setWilayahModalVisible(false);
                    }}
                    style={styles.modalItem}
                  >
                    <Text style={{ fontSize: 16 }}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Simpan */}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Simpan Perubahan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
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
  },
  headerTitle: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 25,
    marginTop: 8,
  },
  yellowText: {
    color: "#efbe1eff",
    fontWeight: "bold",
  },
  whiteText: {
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
  },
  desc: {
    textAlign: "center",
    color: "#444",
    marginBottom: 25,
    fontSize: 13,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 15,
  },
  uploadBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    marginBottom: 6,
  },
  uploadText: {
    color: "#aaa",
    fontSize: 15,
  },
  note: {
    fontSize: 12,
    color: "#888",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1E4B8A",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
