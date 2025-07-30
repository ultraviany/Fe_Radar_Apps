import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';

export default function PageSignUp({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/image22.png')} style={styles.logo} />
      <Text style={styles.title}>Daftar Sekarang!</Text>
      <Text style={styles.subtitle}>Biar kamu selalu update kabar Tulungagung.</Text>

      <TouchableOpacity
        style={styles.emailButton}
        onPress={() => navigation.navigate('SignUpWithEmail')}
      >
        <AntDesign name="mail" size={24} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.emailButtonText}>Daftar dengan Email</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Sudah punya akun?{' '}
        <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
          Masuk
        </Text>
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
    marginBottom: 20,
    elevation: 2,
  },
  emailButtonText: {
    color: '#fff',
    fontSize: 16,
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
