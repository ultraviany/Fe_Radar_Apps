import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerTitle}>Radar</Text>
        <Text style={styles.headerTitle}>Tulungagung</Text>
      </View>
      <Image source={require("../assets/avatar.png")} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2F5C9A",
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
  },
  avatar: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
