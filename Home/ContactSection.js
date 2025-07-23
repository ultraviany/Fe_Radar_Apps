import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default function ContactCard() {
  return (
    <View style={styles.contactBox}>
      <View style={styles.contactContent}>
        <View style={styles.leftBox}>
          <Text style={styles.contactTitle}>Hubungi Kami</Text>
          <View style={styles.epaperButtonOutline}>
            <Text style={styles.epaperButtonTextOutline}>EPAPER</Text>
          </View>
        </View>
        <View style={styles.verticalLine} />
        <View style={styles.rightBox}>
          <View style={styles.contactRow}>
            <Ionicons name="call" size={18} color="black" />
            <Text style={styles.contactText}>082330168000</Text>
          </View>
          <View style={styles.contactRow}>
            <FontAwesome name="instagram" size={18} color="black" />
            <Text style={styles.contactText}>@radartulungagung</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contactBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginTop: -30,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  contactContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftBox: { flex: 1, alignItems: "center", gap: 10 },
  rightBox: { flex: 1, alignItems: "center", gap: 10 },
  verticalLine: {
    width: 1,
    height: 80,
    backgroundColor: "#ccc",
    marginHorizontal: 12,
  },
  contactTitle: { fontSize: 16, fontWeight: "bold", color: "black" },
  epaperButtonOutline: {
    borderWidth: 2,
    borderColor: "#2F5C9A",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  epaperButtonTextOutline: {
    color: "#2F5C9A",
    fontWeight: "bold",
    fontSize: 12,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 6,
  },
  contactText: { fontSize: 14, color: "#333" },
});
