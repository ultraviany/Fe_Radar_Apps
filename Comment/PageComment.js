import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PageComment({ navigation }) {
  const [comments, setComments] = useState([
    {
      name: 'Budi Budiman',
      comment: 'Serem banget ya.. Angka kriminal tahun ini bener-bener di luar nalar',
    },
    {
      name: 'Siti Khadijah',
      comment:
        'Kenaikan harga beras yang terus terjadi jelas menjadi alarm bagi ketahanan pangan nasional. Harusnya pemerintah lebih peka!',
    },
    {
      name: 'Andrew Nicholas',
      comment:
        'Keren banget, talent anak muda sekarang. Semoga terus berkembang ya...',
    },
  ]);

  const [newComment, setNewComment] = useState('');

  const handleSendComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, { name: 'Anda', comment: newComment }]);
      setNewComment('');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 1 : 0} // ganti sesuai notch/toolbar
      >
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>EPAPER</Text>
            <Text style={styles.headerSubtitle}>
              <Text style={styles.yellowText}>RADAR</Text>
              <Text style={styles.whiteText}> TULUNGAGUNG</Text>
            </Text>
          </View>

          <Text style={styles.date}>Radar Tulungagung, 14 Juli 2025</Text>

          <ScrollView
            style={styles.commentList}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.commentLabel}>Komentar</Text>

            {comments.map((item, index) => (
              <View key={index} style={styles.commentCard}>
                <View style={styles.commentHeader}>
                  <Ionicons
                    name="person-circle"
                    size={30}
                    color="#3B82F6"
                    style={styles.avatar}
                  />
                  <Text style={styles.commentName}>{item.name}</Text>
                </View>
                <Text style={styles.commentText}>{item.comment}</Text>
              </View>
            ))}
          </ScrollView>

          {/* INPUT KOMENTAR */}
          <View style={styles.commentInputArea}>
            <Ionicons name="person-circle-outline" size={28} color="#6B7280" />
            <TextInput
              style={styles.input}
              placeholder="Tambahkan Komentar"
              placeholderTextColor="#9CA3AF"
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity onPress={handleSendComment}>
              <Ionicons
                name="send"
                size={24}
                color={newComment.trim() ? '#1E3A8A' : '#9CA3AF'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#1E4B8A',
    paddingTop: 90,
    paddingBottom: 30,
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 60,
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
  yellowText: {
    color: '#efbe1eff',
    fontWeight: 'bold',
  },
  whiteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  date: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 25,
    fontSize: 15,
  },
  commentLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  commentList: {
    paddingHorizontal: 20,
    marginBottom: 70,
  },
  commentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  avatar: {
    marginRight: 8,
  },
  commentName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  commentText: {
    fontSize: 14,
    color: '#111827',
  },
  commentInputArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    color: '#111827',
  },
});
