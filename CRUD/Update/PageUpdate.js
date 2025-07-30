import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons, Entypo } from '@expo/vector-icons';

export default function PageUpdate({ navigation, route }) {

    const { data } = route.params || {}; // ← terima data dari HomeUpdate
    const [cover, setCover] = useState(null);
    const [pdf, setPdf] = useState(null);

    const pickCoverFromGallery = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Izin akses galeri dibutuhkan!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            setCover({
                uri: asset.uri,
                name: asset.fileName || asset.uri.split('/').pop(),
                type: asset.type || 'image/jpeg',
            });
        }
    };

    const handlePdfUpload = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf',
        });

        if (!result.canceled) {
            setPdf(result.assets[0]);
        }
    };

    const handleSave = () => {
        if (!cover || !pdf) {
            alert('Silakan unggah cover dan PDF terlebih dahulu');
            return;
        }

        alert('Perubahan berhasil disimpan!');
        // TODO: Kirim data ke backend jika perlu
    };

    return (
        <View style={styles.container}>
            {/* Header */}
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

            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.title}>Edit Berita</Text>
                <Text style={styles.desc}>Pastikan form yang diisi sesuai dengan judul yang tertera.</Text>

                {/* Upload Cover */}
                <Text style={styles.label}>Edit Cover E-paper</Text>
                <TouchableOpacity style={styles.uploadBox} onPress={pickCoverFromGallery}>
                    <Entypo name="image" size={24} color="#aaa" />
                    <Text style={styles.uploadText}>
                        {cover ? cover.name : 'Upload cover e-paper'}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.note}>*maksimal 100MB</Text>

                {/* Upload PDF */}
                <Text style={styles.label}>Edit Pdf E-paper</Text>
                <TouchableOpacity style={styles.uploadBox} onPress={handlePdfUpload}>
                    <Ionicons name="document-text" size={24} color="#aaa" />
                    <Text style={styles.uploadText}>
                        {pdf ? pdf.name : 'Upload pdf e-paper'}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.note}>*pastikan format file yang anda kirim .pdf</Text>

                {/* Submit Button */}
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Simpan Perubahan</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        backgroundColor: '#1E4B8A',
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
    yellowText: {
        color: '#efbe1eff',
        fontWeight: 'bold',
    },
    whiteText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 6,
        textAlign: 'center',
    },
    desc: {
        textAlign: 'center',
        color: '#444',
        marginBottom: 25,
        fontSize: 13,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 8,
        fontSize: 15,
    },
    uploadBox: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        marginBottom: 6,
    },
    uploadText: {
        color: '#aaa',
        fontSize: 15,
    },
    note: {
        fontSize: 12,
        color: '#888',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#1E4B8A',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
