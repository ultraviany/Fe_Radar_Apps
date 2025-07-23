import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const KelolaAkun = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor="#1E4B8A" barStyle="light-content" />
            <View style={styles.header}>
                <TouchableOpacity>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Kelola Akun</Text>
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                {/* Foto Profil */}
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarWrapper}>
                        <Icon name="person" size={60} color="#aaa" />
                        <TouchableOpacity style={styles.cameraIcon}>
                            <Icon name="camera" size={18} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.uploadText}>
                        Ketuk ikon kamera untuk mengunggah foto profil
                    </Text>
                </View>

                {/* Form Input */}
                <View style={styles.form}>
                    <Text style={styles.label}>Nama Lengkap</Text>
                    <TextInput
                        style={styles.input}
                        defaultValue="Rizkuhuy"
                        placeholder="Nama Lengkap"
                    />

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        defaultValue="iskuhuydev@email.com"
                        placeholder="Email"
                        keyboardType="email-address"
                    />

                    <Text style={styles.label}>No Handphone</Text>
                    <TextInput
                        style={styles.input}
                        defaultValue="+62 805-0921-2234"
                        placeholder="No Handphone"
                        keyboardType="phone-pad"
                    />

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Simpan Perubahan</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#1E4B8A',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        paddingTop: 50,
        paddingBottom: 20,
        gap: 15,
    },
    headerTitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    container: {
        alignItems: 'center',
        padding: 24,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarWrapper: {
        backgroundColor: '#eee',
        borderRadius: 60,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#1E4B8A',
        borderRadius: 12,
        padding: 4,
    },
    uploadText: {
        marginTop: 12,
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
        color: '#333',
    },
    input: {
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#1E4B8A',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 8,
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default KelolaAkun;
