import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function SignUpWithEmail() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (fullName && email && password) {
      Alert.alert("Berhasil", "User sudah berhasil daftar!");
    } else {
      Alert.alert("Gagal", "Semua field harus diisi.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Tombol kembali */}
      <TouchableOpacity style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="#1E3A8A" />
      </TouchableOpacity>

      <View style={styles.innerContainer}>
        {/* Judul */}
        <Text style={styles.title}>Daftar dengan Email</Text>
        <Text style={styles.subtitle}>
          Buat akun baru untuk mulai mengikuti berita{"\n"}Radar Tulungagung.
        </Text>

        {/* Form Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nama Lengkap</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Masukkan nama lengkap Anda"
            placeholderTextColor="#999"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Masukkan@email.com"
            keyboardType="email-address"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Kata Sandi</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Buat kata sandi yang kuat"
            secureTextEntry
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Tombol Daftar */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Daftar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 20,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  inputBox: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 14,
    color: "#000",

    // Shadow iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Elevation Android
    elevation: 4,
  },
  button: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,

    // Shadow tombol
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
