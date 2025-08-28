import React, { useState } from 'react';
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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default function PageCreate({ navigation }) {
  const [coverUri, setCoverUri] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedWilayah, setSelectedWilayah] = useState(null);
  const [wilayahModalVisible, setWilayahModalVisible] = useState(false);

  const wilayahList = ['Radar Tulungagung', 'Radar Trenggalek', 'Radar Blitar'];

  const pickCoverImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) setCoverUri(result.assets[0].uri);
  };

  const pickPdf = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });
    if (result.type === 'success') setPdfFile(result);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleSave = async () => {
    if (!coverUri || !pdfFile || !selectedWilayah) {
      Alert.alert('Lengkapi Data', 'Silakan unggah cover, file PDF, dan pilih wilayah terlebih dahulu.');
      return;
    }

    const formData = new FormData();

    // Upload Cover Image
    const filenameImage = coverUri.split('/').pop();
    const matchImage = /\.(\w+)$/.exec(filenameImage || '');
    const typeImage = matchImage ? `image/${matchImage[1]}` : 'image';

    formData.append('image', {
      uri: coverUri,
      name: filenameImage,
      type: typeImage,
    });

    // Upload PDF File
    const filenamePdf = pdfFile.name;
    const typePdf = 'application/pdf';

    formData.append('pdfUrl', {
      uri: pdfFile.uri,
      name: filenamePdf,
      type: typePdf,
    });

    // Region Mapping
    let region = '';
    if (selectedWilayah.includes('Tulungagung')) region = 'TULUNGAGUNG';
    else if (selectedWilayah.includes('Blitar')) region = 'BLITAR';
    else if (selectedWilayah.includes('Trenggalek')) region = 'TRENGGALEK';

    // Tanggal publish
    formData.append('region', region);
    formData.append('publishedAt', new Date(date).toISOString());

    try {
      const response = await fetch('http://192.168.0.27:3000/RadarApps/api/v1/news/create', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Berhasil', 'Berita berhasil disimpan!');
        setCoverUri(null);
        setPdfFile(null);
        setSelectedWilayah(null);
        setDate(new Date());
      } else {
        console.error('Gagal menyimpan:', data);
        Alert.alert('Gagal', data.message || 'Terjadi kesalahan saat menyimpan berita.');
      }
    } catch (error) {
      console.error('Error saat mengunggah:', error);
      Alert.alert('Error', 'Tidak dapat terhubung ke server.');
    }
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

      {/* FORM */}
      <View style={styles.formWrapper}>
        <Text style={styles.formTitle}>Tambahkan Berita Terbaru</Text>
        <Text style={styles.formDesc}>Pastikan form yang diisi sesuai dengan judul yang tertera.</Text>

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
          <Text style={styles.uploadText}>
            📄 {pdfFile ? pdfFile.name : 'Upload PDF e-paper'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.note}>*pastikan format file yang Anda kirim .pdf</Text>

        {/* WILAYAH */}
        <Text style={styles.label}>Wilayah</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setWilayahModalVisible(true)}
        >
          <View style={styles.dateInput}>
            <Text>{selectedWilayah || '📍 Pilih wilayah asal e-paper'}</Text>
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

        {/* TANGGAL */}
        <Text style={styles.label}>Tanggal Terbit E-paper</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
          <View style={styles.dateInput}>
            <Text>{formatDate(date)}</Text>
            <Ionicons name="calendar" size={20} color="#000" />
          </View>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Simpan Berita</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    backgroundColor: '#1E4B8A',
    paddingTop: Platform.OS === 'ios' ? 90 : 70,
    paddingBottom: 30,
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 25,
    marginTop: 8,
  },
  yellowText: {
    color: '#efbe1eff',
    fontWeight: 'bold',
  },
  whiteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  formWrapper: { padding: 20 },
  formTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  formDesc: { color: '#666', marginBottom: 20 },
  label: { marginTop: 12, marginBottom: 6, fontWeight: '600' },
  uploadBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    justifyContent: 'center',
    marginBottom: 5,
  },
  uploadText: { color: '#999', fontStyle: 'italic' },
  coverPreview: {
    width: '100%',
    height: 160,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  note: { color: '#888', fontSize: 12, marginBottom: 12, marginTop: -5 },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#1E4B8A',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveText: { color: '#fff', fontWeight: 'bold' },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
