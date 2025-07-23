import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather, FontAwesome } from "@expo/vector-icons";

import HomePage from "./Home/pageHome";
import SavePage from "./Save/pageSave";
import AccountPage from "./Account/pageAccount";
import AboutPage from "./AboutApp/pageAboutApp";
import ActivityPage from "./Activity/PageActivity";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") {
            return <Ionicons name="home" size={size} color={color} />;
          } else if (route.name === "Save") {
            return <Feather name="bookmark" size={size} color={color} />;
          } else if (route.name === "Account") {
            return <FontAwesome name="user" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "#2F5C9A",    // dipencet warna berubah biru
        tabBarInactiveTintColor: "gray",       // tidak dipencet warna abu abu
        headerShown: false,
      })}
    >
      <Tab.Screen name="Save" component={SavePage} />
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Account" component={AccountPage} />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      {/* Tentang Aplikasi */}
      <Stack.Screen
        name="About"
        component={AboutPage}
        options={{
          title: "Tentang Aplikasi",
          headerStyle: {
            backgroundColor: "#2F5C9A",
             // Warna biru untuk header
          },
          headerTintColor: "#fff", // Warna putih untuk teks dan ikon back
          headerTitleStyle: {
            marginRight: 12,
            fontSize: 18,
            fontWeight: "bold", // (Opsional) Membuat judul tebal
          },
        }}
      />
      {/* Halaman Aktivitas */}
      <Stack.Screen
        name="Activity"
        component={ActivityPage}
        options={{
          title: "Aktivitas",
          headerStyle: {
            backgroundColor: "#2F5C9A",
             // Warna biru untuk header
          },
          headerTintColor: "#fff", // Warna putih untuk teks dan ikon back
          headerTitleStyle: {
            marginRight: 12,
            fontSize: 18,
            fontWeight: "bold", // (Opsional) Membuat judul tebal
          },
        }}
        />
    </Stack.Navigator>
  );
}
