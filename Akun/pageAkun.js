// src/Account/Pageakun.js
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Pageakun = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Akun</Text>
      </View>

      {/* Isi */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Box */}
        <View style={styles.profileBox}>
          <Ionicons name="person-circle-outline" size={50} color="#555" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.profileName}>Rizkuhuy</Text>
            <Text style={styles.profileEmail}>izkuhuydev@email.com</Text>
          </View>
        </View>

        {/* Menu List */}
        <View style={styles.menuContainer}>
          <MenuItem
            icon={<MaterialIcons name="edit" size={20} color="#fff" />}
            label="Kelola Akun"
            sub="Ubah nama, foto dan informasi"
            onPress={() => navigation.navigate('KelolaAkun')}
          />
          <MenuItem
            icon={<Ionicons name="lock-closed" size={20} color="#fff" />}
            label="Keamanan"
            sub="Informasi password"
            onPress={() => navigation.navigate('keamanan')}
          />
          <MenuItem
            icon={<FontAwesome name="history" size={20} color="#fff" />}
            label="Aktivitas"
            sub="Riwayat membaca dan komentar"
            onPress={() => navigation.navigate('Activity')}
          />
          <MenuItem
            icon={<Entypo name="info-with-circle" size={20} color="#fff" />}
            label="Tentang Aplikasi"
            sub="Informasi aplikasi"
            onPress={() => navigation.navigate('About')}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="exit-outline" size={20} color="#fff" style={{ marginRight: 5 }} />
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal Logout */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Ionicons name="exit-outline" size={40} color="#ED4949" />
            <Text style={styles.modalTitle}>Keluar dari akun</Text>
            <Text style={styles.modalMessage}>Apakah anda yakin ingin keluar?</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={() => {
                navigation.replace('Login');
              }}>
                <Text style={styles.confirmText}>Ya, Yakin</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Komponen MenuItem
const MenuItem = ({ icon, label, sub, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIcon}>{icon}</View>
    <View style={{ flex: 1 }}>
      <Text style={styles.menuLabel}>{label}</Text>
      <Text style={styles.menuSub}>{sub}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#999" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#1E4B8A',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 12 },
  content: { padding: 20 },
  profileBox: {
    backgroundColor: '#fff',
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  profileName: { fontSize: 16, fontWeight: 'bold' },
  profileEmail: { fontSize: 13, color: '#666' },
  menuContainer: { marginBottom: 30 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  menuIcon: {
    backgroundColor: '#1E4B8A',
    padding: 10,
    borderRadius: 25,
    marginRight: 12,
  },
  menuLabel: { fontSize: 15, fontWeight: 'bold', color: '#000' },
  menuSub: { fontSize: 12, color: '#555' },
  logoutButton: {
    backgroundColor: '#ED4949',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000088',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10, color: '#ED4949' },
  modalMessage: { fontSize: 14, color: '#444', textAlign: 'center', marginVertical: 10 },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#ddd',
    marginRight: 10,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#ED4949',
    alignItems: 'center',
  },
  cancelText: { color: '#333', fontWeight: 'bold' },
  confirmText: { color: '#fff', fontWeight: 'bold' },
});

export default Pageakun;
