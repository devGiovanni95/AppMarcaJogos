import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const CreateGameButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => router.navigate('/newgame')} style={styles.backButton}>
            <Text style={styles.backButtonText}>Criar uma Partida</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    backButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        margin: 10,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default CreateGameButton;
