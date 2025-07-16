import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/image 22.png')} style={styles.logo} />

      <Text style={styles.title}>Daftar Sekarang!</Text>
      <Text style={styles.subtitle}>Biar kamu selalu update kabar Tulungagung.</Text>

      {/* Tombol Daftar dengan Email */}
      <TouchableOpacity style={styles.emailButton}>
        <AntDesign name="mail" size={24} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.emailButtonText}>Daftar dengan Email</Text>
      </TouchableOpacity>

      {/* Garis dan teks "atau" */}
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.orText}>atau</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Tombol Daftar dengan Google */}
      <TouchableOpacity style={styles.googleButton}>
        <FontAwesome name="google" size={20} color="#000" style={{ marginRight: 10 }} />
        <Text style={styles.googleButtonText}>Daftar dengan Google</Text>
      </TouchableOpacity>

      {/* Teks login */}
      <Text style={styles.loginText}>
        Sudah punya akun? <Text style={styles.loginLink}>Masuk</Text>
      </Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2F5C9A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 8, // jarak ke "atau"
    elevation: 2,
  },
  emailButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,       // agar tidak terlalu jauh ke bawah
    marginBottom: 15,   // jarak ke tombol Google
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#999',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  googleButtonText: {
    fontSize: 16,
    color: '#000',
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    color: '#2F5C9A',
    fontWeight: 'bold',
  },
});
