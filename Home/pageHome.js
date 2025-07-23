import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SaveContext } from "../Context/SaveContext";

export default function HomePage() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // untuk tombol save
  const { toggleSave, isNewsSaved } = useContext(SaveContext);
  // untuk tombol like
  const [likedItems, setLikedItems] = useState([]);

  // fungsi toggle
  const toggleLike = (item) => {
    const isLiked = likedItems.includes(item);
    if (isLiked) {
      setLikedItems(likedItems.filter((i) => i !== item));
    } else {
      setLikedItems([...likedItems, item]);
    }
  };

  const isLiked = (item) => likedItems.includes(item);

  return (
    <ScrollView>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Radar</Text>
          <Text style={styles.headerTitle}>Tulungagung</Text>
        </View>
        <Image source={require("../assets/avatar.png")} style={styles.avatar} />
      </View>

      <View style={styles.container}>
        {/* Hubungi dan EPAPER */}
        <View style={styles.contactBox}>
          <View style={styles.contactContent}>
            {/* Kiri: Judul dan EPAPER */}
            <View style={styles.leftBox}>
              <Text style={styles.contactTitle}>Hubungi Kami</Text>
              <TouchableOpacity style={styles.epaperButtonOutline}>
                <Text style={styles.epaperButtonTextOutline}>EPAPER</Text>
              </TouchableOpacity>
            </View>

            {/* Garis vertikal */}
            <View style={styles.verticalLine} />

            {/* Kanan: Info Kontak */}
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

        {/* Filter Tanggal */}
        <View style={styles.filterRow}>
          <Ionicons name="calendar-outline" size={20} color="#2F5C9A" />
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ color: "gray" }}>
              {date ? formatDate(date) : "Pilih tanggal"}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChange}
            />
          )}
        </View>

        {/* Berita Utama */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Berita Utama</Text>
          <TouchableOpacity>
            <Text style={styles.moreButton}>Lainnya</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardScroll}
        >
          {utamaData.map((item, index) => (
            <View key={index} style={styles.card}>
              <TouchableOpacity>
                <Image source={item.image} style={styles.coverImage} />
              </TouchableOpacity>
              <View style={styles.cardFooter}>
                <View style={styles.iconRow}>
                  <Ionicons name="calendar-outline" size={14} color="#2F5C9A" />
                  <Text style={styles.date}>{item.date}</Text>
                </View>
                <View style={styles.iconRow}>
                  <TouchableOpacity onPress={() => toggleLike(item)}>
                    <AntDesign
                      name={isLiked(item) ? "heart" : "hearto"}
                      size={16}
                      color={isLiked(item) ? "red" : "gray"}
                      style={styles.iconMargin}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleSave(item)}>
                    <Ionicons
                      name={isNewsSaved(item) ? "bookmark" : "bookmark-outline"}
                      size={16}
                      color={isNewsSaved(item) ? "#2F5C9A" : "gray"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Berita Terkini */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Berita Terkini</Text>
          <TouchableOpacity>
            <Text style={styles.moreButton}>Lainnya</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardScroll}
        >
          {terkiniData.map((item, index) => (
            <View key={index} style={styles.card}>
              <TouchableOpacity>
                <Image source={item.image} style={styles.coverImage} />
              </TouchableOpacity>
              <View style={styles.cardFooter}>
                <View style={styles.iconRow}>
                  <Ionicons name="calendar-outline" size={14} color="#2F5C9A" />
                  <Text style={styles.date}>{item.date}</Text>
                </View>
                <View style={styles.iconRow}>
                  <TouchableOpacity onPress={() => toggleLike(item)}>
                    <AntDesign
                      name={isLiked(item) ? "heart" : "hearto"}
                      size={16}
                      color={isLiked(item) ? "red" : "gray"}
                      style={styles.iconMargin}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleSave(item)}>
                    <Ionicons
                      name={isNewsSaved(item) ? "bookmark" : "bookmark-outline"}
                      size={16}
                      color={isNewsSaved(item) ? "#2F5C9A" : "gray"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const utamaData = [
  {
    image: require("../assets/cover 1.png"),
    date: "14 Juli 2025",
  },
  {
    image: require("../assets/cover 2.png"),
    date: "30 Juni 2025",
  },
  {
    image: require("../assets/cover 3.png"),
    date: "08 Juli 2025",
  },
  {
    image: require("../assets/cover 4.png"),
    date: "09 Juli 2025",
  },
];

const terkiniData = [
  {
    image: require("../assets/cover 3.png"),
    date: "14 Juli 2025",
  },
  {
    image: require("../assets/cover 4.png"),
    date: "13 Juli 2025",
  },
  {
    image: require("../assets/cover 1.png"),
    date: "11 Juli 2025",
  },
  {
    image: require("../assets/cover 5.png"),
    date: "10 Juli 2025",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
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
  leftBox: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
  rightBox: {
    flex: 1,
    alignItems: "center",
    gap: 10,
  },
  verticalLine: {
    width: 1,
    height: 80,
    backgroundColor: "#ccc",
    marginHorizontal: 12,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
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
  contactText: {
    fontSize: 14,
    color: "#333",
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dateInput: {
    marginLeft: 12,
    flex: 1,
    fontSize: 14,
    color: "#2F5C9A",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  moreButton: {
    fontSize: 14,
    color: "#2F5C9A",
    fontWeight: "500",
  },
  cardScroll: {
    flexDirection: "row",
    marginBottom: 10,
  },
  card: {
    width: 160,
    marginRight: 12,
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
    overflow: "hidden",
  },
  coverImage: {
    width: "100%",
    height: 230,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingBottom: 12,
    paddingTop: 12,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    marginLeft: 6,
    color: "gray",
    fontWeight: "bold",
  },
  iconMargin: {
    marginRight: 8,
    marginLeft: 8,
  },
});
