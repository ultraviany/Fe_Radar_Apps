import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Alert,
  Modal,
  FlatList,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PageCreate({ navigation }) {
  const [coverUri, setCoverUri] = useState(null);
  const [pdfFile, setPdfFile] = useState([]); // array untuk banyak pdf
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedWilayah, setSelectedWilayah] = useState(null);
  const [wilayahModalVisible, setWilayahModalVisible] = useState(false);

  const wilayahList = ["TULUNGAGUNG", "TRENGGALEK", "BLITAR"];

  const wilayahLabel = {
    TULUNGAGUNG: "Radar Tulungagung",
    TRENGGALEK: "Radar Trenggalek",
    BLITAR: "Radar Blitar",
  };

  const pickCoverImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) setCoverUri(result.assets[0].uri);
  };

  const pickPdf = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      console.log("hasil documentPicker:", result);

      if (!result.canceled && result.assets?.length > 0) {
        const file = result.assets[0];

        // Hilangkan prefix file:// di iOS
        const fileUri =
          Platform.OS === "ios" ? file.uri.replace("file://", "") : file.uri;

        const newFile = {
          uri: fileUri,
          name: file.name,
          type: file.mimeType || "application/pdf",
          size: file.size,
        };

        setPdfFile((prev) => [...prev, newFile]);

        console.log("PDF disiapkan untuk upload:", newFile);
      }
    } catch (error) {
      console.error("Gagal pilih PDF:", error);
    }
  };

  const removePdf = (index) => {
    const updatedFiles = [...pdfFile];
    updatedFiles.splice(index, 1);
    setPdfFile(updatedFiles);
    console.log("PDF dihapus, index:", index);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleSave = async () => {
    if (!coverUri || pdfFile.length === 0 || !selectedWilayah) {
      Alert.alert(
        "Lengkapi Data",
        "Silakan unggah cover, minimal 1 file PDF, dan pilih wilayah terlebih dahulu."
      );
      return;
    }

    try {
      console.log("===CREATE NEWS===");
      console.log("cover URI:", coverUri);
      console.log("PDF File:", pdfFile);
      console.log("Wilayah:", selectedWilayah);
      console.log("Tanggal:", date.toISOString());

      const formData = new FormData();

      // cover image
      formData.append("image", {
        uri: coverUri,
        name: `cover-${Date.now()}.jpg`,
        type: "image/jpeg",
      });
      console.log("cover ditambahkan ke data");

      // multiple pdf file
      pdfFile.forEach((file, index) => {
        formData.append("pdfUrl", {
          uri: file.uri,
          name: file.name || `file-${index + 1}-${Date.now()}.pdf`,
          type: file.type || "application/pdf",
        });
      });
      console.log("pdf ditambahkan");

      // wilayah
      formData.append("region", selectedWilayah);
      console.log("Region ditambahkan:", selectedWilayah);

      // tanggal terbit
      formData.append("publishedAt", date.toISOString());
      console.log("Tanggal ditambahkan:", date.toISOString());

      // Cek isi FormData sebelum dikirim
      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + JSON.stringify(pair[1]));
      }

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Gagal", "Token tidak ditemukan, silakan login ulang");
        return;
      }

      console.log("===KIRIM REQUEST BE===");

      const response = await fetch(
        "http://192.168.1.93:3000/RadarApps/api/v1/news/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      console.log("Status response:", response.status);

      const result = await response.json();
      console.log("Hasil Response JSON:", result);

      if (response.ok) {
        Alert.alert("Sukses", "Berita berhasil dibuat!");
        navigation.goBack();
      } else {
        Alert.alert("Gagal", result.message || "Terjadi kesalahan");
      }
    } catch (error) {
      console.error("ERROR di handleSave", error);
      Alert.alert("Error", "Tidak dapat mengirim data");
    }
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

      {/* FORM */}
      <ScrollView
        contentContainerStyle={styles.formWrapper}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.formTitle}>Tambahkan Berita Terbaru</Text>
        <Text style={styles.formDesc}>
          Pastikan form yang diisi sesuai dengan judul yang tertera.
        </Text>

        <Text style={styles.label}>Cover E-paper</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={pickCoverImage}>
          {coverUri ? (
            <Image source={{ uri: coverUri }} style={styles.coverPreview} />
          ) : (
            <Text style={styles.uploadText}>📤 Upload cover e-paper</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.note}>*maksimal 100MB</Text>

        <Text style={styles.label}>PDF E-paper</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={pickPdf}>
          <Text style={styles.uploadText}>📄 Upload PDF e-paper</Text>
        </TouchableOpacity>

        {/* Tampilkan list pdf yang sudah dipilih */}
        {pdfFile.length > 0 &&
          pdfFile.map((file, index) => (
            <View key={index} style={styles.pdfItem}>
              <Text style={{ fontSize: 14, color: "#333", flex: 1 }}>
                {index + 1}. {file.name}
              </Text>
              <TouchableOpacity onPress={() => removePdf(index)}>
                <Ionicons name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))}

        <Text style={styles.note}>
          *pastikan format file yang Anda kirim .pdf
        </Text>

        {/* WILAYAH */}
        <Text style={styles.label}>Wilayah</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setWilayahModalVisible(true)}
        >
          <View style={styles.dateInput}>
            <Text>
              {selectedWilayah
                ? wilayahLabel[selectedWilayah]
                : "📍 Pilih wilayah asal e-paper"}
            </Text>
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
                    <Text style={{ fontSize: 16 }}>{wilayahLabel[item]}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        {/* TANGGAL */}
        <Text style={styles.label}>Tanggal Terbit E-paper</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.input}
        >
          <View style={styles.dateInput}>
            <Text>{formatDate(date)}</Text>
            <Ionicons name="calendar" size={20} color="#000" />
          </View>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Simpan Berita</Text>
        </TouchableOpacity>
      </ScrollView>
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
    zIndex: 1,
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
  formWrapper: { paddingHorizontal: 16, paddingVertical: 38 },
  formTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  formDesc: { color: "#666", marginBottom: 20 },
  label: { marginTop: 12, marginBottom: 6, fontWeight: "600" },
  uploadBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 14,
    justifyContent: "center",
    marginBottom: 5,
  },
  uploadText: { color: "#999", fontStyle: "italic" },
  coverPreview: {
    width: "100%",
    height: 160,
    resizeMode: "contain",
    borderRadius: 8,
  },
  note: { color: "#888", fontSize: 12, marginBottom: 12, marginTop: -5 },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  dateInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#1E4B8A",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: { color: "#fff", fontWeight: "bold" },

  pdfItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
