import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const data = [
  { id: '1', title: 'Edisi 1', image: 'https://via.placeholder.com/150' },
  { id: '2', title: 'Edisi 2', image: 'https://via.placeholder.com/150' },
];

export default function PageRead() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Epaper Terbaru</Text>
      <FlatList
        data={data}
        horizontal
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.cardTitle}>{item.title}</Text>
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
    overflow: 'hidden', alignItems: 'center'
  },
  image: { width: 150, height: 200 },
  cardTitle: { textAlign: 'center', paddingVertical: 10 }
});
