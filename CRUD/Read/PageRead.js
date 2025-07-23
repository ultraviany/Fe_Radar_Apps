import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import cover1 from '../../assets/cover1.png';
import cover2 from '../../assets/cover2.png';

const allData = [
  {
    id: '1',
    image: cover1,
    date: '10 Juli 2025',
    rawDate: new Date(2025, 6, 10),
  },
  {
    id: '2',
    image: cover2,
    date: '14 Juli 2025',
    rawDate: new Date(2025, 6, 14),
  },
];

export default function PageRead({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const filteredData = selectedDate
    ? allData.filter(
        (item) => item.rawDate.toDateString() === selectedDate.toDateString()
      )
    : allData;

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.cardFooter}>
        <View style={styles.iconWrapper}>
          <Ionicons name="calendar" size={13} color="#1E3A8A" />
        </View>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EPAPER</Text>
        <Text style={styles.headerSubtitle}>
          <Text style={styles.yellowText}>RADAR </Text>
          <Text style={styles.whiteText}>TULUNGAGUNG</Text>
        </Text>
      </View>

      {/* FILTER TANGGAL */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setShowPicker(true)}
      >
        <Ionicons name="calendar-outline" size={18} color="#1E3A8A" />
        <Text style={styles.filterText}>
          {selectedDate
            ? selectedDate.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            : 'Cari berdasarkan tanggal'}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* LIST */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Tidak ada epaper untuk tanggal ini.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef1f4ed' },
  header: {
    backgroundColor: '#1E3A8A',
    paddingTop: Platform.OS === 'ios' ? 90 : 70,
    paddingBottom: 30,
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 25,
    marginTop: 8,
  },
  yellowText: { color: '#efbe1eff', fontWeight: 'bold' },
  whiteText: { color: '#fff', fontWeight: 'bold' },
  list: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  filterText: {
    marginLeft: 10,
    color: '#1E293B',
    fontWeight: '500',
    fontSize: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    width: '48%',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 270,
    resizeMode: 'cover',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#F9FAFB',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  iconWrapper: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginRight: 6,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1E293B',
    flex: 1,
    marginLeft: 6,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#64748B',
    fontSize: 14,
  },
});
