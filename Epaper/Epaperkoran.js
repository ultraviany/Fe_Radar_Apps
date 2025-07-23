import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const images = [
  require('../assets/koranhalaman13.png'),
  require('../assets/koranhalaman14.png'),
];

const Epaper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.epaperText}>EPAPER</Text>
          <Text style={styles.subText}>
            <Text style={styles.radarText}>RADAR </Text>
            <Text style={styles.tulungagungText}>TULUNGAGUNG</Text>
          </Text>
        </View>

        <View style={{ width: 24 }} />
      </View>

      {/* Konten utama */}
      <View style={styles.content}>
        <Text style={styles.dateTitle}>Radar Tulungagung, 14 Juli 2025</Text>

        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={handlePrev}
            disabled={currentIndex === 0}
            style={styles.circleButton}
          >
            <AntDesign name="left" size={20} color="#1E4B8A" />
          </TouchableOpacity>

          <Image
            source={images[currentIndex]}
            style={styles.koranImage}
            resizeMode="contain"
          />

          <TouchableOpacity
            onPress={handleNext}
            disabled={currentIndex === images.length - 1}
            style={styles.circleButton}
          >
            <AntDesign name="right" size={20} color="#1E4B8A" />
          </TouchableOpacity>
        </View>

        <Text style={styles.pageIndicator}>
          {currentIndex + 1} / {images.length}
        </Text>
      </View>

      {/* Komentar di bawah */}
      <View style={styles.commentWrapper}>
        <AntDesign
          name="message1"
          size={30}
          color="#000000ff"
          style={{ marginRight: 8 }}
        />
        <TextInput
          placeholder="Tambahkan Komentar"
          placeholderTextColor="#B0B0B0"
          style={styles.commentInput}
        />
      </View>
    </View>
  );
};

export default Epaper;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#1E4B8A',
    width: '100%',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  epaperText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subText: {
    flexDirection: 'row',
  },
  radarText: {
    color: '#F9B233',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tulungagungText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  dateTitle: {
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 16,
  },
  imageContainer: {
    marginTop: 16,
    marginHorizontal: 20,
    backgroundColor: '#154D9C',
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  koranImage: {
    width: width * 0.55,
    height: height * 0.4,
  },
  circleButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  pageIndicator: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },
  commentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
    marginBottom: 45,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  commentInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
});
