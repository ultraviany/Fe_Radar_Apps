import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../config";

export default function SignUpWithEmail({ navigation }) {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleSubmit = async () => {
    console.log("🚀 Tombol Register ditekan");

    const usernameRegex = /^[a-z0-9._-]{5,100}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username || !email || !password) {
      Alert.alert("Gagal", "Semua field harus diisi.");
      return;
    }

    if (!usernameRegex.test(username)) {
      Alert.alert(
        "Gagal",
        "Username minimal 5 karakter dan hanya boleh huruf kecil, angka, titik, minus, atau underscore."
      );
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert("Gagal", "Format email tidak valid.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Gagal", "Password minimal 8 karakter");
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/RadarApps/api/v1/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("Server Error:", result);
        Alert.alert(
          "Register gagal",
          result.message || "Terjadi kesalahan dari server"
        );
        return;
      }

      Alert.alert("Berhasil", "User sudah berhasil daftar!", [
        {
          text: "OK",
          onPress: () => navigation.replace("Login"),
        },
      ]);
    } catch (error) {
      console.error(" Error saat register:", error.message || error);
      Alert.alert("Register gagal", "Tidak dapat terhubung ke server");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#1E3A8A" />
      </TouchableOpacity>

      <View style={styles.innerContainer}>
        <Text style={styles.title}>Daftar dengan Email</Text>
        <Text style={styles.subtitle}>
          Buat akun baru untuk mulai mengikuti berita{"\n"}Radar Tulungagung.
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Buat Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUserName}
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
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Buat kata sandi yang kuat"
              secureTextEntry={secureTextEntry}
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            >
              <Ionicons
                name={secureTextEntry ? "eye-off" : "eye"}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Daftar</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: "#000",
  },
  button: {
    backgroundColor: "#1E4B8A",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
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
