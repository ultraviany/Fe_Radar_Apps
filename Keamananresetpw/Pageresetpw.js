import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const GantiPassword = () => {
    const navigation = useNavigation();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSavePassword = () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert("Peringatan", "Silakan isi kedua kolom kata sandi.");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Peringatan", "Kata sandi tidak cocok.");
            return;
        }

        Alert.alert("Berhasil", "Kata sandi berhasil diperbarui.");
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Keamanan</Text>
            </View>

            <View style={styles.profileCard}>
                <Ionicons name="person-circle-outline" size={80} color="#777" />
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.profileName}>Rizkuhuy</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="mail" size={14} color="#555" />
                        <Text style={styles.profileEmail}> iskuhuydev@gmail.com</Text>
                    </View>
                </View>
            </View>

            <View style={styles.form}>
                <Text style={styles.title}>Buat Kata Sandi Baru</Text>
                <Text style={styles.subtitle}>Masukkan kata sandi yang aman untuk akun kamu.</Text>

                <Text style={styles.label}>Kata Sandi Baru</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder="Masukkan kata sandi baru"
                        secureTextEntry
                        style={styles.input}
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <Ionicons name="eye-outline" size={20} color="#1E4B8A" />
                </View>

                <Text style={styles.label}>Konfirmasi Kata Sandi</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder="Ketik ulang kata sandi baru"
                        secureTextEntry
                        style={styles.input}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <Ionicons name="eye-outline" size={20} color="#1E4B8A" />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSavePassword}>
                    <Text style={styles.buttonText}>Simpan Kata Sandi</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#1E4B8A',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '600',
        marginLeft: 10,
    },
    profileCard: {
        marginHorizontal: 20,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#1E4B8A',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        backgroundColor: '#fff',
        elevation: 3,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileEmail: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
    },
    form: {
        marginTop: 30,
        marginHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 12,
        textAlign: 'center',
        color: '#555',
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        marginBottom: 6,
        marginTop: 12,
        fontWeight: '500',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 12,
        backgroundColor: '#F5F5F5',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 45,
    },
    button: {
        backgroundColor: '#1E4B8A',
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
});

export default GantiPassword;
