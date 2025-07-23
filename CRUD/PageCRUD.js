import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function PageCRUD() {
  const navigation = useNavigation();

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

      {/* BUTTONS */}
      <View style={styles.buttonContainer}>
        <MenuButton
          icon="add"
          title="Tambahkan Epaper"
          subtitle="Upload epaper baru"
          onPress={() => navigation.navigate('PageCreate')}
        />
        <MenuButton
          icon="document-text-outline"
          title="Lihat Koleksi Epaper"
          subtitle="Jelajahi epaper"
          onPress={() => navigation.navigate('PageRead')}
        />
        <MenuButton
          icon="create-outline"
          title="Update Epaper"
          subtitle="Edit epaper yang tersedia"
          onPress={() => navigation.navigate('HomeUpdate')}
        />
        <MenuButton
          icon="trash-outline"
          title="Hapus Epaper"
          subtitle="Hapus epaper"
          onPress={() => navigation.navigate('PageDelete')}
        />
      </View>
    </View>
  );
}

function MenuButton({ icon, title, subtitle, onPress }) {
  return (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color="#1E3A8A" />
      </View>
      <View>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
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
  buttonContainer: {
    padding: 28,
    gap: 30,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E4B8A',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    elevation: 3,
    gap: 16,
  },
  iconContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#E5E7EB',
    marginTop: 2,
  },
});
