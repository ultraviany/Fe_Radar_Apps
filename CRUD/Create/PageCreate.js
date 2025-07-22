// CRUD/Create/PageCreate.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  TextInput,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';

export default function PageCreate({ navigation }) {
  const [coverUri, setCoverUri] = useState(null);
  const [pdfName, setPdfName] = useState(null);
  const [tanggalTerbit, setTanggalTerbit] = useState('');

  // Fungsi pilih gambar dari galeri
  const pickCoverImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setCoverUri(result.assets[0].uri);
    }
  };

  // Fungsi pilih PDF
  const pickPdf = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });

    if (result.type === 'success') {
      setPdfName(result.name);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          <Text style={styles.whiteText}>EPAPER{'\n'}</Text>
          <Text style={styles.yellowText}>RADAR</Text>
          <Text style={styles.whiteText}>TULUNGAGUNG</Text>
        </Text>
      </View>

      {/* FORM */}
      <View style={styles.formWrapper}>
        <Text style={styles.formTitle}>Tambahkan Berita Terbaru</Text>
        <Text style={styles.formDesc}>
          Pastikan form yang diisi sesuai dengan judul yang tertera.
        </Text>

        {/* UPLOAD COVER */}
        <Text style={styles.label}>Cover E-paper</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={pickCoverImage}>
          {coverUri ? (
            <Image source={{ uri: coverUri }} style={styles.coverPreview} />
          ) : (
            <Text style={styles.uploadText}>📤 Upload cover e-paper</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.note}>*maksimal 100MB</Text>

        {/* UPLOAD PDF */}
        <Text style={styles.label}>Pdf E-paper</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={pickPdf}>
          <Text style={styles.uploadText}>📄 {pdfName || 'Upload pdf e-paper'}</Text>
        </TouchableOpacity>
        <Text style={styles.note}>*pastikan format file yang anda kirim .pdf</Text>

        {/* TANGGAL TERBIT */}
        <Text style={styles.label}>Tanggal terbit E-paper</Text>
        <TextInput
          placeholder="Masukkan tanggal terbit epaper"
          style={styles.input}
          value={tanggalTerbit}
          onChangeText={setTanggalTerbit}
        />

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Simpan Berita</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    backgroundColor: '#1E3A8A',
    paddingTop: 90,
    paddingBottom: 30,
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  yellowText: { color: '#efbe1eff', fontWeight: 'bold' },
  whiteText: { color: '#fff', fontWeight: 'bold' },

  formWrapper: { padding: 20 },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  formDesc: {
    color: '#666',
    marginBottom: 20,
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: '600',
  },
  uploadBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    justifyContent: 'center',
    marginBottom: 5,
  },
  uploadText: {
    color: '#999',
    fontStyle: 'italic',
  },
  coverPreview: {
    width: '100%',
    height: 160,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  note: {
    color: '#888',
    fontSize: 12,
    marginBottom: 12,
    marginTop: -5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
