// src/Account/Pageakun.js
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Pageakun = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchUserProfile = async () => {
        try {
          const token = await AsyncStorage.getItem("token");
          console.log("Token didapatkan:", token);

          if (!token) {
            console.warn("Token tidak ditemukan.");
            navigation.replace("Login");
            return;
          }

          const response = await fetch(
            "http://192.168.1.93:3000/RadarApps/api/v1/profile",
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
          } else {
            console.error("Gagal mengambil profil:", result.message);
          }
        } catch (error) {
          console.error("Error saat mengambil profil:", error);
        }
      };

      fetchUserProfile();
    }, [navigation])
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Akun</Text>
      </View>

      {/* Isi */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Box */}
        <View style={styles.profileBox}>
          {user?.image ? (
            <Image
              source={{ uri: `http://192.168.1.93:3000/user/${user.image}` }}
              style={styles.avatar}
            />
          ) : (
            <Ionicons name="person-circle-outline" size={50} color="#555" />
          )}
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.profileName}>
              {user ? user.username : "Memuat..."}
            </Text>
            <Text style={styles.profileEmail}>{user ? user.email : "-"}</Text>
          </View>
        </View>

        {/* Menu List */}
        <View style={styles.menuContainer}>
          <MenuItem
            icon={<MaterialIcons name="edit" size={20} color="#fff" />}
            label="Kelola Akun"
            sub="Ubah nama, foto dan informasi"
            onPress={() => navigation.navigate("KelolaAkun")}
          />
          <MenuItem
            icon={<Ionicons name="lock-closed" size={20} color="#fff" />}
            label="Keamanan"
            sub="Informasi password"
            onPress={() => navigation.navigate("keamanan")}
          />
          <MenuItem
            icon={<FontAwesome name="history" size={20} color="#fff" />}
            label="Aktivitas"
            sub="Riwayat membaca dan komentar"
            onPress={() => navigation.navigate("Activity")}
          />
          <MenuItem
            icon={<Entypo name="info-with-circle" size={20} color="#fff" />}
            label="Tentang Aplikasi"
            sub="Informasi aplikasi"
            onPress={() => navigation.navigate("About")}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons
            name="exit-outline"
            size={20}
            color="#fff"
            style={{ marginRight: 5 }}
          />
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal Logout */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Ionicons name="exit-outline" size={40} color="#ED4949" />
            <Text style={styles.modalTitle}>Keluar dari akun</Text>
            <Text style={styles.modalMessage}>
              Apakah anda yakin ingin keluar?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress= {async () => {
                  try {
                    console.log("mulai proses logout")
                    const token = await AsyncStorage.getItem("token"); //mengambil token
                     console.log("Token ditemukan:", token);
                    if(!token) {
                      Alert.alert("Gagal Logout", "Token tidak ditemukan."); 
                      console.warn("Token tidak tersedia, membatalkan logout.");
                      // menampilkan pesan jk token tdk ada
                      return; // menghentikan eksekusi
                    }

                    const response = await fetch ("http://192.168.1.93:3000/RadarApps/api/v1/logout", {
                      method: "POST", // mengirim request logout ke server dengan metode post dilihat di postman
                      headers: {
                        Authorization: `Bearer ${token}`, //menyisipkan token ke header authorization
                      },
                    });

                    const result = await response.json(); //mengubah ke json
                      console.log("Respon dari server logout:", result);

                    if (response.ok) {
                      // hapus token
                      await AsyncStorage.removeItem("token"); //menghapus token
                      console.log("Token berhasil dihapus dari AsyncStorage.");
                      navigation.replace("Login"); // jika berhasil logout kembali ke halaman login
                    } else {
                      console.warn("Logout gagal:", result.message);
                      Alert.alert("Gagal Logout", result.message || "Terjadi kesalahan."); //pesan kesalahan 
                    }
                  } catch (error) {
                    console.error("Logout Error:", error); //pesan error di log jika terjadi error proses fetch
                    Alert.alert("Gagal Logout", "Terjadi keslaahan."); // menampilkan alert jk terjadi kesalahan 
                  }
                }}
              >
                <Text style={styles.confirmText}>Ya, Yakin</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Komponen MenuItem
const MenuItem = ({ icon, label, sub, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIcon}>{icon}</View>
    <View style={{ flex: 1 }}>
      <Text style={styles.menuLabel}>{label}</Text>
      <Text style={styles.menuSub}>{sub}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#999" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#1E4B8A",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
  },
  content: { padding: 20 },
  profileBox: {
    backgroundColor: "#fff",
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#eee",
  },
  profileName: { fontSize: 16, fontWeight: "bold" },
  profileEmail: { fontSize: 13, color: "#666" },
  menuContainer: { marginBottom: 30 },
  menuItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  menuIcon: {
    backgroundColor: "#1E4B8A",
    padding: 10,
    borderRadius: 25,
    marginRight: 12,
  },
  menuLabel: { fontSize: 15, fontWeight: "bold", color: "#000" },
  menuSub: { fontSize: 12, color: "#555" },
  logoutButton: {
    backgroundColor: "#ED4949",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
  },
  logoutText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000088",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#ED4949",
  },
  modalMessage: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    marginVertical: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#ddd",
    marginRight: 10,
    alignItems: "center",
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#ED4949",
    alignItems: "center",
  },
  cancelText: { color: "#333", fontWeight: "bold" },
  confirmText: { color: "#fff", fontWeight: "bold" },
});

export default Pageakun;
