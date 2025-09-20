import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

const BASE_URL = "http://192.168.1.6:3000";

export default function PageLogin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleLogin = async () => {
    console.log("🚀 Tombol login ditekan");

    if (!username || !email || !password) {
      Alert.alert("Input tidak lengkap", "Isi semua field terlebih dahulu!");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/RadarApps/api/v1/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await response.json();
      console.log("📦 Hasil login:", result.data);

      if (!response.ok) {
        console.error("❌ Server Error:", result);
        Alert.alert(
          "Login gagal",
          result.message || "Terjadi kesalahan dari server"
        );
        return;
      }

      const token = result?.data?.token;
      const role = result?.data?.role;
      const userId = result?.data?._id || result?.data?.id;
      const userName = result?.data?.name;

      if (userId && userId.length === 24) {
        await AsyncStorage.setItem("userId", userId);
      } else {
        console.warn("⚠️ UserId tidak valid:", userId);
      }

      if (!token) {
        Alert.alert("Login gagal", "Token tidak ditemukan dalam respons");
        return;
      }

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("userId", userId);
      if (userName) {
        await AsyncStorage.setItem("userName", userName);
      }
      Alert.alert("Login Berhasil");

      // Navigasi berdasarkan peran
      if (role === "ADMIN") {
        navigation.replace("PageCRUD");
      } else {
        navigation.replace("MainTabs", { screen: "Home" }); // Tab Home
      }
    } catch (error) {
      console.error("❌ Error saat login:", error.message || error);
      Alert.alert("Login gagal", "Tidak dapat terhubung ke server");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Image source={require("../assets/image22.png")} style={styles.logo} />
        <Text style={styles.headerText}>Login yuk!</Text>
        <Text style={styles.subText}>
          Biar nggak ketinggalan berita Tulungagung.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Masukkan username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Masukkan email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Masukkan kata sandi"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          >
            <Ionicons
              name={secureTextEntry ? "eye-off" : "eye"}
              size={22}
              color="#666"
              style={{ padding: 5 }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
          <Text style={styles.forgotPassword}>Lupa kata sandi?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Belum punya akun?{" "}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate("SignUp")}
          >
            Daftar Sekarang
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  subText: {
    color: "#444",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 14,
    color: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
    color: "#1E4B8A",
  },
  loginButton: {
    backgroundColor: "#1E4B8A",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 20,
    width: "100%",
  },
  loginButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  signupText: {
    color: "#333",
  },
  signupLink: {
    color: "#1E3A8A",
    fontWeight: "bold",
  },
  passwordContainer: {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 16,
  paddingHorizontal: 10,
  marginBottom: 15,
  backgroundColor: "#fff",
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

});
