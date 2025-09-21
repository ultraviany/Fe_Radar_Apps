import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BASE_URL from '../config';

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSendOTP = async () => {
    console.log("🚀 Tombol kirim kode OTP ditekan");

    if (!email) {
      console.warn("⚠️ Field email masih kosong");
      Alert.alert("Input tidak lengkap", "Isi semua field terlebih dahulu!");
      return;
    }

    console.log("📨 Akan kirim request ke server dengan email:", email);

    try {
      const response = await fetch(`${BASE_URL}/RadarApps/api/v1/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      console.log("🔄 Response status:", response.status);

      const result = await response.json();
      console.log("📦 Response JSON:", result);

      if (!response.ok) {
        console.error("❌ Server Error:", result);
        Alert.alert("Gagal mengirim OTP", result.message || "Terjadi kesalahan");
        return;
      }

      console.log("✅ OTP berhasil dikirim ke:", email);
      Alert.alert("Sukses", "Kode OTP berhasil dikirim ke email kamu");
      navigation.navigate('PageKonfrimOTP');

    } catch (error) {
      console.error("❌ Error jaringan:", error.message || error);
      Alert.alert("Gagal", "Tidak dapat terhubung ke server");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#1E4B8A" />
      </TouchableOpacity>

      <Image
        source={require('../assets/resetpw.png')}
        style={styles.image}
      />

      <Text style={styles.title}>Lupa Kata Sandi?</Text>
      <Text style={styles.description}>
        Masukkan email dan kami akan mengirimkan link untuk mengatur ulang kata sandi.
      </Text>

      <Text style={styles.label}>Alamat Email</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={12} color="#233F8D" />
        <TextInput
          style={styles.input}
          placeholder="masukkan@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
        <Text style={styles.buttonText}>Kirim Kode OTP</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Ingat sandi kamu?{' '}
        <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
          Masuk di sini
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 24,
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E4B8A',
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 1,
  },
  input: {
    flex: 1,
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#1E4B8A',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  loginLink: {
    color: '#1E4B8A',
    fontWeight: 'bold',
  },
});

export default ResetPassword;
