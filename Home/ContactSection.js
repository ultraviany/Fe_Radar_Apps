import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ContactCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hubungi Kami</Text>
      <View style={styles.line} />

      <View style={styles.contactRow}>
        <Text style={styles.label}>Radar Tulungagung</Text>
        <View style={styles.phoneRow}>
          <Ionicons name="call" size={16} color="#1E4B8A" />
          <Text style={styles.phoneText}>082330169800</Text>
        </View>
      </View>

      <View style={styles.contactRow}>
        <Text style={styles.label}>Radar Blitar</Text>
        <View style={styles.phoneRow}>
          <Ionicons name="call" size={16} color="#1E4B8A" />
          <Text style={styles.phoneText}>085649622951</Text>
        </View>
      </View>

      <View style={styles.contactRow}>
        <Text style={styles.label}>Radar Trenggalek</Text>
        <View style={styles.phoneRow}>
          <Ionicons name="call" size={16} color="#1E4B8A" />
          <Text style={styles.phoneText}>081330740334</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 11,
    marginTop: -30,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 4,
  },
  line: {
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom:1,
    
    color: "#1E4B8A",
  },
  phoneRow: {
    flexDirection: "row",
    marginRight:15,
    alignItems: "center",
  },
  phoneText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8, // atur jarak antara icon dan nomor
  },
});
