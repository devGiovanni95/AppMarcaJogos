import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { storage } from '../storage/storage';

const ListItemEnter = ({ criador, nome, descricao, id }: any) => {
    const [isMember, setIsMember] = useState(false);
    // const userId ='d4c16495-8c12-4648-83cf-26edfb7f6301'
    const handleJoinGroup = async () => {
        try {
            const storedGroupId = await storage.getString('userId') || '';
            console.log("🚀 ~ retrieveGroupId ~ storedGroupId:", storedGroupId)
            let userId = await storedGroupId.replace(/"/g,'')
            console.log("🚀 ~ retrieveGroupId ~ id1:", userId)

            // const response = await fetch(`http://localhost:3000/grupo/membro/${id}`, { method: 'PUT', body: JSON.stringify({ memberId: userId }),});
            const response = await fetch(`http://localhost:3000/grupo/membro/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Adiciona o cabeçalho de Content-Type
                },
                body: JSON.stringify({ memberId: userId }), // Stringify o corpo da solicitação
            });
            const data = await response.json();

            if (response.status === 400) {
                // console.log('Você já faz parte deste grupo.');
                // Alert.alert('Aviso', 'Você já faz parte deste grupo.');
                router.navigate('msg1');
                } else {
                router.navigate('msg2');
                // console.log('Você entrou no grupo com sucesso!');
                // Alert.alert('Sucesso', 'Você entrou no grupo com sucesso!');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao tentar entrar no grupo. Por favor, tente novamente.');
        }
    };

    return (
        <View style={styles.item}>
            <Text style={styles.title}>{nome}</Text>
            <Text style={styles.subtitle}>{descricao}</Text>
            <Text style={styles.creator}>Criador: {criador}</Text>
            <TouchableOpacity onPress={handleJoinGroup} style={styles.button}>
                <Text style={styles.buttonText}>Entrar no Grupo</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        marginTop: 4,
    },
    creator: {
        fontSize: 14,
        marginTop: 8,
        color: '#555',
    },
    button: {
        backgroundColor: '#6495ED',
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ListItemEnter;
