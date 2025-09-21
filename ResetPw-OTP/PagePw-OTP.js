import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../config";

export default function PagePwOTP({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secure1, setSecure1] = useState(true); // Untuk toggle visibilitas input password
  const [secure2, setSecure2] = useState(true); // Untuk toggle visibilitas input konfirmasi

  const handleSubmit = async () => {
    console.log("proses pengubahan kata sandi");

    // Validasi: semua kolom harus diisi
    if (!password || !confirmPassword) {
      Alert.alert("Peringatan", "Semua kolom harus diisi!");
      console.warn("Kolom kosong");
      return;
    }

    // Validasi: kata sandi harus cocok
    if (password !== confirmPassword) {
      Alert.alert("Kesalahan", "Kata sandi tidak cocok!");
      console.warn("Kata sandi tidak cocok");
      return;
    }

    try {
      const userId = await AsyncStorage.getItem("reset_id");
      // Ambil token ID user dari penyimpanan lokal
      const resetToken = await AsyncStorage.getItem("reset_token");
      console.log("Token ID pengguna yang ditemukan:", resetToken);
      console.log("User ID ditemukan:", userId);

      if (!resetToken || !userId) {
        Alert.alert(
          "Error",
          "Token atau id tidak ditemukan, silahkan verifikasi ulang OTP."
        );
        console.error("Token atau id tidak ditemukan di AsyncStorage");
        return;
      }

      // Kirim permintaan update password ke backend
      const response = await fetch(
        `${BASE_URL}/RadarApps/api/v1/updateUser`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resetToken}`,
          },
          body: JSON.stringify({
            password,
            id: userId, // Gunakan token sebagai ID user
          }),
        }
      );

      const resultText = await response.text();
      console.log("Respon dari server:", resultText);

      try {
        const result = JSON.parse(resultText);

        if (response.ok) {
          Alert.alert("Berhasil", "Kata sandi berhasil diperbarui", [
            {
              text: "OK",
              onPress: () => {
                console.log("Navigasi ke halaman Login dan hapus token");
                AsyncStorage.removeItem("reset_token");
                AsyncStorage.removeItem("reset_id"); // Hapus token setelah berhasil
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                });
              },
            },
          ]);
        } else {
          console.warn("Gagal memperbarui:", result.message);
          Alert.alert(
            "Gagal",
            result.message || "Gagal memperbarui kata sandi."
          );
        }
      } catch (jsonErr) {
        console.error("Gagal parsing JSON:", jsonErr, "Teks:", resultText);
        Alert.alert("Error", "Respon dari server tidak valid.");
      }
    } catch (error) {
      console.error("Terjadi error saat update:", error);
      Alert.alert("Error", "Terjadi kesalahan saat mengirim permintaan.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.fullScreen}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Buat Kata Sandi Baru</Text>
          <Text style={styles.subtitle}>
            Masukkan kata sandi yang aman untuk akun kamu.
          </Text>

          {/* Input kata sandi baru */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Masukkan kata sandi baru"
              secureTextEntry={secure1}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setSecure1(!secure1)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={secure1 ? "eye-off" : "eye"}
                size={20}
                color="#333"
              />
            </TouchableOpacity>
          </View>

          {/* Input konfirmasi kata sandi */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Ketik ulang kata sandi baru"
              secureTextEntry={secure2}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setSecure2(!secure2)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={secure2 ? "eye-off" : "eye"}
                size={20}
                color="#333"
              />
            </TouchableOpacity>
          </View>

          {/* Tombol submit */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Simpan Kata Sandi</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  container: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    marginBottom: 32,
    textAlign: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
  },
  eyeIcon: {
    paddingLeft: 8,
  },
  button: {
    backgroundColor: "#1E4B8A",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
