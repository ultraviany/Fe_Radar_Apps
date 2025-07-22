import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function PageUpdate() {
  const [cover, setCover] = useState('https://...');
  const [pdf, setPdf] = useState('https://...');
  const [tagline, setTagline] = useState('Tagline sebelumnya...');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Berita</Text>

      <TextInput
        style={styles.input}
        value={cover}
        onChangeText={setCover}
        placeholder="Upload cover baru"
      />
      <TextInput
        style={styles.input}
        value={pdf}
        onChangeText={setPdf}
        placeholder="Upload pdf baru"
      />
      <TextInput
        style={styles.input}
        value={tagline}
        onChangeText={setTagline}
        placeholder="Edit tagline..."
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Simpan Perubahan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#F9FAFB' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 10,
    padding: 12, marginBottom: 15, backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#1E3A8A', padding: 14,
    borderRadius: 10, alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
