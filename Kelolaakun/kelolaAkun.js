import React, { useState, useCallback, } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const BASE_URL = "http://192.168.1.6:3000";

const KelolaAkun = () => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        try {
          const token = await AsyncStorage.getItem("token");
          if (!token) return Alert.alert("Error", "Token tidak ditemukan");

          const res = await fetch(
            `${BASE_URL}/RadarApps/api/v1/profile`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const json = await res.json();
          if (json.success) {
            setUserId(json.data.id);
            setUsername(json.data.username);
            setEmail(json.data.email);
            setProfileImage(
              json.data.image
                ? `${BASE_URL}/user/${encodeURIComponent(json.data.image)}`
                : null
            );
          } else {
            Alert.alert("Gagal", "Gagal mendapat data user.");
          }
        } catch (error) {
          Alert.alert("Error", "Terjadi kesalahan saat memuat profil.");
          console.error(error);
        }
      };

      fetchProfile();
    }, [])
  );

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Izin Ditolak",
        "Aplikasi membutuhkan izin untuk mengakses galeri."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSaveChanges = async () => {
    console.log(" Tombol Save ditekan");

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "Token tidak ditemukan");
        return;
      }

      const formData = new FormData();
      formData.append("id", userId);
      formData.append("username", username);
      formData.append("email", email);

      if (profileImage && !profileImage.startsWith("http")) {
        const fileName = profileImage.split("/").pop();
        const fileType = fileName.split(".").pop();
        formData.append("image", {
          uri: profileImage,
          name: fileName,
          type: `image/${fileType}`,
        });
      }

      const res = await fetch(
        `${BASE_URL}/RadarApps/api/v1/updateUser`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const json = await res.json();
      console.log("Gambar URL:", `${BASE_URL}/user/${encodeURIComponent(json.data.image)}`);
      console.log("Image from API:", json.data.image);
      console.log("Respon updateUser:", json);

      if (json.success) {
        Alert.alert("Berhasil", "Data berhasil diperbarui", [
          {
            text: "OK",
            onPress: () => navigation.goBack(), // bisa juga diganti ke .navigate('Akun')
          },
        ]);
      } else {
        Alert.alert("Gagal", json.message || "Gagal memperbarui data");
      }
    } catch (error) {
      Alert.alert("Error", "Terjadi kesalahan saat menyimpan perubahan.");
      console.error(error);
    }
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={{ width: 130, height: 130, borderRadius: 70 }}
              />
            ) : (
              <Icon name="person" size={60} color="#aaa" />
            )}
            <View style={styles.cameraIcon}>
              <Icon name="camera" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={styles.uploadText}>
            Ketuk ikon kamera untuk mengunggah foto profil
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />

          <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
            <Text style={styles.buttonText}>Simpan Perubahan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { alignItems: "center", paddingHorizontal: 24, paddingTop: 80, },
  avatarContainer: { alignItems: "center", marginBottom: 24 },
  avatarWrapper: {
    backgroundColor: "#eee",
    borderRadius: 70,
    width: 130,
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#1E4B8A",
    borderRadius: 13,
    padding: 4,
  },
  uploadText: {
    marginTop: 13,
    fontSize: 13,
    color: "#666",
    textAlign: "center",
  },
  form: { width: "100%" },
  label: { fontSize: 14, marginBottom: 6, color: "#333", fontWeight: "bold", },
  input: {
    backgroundColor: "#f2f2f2ff",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
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
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default KelolaAkun;
