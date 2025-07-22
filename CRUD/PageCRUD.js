import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function PageCRUD() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>EPAPER</Text>
      <Text style={styles.subTitle}>RADAR TULUNGAGUNG</Text>

      {/* Tombol CRUD */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('PageCreate')}
        >
          <Ionicons name="add-circle-outline" size={28} color="#1E3A8A" />
          <Text style={styles.cardText}>Tambahkan Epaper</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('PageRead')}
        >
          <Ionicons name="eye-outline" size={28} color="#1E3A8A" />
          <Text style={styles.cardText}>Lihat Koleksi Epaper</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('PageUpdate')}
        >
          <Ionicons name="create-outline" size={28} color="#1E3A8A" />
          <Text style={styles.cardText}>Update Epaper</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('PageDelete')}
        >
          <Ionicons name="trash-outline" size={28} color="#DC2626" />
          <Text style={styles.cardText}>Hapus Epaper</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginTop: 50,
  },
  subTitle: {
    fontSize: 16,
    color: '#FACC15',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
    elevation: 2,
    shadowColor: '#000',
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
  },
});
