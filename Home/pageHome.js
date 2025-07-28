import React, { useState, useContext } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { SaveContext } from "../Context/SaveContext";
import Header from "./HeaderSection";
import ContactCard from "./ContactSection";
import { utamaData, terkiniData } from "./NewsData";
import NewsSection from "./NewsSection";

export default function HomePage({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { toggleSave, isNewsSaved } = useContext(SaveContext);
  const [likedItems, setLikedItems] = useState([]);

  const toggleLike = (id) => {
    const isLiked = likedItems.includes(id);
    if (isLiked) {
      setLikedItems(likedItems.filter((i) => i !== id));
    } else {
      setLikedItems([...likedItems, id]);
    }
  };

  const isLiked = (id) => likedItems.includes(id);

  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const formatDate = (date) =>
    date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return (
    <ScrollView>
      <Header />
      <View style={{ paddingHorizontal: 16 }}>
        <ContactCard />

        {/* Filter tanggal */}
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 6,
          }}
        >
          <Ionicons name="calendar-outline" size={20} color="#2F5C9A" />
          <TouchableOpacity
            style={{ marginLeft: 12, flex: 1 }}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ color: "gray" }}>
              {date ? formatDate(date) : "Pilih tanggal"}
            </Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChange}
          />
        )}

        {/* Seksi berita utama */}
        <NewsSection
          title="Berita Utama"
          data={utamaData}
          isLiked={isLiked}
          onLike={toggleLike}
          onSave={toggleSave}
          isNewsSaved={isNewsSaved}
          navigation={navigation} // <-- Penting!
        />

        {/* Seksi berita terkini */}
        <NewsSection
          title="Berita Terkini"
          data={terkiniData}
          isLiked={isLiked}
          onLike={toggleLike}
          onSave={toggleSave}
          isNewsSaved={isNewsSaved}
          navigation={navigation} // <-- Penting!
        />
      </View>
    </ScrollView>
  );
}
