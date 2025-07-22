import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function AboutPage() {
  return (
    <ScrollView style={styles.container}>

      {/* ini untuk header tentang kamu 
      dicomment karena udah ada stack navigation */}
      {/* <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.headerText}>Tentang Aplikasi</Text>
      </View> */}
      
      <View style={styles.content}>
        <Image
          source={require("../assets/image22.png")} // ganti sesuai lokasi logo kamu
          style={styles.logo}
        />
        <Text style={styles.epaperText}>EPAPER</Text>
        <Text style={styles.brandText}>
          <Text style={{ color: "#F9A826", fontWeight: "bold" }}>RADAR</Text>
          <Text style={{ color: "#2f5c9A", fontWeight: "bold" }}>TULUNGAGUNG</Text>
        </Text>

        <Text style={styles.description}>
          Aplikasi ini memudahkan Anda untuk membaca koran Radar Tulungagung secara digital, langsung dari HP Anda.
        </Text>

        <View style={styles.featureBox}>
          <Text style={styles.sectionTitle}>Fitur Utama</Text>
          <View style={styles.featureItem}>
            <FontAwesome5 name="newspaper" size={18} color="black" />
            <Text style={styles.featureText}> Baca e-paper harian</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="forum" size={18} color="black" />
            <Text style={styles.featureText}> Suarakan pendapatmu lewat komentar</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="bookmark" size={18} color="black" />
            <Text style={styles.featureText}> Simpan berita favorit</Text>
          </View>
        </View>

        <View style={styles.featureBox}>
          <Text style={styles.sectionTitle}>Tim developer</Text>
          {/* Tambahkan nama tim di sini */}
        </View>

        <Text style={styles.releaseText}>Dirilis: 16 Juli 2070</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // header: {
  //   backgroundColor: "#2F5C9A",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   paddingTop: 50,
  //   paddingBottom: 16,
  //   paddingHorizontal: 20,
  // },
  // headerText: {
  //   color: "#fff",
  //   fontSize: 18,
  //   marginLeft: 10,
  //   fontWeight: "bold",
  // },
  content: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 12,
  },
  epaperText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2F5C9A",
  },
  brandText: {
    fontSize: 20,
    marginBottom: 20,
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 14,
    color: "#555",
    lineHeight: 20, // tambahkan ini untuk spasi antar baris
  },
  featureBox: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#2F5C9A",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#fefefe",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  featureText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 6,
  },
  releaseText: {
    fontSize: 12,
    color: "#999",
    marginTop: 10,
  },
});
