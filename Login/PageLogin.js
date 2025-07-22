import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

export default function PageLogin({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Fungsi untuk menangani login
    const handleLogin = () => {
        // Logika autentikasi bisa ditambahkan di sini (misalnya Firebase)
        console.log('Login pressed', { username, email, password });

        // Navigasi ke halaman utama setelah login berhasil
        navigation.navigate('PageCRUD');
    };

    return (
        <View style={styles.container}>
            {/* Logo Radar Tulungagung */}
            <Image
                source={require('../assets/image22.png')}
                style={styles.logo}
            />

            {/* Teks Header */}
            <Text style={styles.headerText}>Login yuk!</Text>
            <Text style={styles.subText}>Biar nggak ketinggalan berita Tulungagung.</Text>

            {/* Input Username */}
            <TextInput
                style={styles.input}
                placeholder="Masukkan nama pengguna"
                value={username}
                onChangeText={setUsername}
            />

            {/* Input Email */}
            <TextInput
                style={styles.input}
                placeholder="Masukkan email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            {/* Input Password */}
            <TextInput
                style={styles.input}
                placeholder="Masukkan kata sandi"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {/* Tombol lupa password */}
            <TouchableOpacity onPress={() => navigation.navigate('PageKonfrimOTP')}>
                <Text style={styles.forgotPassword}>Lupa kata sandi?</Text>
            </TouchableOpacity>

            {/* Tombol Login */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            {/* Navigasi ke halaman Daftar */}
            <Text style={styles.signupText}>
                Belum punya akun?{' '}
                <Text
                    style={styles.signupLink}
                    onPress={() => navigation.navigate('SignUp')}
                >
                    Daftar Sekarang
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 140,
        height: 140,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
    },
    subText: {
        color: '#444',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        padding: 12,
        marginBottom: 15,
        backgroundColor: '#f5f5f5',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 20,
        color: '#1E40AF',
    },
    loginButton: {
        backgroundColor: '#1E3A8A',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 12,
        marginBottom: 20,
        width: '100%',
    },
    loginButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    signupText: {
        color: '#333',
    },
    signupLink: {
        color: '#1E3A8A',
        fontWeight: 'bold',
    },
});
