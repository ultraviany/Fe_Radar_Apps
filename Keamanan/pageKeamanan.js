import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Keamananpage = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.headerTitle}>Keamanan</Text>
      </View>

      {/* Gambar Gembok */}
      <View style={styles.lockContainer}>
        <Image
          source={require('../assets/forgotpassword.png')} // Ganti path gambar jika perlu
          style={styles.lockImage}
          resizeMode="contain"
        />
      </View>

      {/* Box Info Akun */}
      <View style={styles.accountBox}>
        <Ionicons name="person-circle-outline" size={80} color="#777" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.nameText}>Rizkuhuy</Text>
          <View style={styles.row}>
            <Ionicons name="mail" size={16} color="#555" />
            <Text style={styles.detailText}> iskuhuhuydev@email.com</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="lock-closed" size={16} color="#555" />
            <Text style={styles.detailText}> ••••••</Text>
          </View>
        </View>
      </View>

      {/* Lupa Kata Sandi */}
      <Text style={styles.forgotTitle}>Lupa Kata Sandi?</Text>
      <Text style={styles.forgotDesc}>
        Link untuk mengatur ulang kata sandi akan{'\n'}dikirimkan pada gmail anda.
      </Text>

      {/* Tombol */}
      <TouchableOpacity style={styles.resetButton}>
        <Text style={styles.resetButtonText}>Kirim Link Reset</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#1E4B8A',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  lockContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  lockImage: {
    width: 120,
    height: 120,
  },
  accountBox: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: '#fff',
    borderColor: '#1E4B8A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
  },
  detailText: {
    fontSize: 13,
    color: '#444',
  },
  forgotTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 32,
  },
  forgotDesc: {
    textAlign: 'center',
    color: '#555',
    fontSize: 12,
    marginTop: 6,
  },
  resetButton: {
    backgroundColor: '#1E4B8A',
    paddingVertical: 14,
    marginHorizontal: 40,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Keamananpage;
