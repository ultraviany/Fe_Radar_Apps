import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../config";

const Keamananpage = ({ navigation }) => {
  const [user, setUser] = useState(null);

  // info username
  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        try {
          const token = await AsyncStorage.getItem("token");

          if (!token) {
            console.warn("Token tidak ditemukan.");
            return;
          }

          const response = await fetch(
            `${BASE_URL}/RadarApps/api/v1/profile`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const result = await response.json();

          if (response.ok) {
            setUser(result.data);
            console.log("user.image:", result.data.image);
          } else {
            console.error("Gagal mengambil profil:", result.message);
          }
        } catch (error) {
          console.error("Error saat mengambil profile:", error);
        }
      };

      fetchUser();
    }, [])
  );

  // untuk request OTP
  const handleSendOtp = async () => {
  try {
    console.log("🔍 Mulai kirim OTP...");

    if (!user?.username || !user?.email) {
      console.log("❌ Email atau username tidak ditemukan:", user);
      Alert.alert("Error", "Data email atau username tidak ditemukan.");
      return;
    }

    console.log("📤 Mengirim request ke backend dengan data:", {
      username: user.username,
      email: user.email,
    });

    const response = await fetch(
      `${BASE_URL}/RadarApps/api/v1/otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
        }),
      }
    );

    const result = await response.json();

    console.log("📥 Response dari server:", result);

    if (response.ok) {
      console.log("✅ OTP berhasil dikirim.");
      Alert.alert("Berhasil", "Kode OTP telah dikirim ke email Anda.");
      navigation.navigate("PageKonfrimOTP");
    } else {
      console.log("❗ Gagal kirim OTP:", result.message);
      Alert.alert(
        "Gagal",
        result.message || "Terjadi kesalahan saat mengirim OTP."
      );
    }
  } catch (error) {
    console.error("🔥 Error saat request OTP:", error);
    Alert.alert("Error", "Tidak dapat mengirim OTP. Periksa koneksi Anda.");
  }
};


  return (
    <View style={styles.container}>
      {/* 🔒 Gambar Gembok */}
      <View style={styles.lockContainer}>
        <Image
          source={require("../assets/forgotpassword.png")}
          style={styles.lockImage}
          resizeMode="contain"
        />
      </View>

      {/* 👤 Info Akun */}
      <View style={styles.accountBox}>
        {user?.image ? (
          <Image
            source={{ uri: `${BASE_URL}/user/${user.image}` }}
            style={styles.avatar}
          />
        ) : (
          <Ionicons name="person-circle-outline" size={68} color="#555" />
        )}
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.profileName}>
            {user ? user.username : "Memuat..."}
          </Text>
          <View style={styles.row}>
            <Ionicons name="mail-outline" size={20} color="#1E4B8A" />
            <Text style={styles.profileEmail}>{user ? user.email : "-"}</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="lock-closed-outline" size={20} color="#1E4B8A" />
            <Text style={styles.detailText}> ••••••••</Text>
          </View>
        </View>
      </View>

      {/* ❓ Teks Lupa Password */}
      <Text style={styles.forgotTitle}>Lupa Kata Sandi?</Text>
      <Text style={styles.forgotDesc}>
        Kode OTP untuk mengatur ulang kata sandi {"\n"} akan dikirimkan pada
        email anda.
      </Text>

      {/* 🔁 Tombol Navigasi ke GantiPassword */}
      <TouchableOpacity style={styles.resetButton} onPress={handleSendOtp}>
        <Text style={styles.resetButtonText}>Kirim Kode OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#1E4B8A",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 12,
  },
  lockContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  lockImage: {
    width: 120,
    height: 120,
  },
  accountBox: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: "#fff",
    borderColor: "#1E4B8A",
    borderWidth: 2,
    borderRadius: 14,
    padding: 18,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  profileName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "center",
  },
  profileEmail: {
    fontSize: 16,
    color: "#444",
    marginLeft: 6,
  },
  detailText: {
    fontSize: 16,
    color: "#444",
    marginLeft: 6,
  },
  forgotTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 32,
  },
  forgotDesc: {
    textAlign: "center",
    color: "#555",
    fontSize: 14,
    marginTop: 8,
  },
  resetButton: {
    backgroundColor: "#1E4B8A",
    paddingVertical: 14,
    marginHorizontal: 40,
    borderRadius: 10,
    marginTop: 24,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 30,
    backgroundColor: "#eee",
  },
});

export default Keamananpage;
