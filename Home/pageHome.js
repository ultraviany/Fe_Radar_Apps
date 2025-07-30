import React, { useState, useContext } from "react";
import { ScrollView, View } from "react-native";
import Header from "./HeaderSection"; // pastikan path sesuai
import ContactCard from "./ContactSection"; // pastikan path sesuai
import NewsTabBar from "./NewsTabBar";
import NewsSection from "./NewsSection";
import {
  tulungagungNews,
  blitarNews,
  trenggalekNews,
} from "./NewsData";
import { SaveContext } from "../Context/SaveContext";

export default function HomePage({ navigation }) {
  const [activeTab, setActiveTab] = useState("All Epaper");
  const { toggleSave, isNewsSaved } = useContext(SaveContext);
  const [likedItems, setLikedItems] = useState([]);


  const toggleLike = (id) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getDataByTab = () => {

    if (activeTab === "All Epaper") {
      const combinedNews = [
        ...tulungagungNews,
        ...blitarNews,
        ...trenggalekNews,
      ];

      return combinedNews.sort((a, b) => {
        const dateA = new Date(convertToISO(a.date));
        const dateB = new Date(convertToISO(b.date));
        return dateB - dateA;
      });
    }

    switch (activeTab) {
      case "Radar Tulungagung":
        return tulungagungNews;
      case "Radar Blitar":
        return blitarNews;
      case "Radar Trenggalek":
        return trenggalekNews;
      default:
        return [];
    }
  };

  const convertToISO = (dateStr) => {
    const [day, monthName, year] = dateStr.split(" ");
    const monthMap = {
      Januari: "01",
      Februari: "02",
      Maret: "03",
      April: "04",
      Mei: "05",
      Juni: "06",
      Juli: "07",
      Agustus: "08",
      September: "09",
      Oktober: "10",
      November: "11",
      Desember: "12",
    };

    const month = monthMap[monthName];
    return `${year}-${month}-${day}`;
  };

  const newsData = getDataByTab();

  return (
    <ScrollView style={{ paddingHorizontal: 16 }}>
      <View style={{ marginHorizontal: -16 }}>
        <Header />
      </View>
      <ContactCard />
      <NewsTabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <View>
        <NewsSection
          data={newsData}
          onLike={toggleLike}
          isLiked={(id) => likedItems.includes(id)}
          onSave={toggleSave}
          isNewsSaved={isNewsSaved}
          navigation={navigation}
        />
      </View>
    </ScrollView>
  );
}
