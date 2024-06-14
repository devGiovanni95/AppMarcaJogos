import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importa o componente de ícone do Expo
import { router } from 'expo-router';

const AlreadyMember = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* <Ionicons name="md-checkmark-circle-outline" size={64} color="green" /> Ícone de sucesso */}
            <Text style={styles.message}>Erro ao criar grupo.</Text>
            <TouchableOpacity onPress={() => router.navigate('/newgroup')} style={styles.button}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    message: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#6495ED',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AlreadyMember;
