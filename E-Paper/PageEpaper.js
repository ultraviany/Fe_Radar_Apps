import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

const screenHeight = Dimensions.get('window').height;

export default function PageEpaper({ navigation }) {
  const pubHtml5Link = "https://online.pubhtml5.com/uwppd/hmyj/";

  return (
    <View style={styles.container}>
      {/* HEADER */}
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
      <Text style={styles.date}>Radar Trenggalek, 21   Juli 2025</Text>

      {/* EPAPER VIEW (dengan tinggi terbatas, tidak fullscreen, tanpa panah, tanpa background biru) */}
      <View style={styles.webviewContainer}>
        <WebView
          source={{ uri: pubHtml5Link }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>

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
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center',
  },
  webviewContainer: {
    height: screenHeight * 0.45,
    marginTop: 16,
    marginHorizontal: 50,
    borderRadius: 12,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
  commentArea: {
    position: 'absolute',
    bottom: 30,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
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
