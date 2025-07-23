import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PageAbout({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tentang Aplikasi</Text>
      </View>

      {/* ISI UTAMA */}
      <View style={styles.centeredContent}>
        {/* Logo Radar Tulungagung */}
        <Image
          source={require('../assets/image22.png')} // <- ini pakai file yang kamu maksud
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Judul */}
        <Text style={styles.epaperText}>EPAPER</Text>

        <Text style={styles.subText}>
          <Text style={styles.radarText}>RADAR</Text>
          <Text style={styles.tulungagungText}> TULUNGAGUNG</Text>
        </Text>

        {/* Deskripsi */}
        <Text style={styles.description}>
          Aplikasi ini memudahkan Anda untuk membaca koran Radar Tulungagung secara digital, langsung dari HP Anda.
        </Text>

        {/* Fitur Utama */}
        <View style={styles.featureBox}>
          <Text style={styles.featureItem}>• Baca e-paper harian</Text>
          <Text style={styles.featureItem}>• Suarakan pendapatmu lewat komentar</Text>
          <Text style={styles.featureItem}>• Simpan berita favorit</Text>
        </View>

        {/* Tanggal Rilis */}
        <Text style={styles.releaseDate}>Dirilis: 16 Juli 2070</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#1E3A8A',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  centeredContent: {
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  epaperText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  subText: {
    fontSize: 20,
    marginTop: 4,
    fontWeight: 'bold',
  },
  radarText: {
    color: '#F59E0B',
  },
  tulungagungText: {
    color: '#1E3A8A',
  },
  description: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
    color: '#374151',
  },
  featureBox: {
    marginTop: 24,
    borderWidth: 1.5,
    borderColor: '#1E3A8A',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    width: '100%',
  },
  featureItem: {
    fontSize: 14,
    marginBottom: 8,
    color: '#111827',
  },
  releaseDate: {
    marginTop: 20,
    fontSize: 12,
    color: '#6B7280',
  },
});
