// Import React dan komponen navigasi
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";

// =========================
// IMPORT SEMUA HALAMAN
// =========================

// Halaman utama tab
import HomePage from "../Home/pageHome";
import SavePage from "../Save/pageSave";
import Pageakun from "../Akun/pageAkun";

// splashscreen
import SplashScreen from "../splashscreen/pageSplashScreen";

// Autentikasi
import PageLogin from "../Login/PageLogin";
import PageSignUp from "../SignUp/PageSignUp";
import SignUpWithEmail from "../SignUpwithEmail/pageSignUpwithEmail";
import ResetPassword from "../ResetPw/Risetpw";
import PageKonfrimOTP from "../KonfrimOTP/TempKonfrimOTP";
import PagePwOTP from "../ResetPw-OTP/PagePw-OTP";

// Fitur E-Paper dan Komentar
import PageEpaper from "../E-Paper/PageEpaper";
import PageComment from "../Comment/PageComment";

// Fitur CRUD
import PageCRUD from "../CRUD/PageCRUD";
import PageCreate from "../CRUD/Create/PageCreate";
import PageRead from "../CRUD/Read/PageRead";
import PageUpdate from "../CRUD/Update/PageUpdate";
import PageDelete from "../CRUD/Delete/PageDelete";
import HomeUpdate from "../CRUD/Update/HomeUpdate";

// Halaman Tambahan (Akun)
import AboutPage from "../AboutApp/pageAboutApp";
import ActivityPage from "../Activity/PageActivity";
import Keamananpage from "../Keamanan/pageKeamanan";
import GantiPassword from "../Keamananresetpw/Pageresetpw";
import KelolaAkun from "../Kelolaakun/kelolaAkun";

// =========================
// INISIALISASI NAVIGATOR
// =========================
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// =========================
// NAVIGATOR BOTTOM TAB
// (Save, Home, Account)
// =========================
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Icon dinamis untuk setiap tab
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home")
            return <Ionicons name="home" size={size} color={color} />;
          if (route.name === "Save")
            return <Feather name="bookmark" size={size} color={color} />;
          if (route.name === "Account")
            return <FontAwesome name="user" size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2F5C9A",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Save" component={SavePage} />
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Account" component={Pageakun} />
    </Tab.Navigator>
  );
}

// =========================
// NAVIGATOR UTAMA (STACK)
// =========================
export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        {/* Autentikasi */}
        <Stack.Screen name="Login" component={PageLogin} />
        <Stack.Screen name="SignUp" component={PageSignUp} />
        <Stack.Screen name="SignUpWithEmail" component={SignUpWithEmail} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="PageKonfrimOTP" component={PageKonfrimOTP} />
        <Stack.Screen name="PagePw-OTP" component={PagePwOTP} />

        {/* Fitur utama */}
        <Stack.Screen name="PageEpaper" component={PageEpaper} />
        <Stack.Screen name="PageComment" component={PageComment} />
        <Stack.Screen name="HomePage" component={HomePage} />

        {/* CRUD */}
        <Stack.Screen name="PageCRUD" component={PageCRUD} />
        <Stack.Screen name="PageCreate" component={PageCreate} />
        <Stack.Screen name="PageRead" component={PageRead} />
        <Stack.Screen name="PageUpdate" component={PageUpdate} />
        <Stack.Screen name="PageDelete" component={PageDelete} />
        <Stack.Screen name="HomeUpdate" component={HomeUpdate} />

        {/* Navigasi Tab */}
        <Stack.Screen name="MainTabs" component={TabNavigator} />

        {/* Halaman Pengaturan Akun */}
        <Stack.Screen
          name="keamanan"
          component={Keamananpage}
          options={{
            headerShown: true,
            title: "Keamanan",
            headerStyle: { backgroundColor: "#1E4B8A" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Activity"
          component={ActivityPage}
          options={{
            headerShown: true,
            title: "Aktivitas",
            headerStyle: { backgroundColor: "#1E4B8A" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="GantiPassword"
          component={GantiPassword}
          options={{
            headerShown: true,
            title: "Ganti Password",
            headerStyle: { backgroundColor: "#1E4B8A" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="KelolaAkun"
          component={KelolaAkun}
          options={{
            headerShown: true,
            title: "Kelola Akun",
            headerStyle: { backgroundColor: "#1E4B8A" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="About"
          component={AboutPage}
          options={{
            headerShown: true,
            title: "Tentang Aplikasi",
            headerStyle: { backgroundColor: "#1E4B8A" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
