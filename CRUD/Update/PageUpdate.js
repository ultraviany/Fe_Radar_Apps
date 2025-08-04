import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Modal,
    FlatList,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons, Entypo } from '@expo/vector-icons';

export default function PageUpdate({ navigation, route }) {
    const { data } = route.params || {};

    const [cover, setCover] = useState(data?.cover || null);
    const [pdf, setPdf] = useState(data?.pdf || null);
    const [selectedWilayah, setSelectedWilayah] = useState(data?.wilayah || null);
    const [wilayahModalVisible, setWilayahModalVisible] = useState(false);

    const wilayahList = ['Radar Tulungagung', 'Radar Trenggalek', 'Radar Blitar'];

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
        if (!cover || !pdf || !selectedWilayah) {
            Alert.alert('Lengkapi Data', 'Silakan unggah cover, file PDF, dan pilih wilayah terlebih dahulu.');
            return;
        }

        Alert.alert('Berhasil', 'Perubahan berhasil disimpan!');
        console.log('Cover:', cover);
        console.log('PDF:', pdf);
        console.log('Wilayah:', selectedWilayah);
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

                {/* Cover */}
                <Text style={styles.label}>Edit Cover E-paper</Text>
                <TouchableOpacity style={styles.uploadBox} onPress={pickCoverFromGallery}>
                    <Entypo name="image" size={24} color="#aaa" />
                    <Text style={styles.uploadText}>
                        {cover ? cover.name : 'Upload cover e-paper'}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.note}>*maksimal 100MB</Text>

                {/* PDF */}
                <Text style={styles.label}>Edit PDF E-paper</Text>
                <TouchableOpacity style={styles.uploadBox} onPress={handlePdfUpload}>
                    <Ionicons name="document-text" size={24} color="#aaa" />
                    <Text style={styles.uploadText}>
                        {pdf ? pdf.name : 'Upload PDF e-paper'}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.note}>*pastikan format file yang Anda kirim .pdf</Text>

                {/* Wilayah */}
                <Text style={styles.label}>Wilayah</Text>
                <TouchableOpacity style={styles.input} onPress={() => setWilayahModalVisible(true)}>
                    <View style={styles.row}>
                        <Text>{selectedWilayah || '📍 Pilih wilayah asal e-paper'}</Text>
                        <Ionicons name="chevron-down" size={20} color="#000" />
                    </View>
                </TouchableOpacity>

                <Modal
                    visible={wilayahModalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setWilayahModalVisible(false)}
                >
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        activeOpacity={1}
                        onPressOut={() => setWilayahModalVisible(false)}
                    >
                        <View style={styles.modalContent}>
                            <FlatList
                                data={wilayahList}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelectedWilayah(item);
                                            setWilayahModalVisible(false);
                                        }}
                                        style={styles.modalItem}
                                    >
                                        <Text style={{ fontSize: 16 }}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>

                {/* Simpan */}
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Simpan Perubahan</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FAFB' },
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
    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        padding: 14,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 10,
    },
    modalItem: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});
