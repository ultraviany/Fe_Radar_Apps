import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function PageEpaper({ navigation }) {
  const [currentPage, setCurrentPage] = useState(2);
  const totalPages = 3;

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <View style={styles.container}>
      {/* HEADER - Menyerupai PageComment */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>EPAPER</Text>
        <Text style={styles.headerSubtitle}>
          <Text style={styles.yellowText}>RADAR</Text>
          <Text style={styles.whiteText}> TULUNGAGUNG</Text>
        </Text>
      </View>

      {/* TANGGAL */}
      <Text style={styles.date}>Radar Tulungagung, 14 Juli 2025</Text>

      {/* KORAN */}
      <View style={styles.epaperContainer}>
        <TouchableOpacity onPress={goToPrev}>
          <Ionicons name="chevron-back-circle" size={30} color="#fff" />
        </TouchableOpacity>

        <Image source={require('../assets/koran.png')} style={styles.image} />

        <TouchableOpacity onPress={goToNext}>
          <Ionicons name="chevron-forward-circle" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* PAGINATION */}
      <Text style={styles.pagination}>{currentPage} / {totalPages}</Text>

      {/* KOMENTAR */}
      <TouchableOpacity style={styles.commentArea} onPress={() => navigation.navigate('PageComment')}>
        <Ionicons name="chatbubble-ellipses" size={28} color="#000" style={styles.commentIcon} />
        <View style={styles.commentBox}>
          <Text style={styles.placeholderText}>Tambahkan Komentar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#1E4B8A',
    paddingTop: 90,
    paddingBottom: 30,
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 60,
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
  date: {
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 15,
  },
  epaperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E4B8A',
    padding: 10,
    borderRadius: 16,
    marginTop: 16,
  },
  image: {
    width: screenWidth * 0.5,
    height: screenHeight * 0.4,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  pagination: {
    marginTop: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  commentArea: {
    position: 'absolute',
    bottom: 30,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentIcon: {
    paddingRight: 16,
  },
  commentBox: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 14,
    borderRadius: 20,
    marginLeft: 12,
  },
  placeholderText: {
    color: '#9CA3AF',
    fontSize: 16,
  },
});
