import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PageKonfrimOTP({ navigation }) {
  const [otp, setOtp] = useState("");
  const inputRef = useRef();

  const handleOtpChange = (value) => {
    const sanitized = value.replace(/[^0-9]/g, "");
    setOtp(sanitized.slice(0, 6));
  };

  const handleConfirmOTP = async () => {
    if (otp.length < 6) {
      Alert.alert("Error", "Kode OTP harus 6 digit");
      return;
    }

    try {
      console.log("Kirim konfirmasi otp:", { otp });

      const response = await fetch(
        "http://192.168.1.93:3000/RadarApps/api/v1/otp/confirm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp }), // hanya OTP dikirim
        }
      );

      const resultText = await response.text();
      try {
        const result = JSON.parse(resultText);
        console.log("Respon be:", result);

        if (response.ok) {
          const resetToken = result.data.token;
          const resetId = result.data.id;
          await AsyncStorage.setItem("reset_token", resetToken);
          await AsyncStorage.setItem ("reset_id", resetId)
          Alert.alert("Berhasil", "OTP berhasil dikonfirmasi.");
          navigation.navigate("PagePw-OTP");
        } else {
          Alert.alert("Gagal", result.message || "Gagal Konfirmasi OTP.");
        }
      } catch (jsonError) {
        console.error("Gagal parsing JSON:", resultText);
        Alert.alert("Error", "Response bukan JSON.");
      }
    } catch (error) {
      console.error("Error konfirmasi OTP:", error);
      Alert.alert("Error", "Terjadi kesalahan saat konfirmasi OTP.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Masukkan kode OTP</Text>
          <Text style={styles.subtitle}>
            Kami telah mengirimkan kode verifikasi.
          </Text>
          <Text style={styles.instruction}>Silahkan cek email Anda.</Text>

          <View style={styles.otpSection}>
            <View style={styles.otpContainer}>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <View key={index} style={styles.otpBox}>
                    <Text style={styles.otpDigit}>{otp[index] || ""}</Text>
                  </View>
                ))}
            </View>

            <TextInput
              ref={inputRef}
              style={styles.visibleInput}
              keyboardType="numeric"
              maxLength={6}
              value={otp}
              onChangeText={handleOtpChange}
              autoFocus
              caretHidden={true}
              selectionColor="transparent"
            />
          </View>

          <Text style={styles.resendText}>
            Tidak menerima kode?{" "}
            <Text style={styles.resendLink}>Kirim ulang kode</Text>
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleConfirmOTP}>
            <Text style={styles.buttonText}>Konfirmasi Kode OTP</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 4,
  },
  instruction: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  otpSection: {
    position: "relative",
    marginBottom: 24,
    width: "100%",
    alignItems: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  otpBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    width: 50,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  otpDigit: {
    fontSize: 22,
    fontWeight: "bold",
  },
  visibleInput: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 330,
    height: 60,
    opacity: 0.02,
    zIndex: 10,
  },
  resendText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  resendLink: {
    color: "#003087",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#1E4B8A",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
