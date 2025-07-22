import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const data = [
  { id: '1', title: 'Edisi 1', image: 'https://via.placeholder.com/150' },
  { id: '2', title: 'Edisi 2', image: 'https://via.placeholder.com/150' },
];

export default function PageDelete() {
  const handleDelete = (id) => {
    // logika penghapusan
    console.log('Hapus', id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hapus Epaper</Text>
      <FlatList
        data={data}
        horizontal
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardFooter}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" size={20} color="#DC2626" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F9FAFB', flex: 1 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  card: {
    width: 150, backgroundColor: '#fff', borderRadius: 10,
    overflow: 'hidden'
  },
  image: { width: 150, height: 200 },
  cardFooter: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', padding: 10
  },
  cardTitle: { fontSize: 14 }
});
