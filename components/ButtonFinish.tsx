import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import axios from 'axios';

const ButtonFinish = () => {
    const navigation = useNavigation();



    return (
        //atualizar pra finalizado
        <TouchableOpacity onPress={() =>{fetch}} style={styles.backButton}>
            <Text style={styles.backButtonText}>Finalizar Jogo</Text>
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

export default ButtonFinish;
