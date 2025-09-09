import React, { useEffect, useRef } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // transparan awal
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // kecil dulu

  useEffect(() => {
    // Jalankan animasi logo
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();

    // Cek login setelah delay
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        setTimeout(() => {
          if (token) {
            navigation.replace("MainTabs", { screen: "Home" });
          } else {
            navigation.replace("Login");
          }
        }, 2500);
      } catch (err) {
        console.log("❌ Error cek token:", err);
        navigation.replace("Login");
      }
    };

    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/splash-epaper.png")}
        style={[
          styles.logo,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E4B8A",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 260,
    height: 260,
    resizeMode: "contain",
  },
});
