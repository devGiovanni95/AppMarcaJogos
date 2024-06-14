import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { storage } from '../storage/storage';
import { router } from 'expo-router';
import DetailGame from '../app/detailgame-naodeucerto';

const GameItems = ({ id, local, valor_quadra, data, horario, finalizado }:any) =>{
    const handleParticipar = async () => {

        const storedUserId = storage.getString('userId') || '';
        let userId = storedUserId.replace(/"/g, '')
        storage.set('gameId', JSON.stringify(id));
        try {
            const response = await fetch('http://localhost:3000/jogo/addmember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ jogoId: id, userId }),
            });

            if (response.ok) {
                Alert.alert('Sucesso', 'Você se cadastrou no jogo com sucesso!');
                router.navigate('/detailgame')
                } else {
                    const errorData = await response.json();
                    Alert.alert('Erro', errorData.message || 'Erro ao se cadastrar no jogo');
                    router.navigate('/msg3')
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao conectar com o servidor');
        }
    }

    const handlePage = async (gameId: any) => {
        storage.set('gameId', JSON.stringify(gameId));
        router.navigate('detailgame')
    }
    return (
    <View style={styles.item}>
        <Text style={styles.title}>{local}</Text>
        <Text style={styles.subtitle}>{`Valor: ${valor_quadra}`}</Text>
        <Text style={styles.subtitle}>{`Data: ${data}`}</Text>
        <Text style={styles.subtitle}>{`Horário: ${horario}`}</Text>
        <Text style={styles.finalizado}>{finalizado ? 'Finalizado' : 'Pendente'}</Text>
        <View style={styles.button}>
            {!finalizado && <Button title="Participar" onPress={handleParticipar} />}
        </View>
       <Button title="Ver detalhes" onPress={()=>{handlePage(id)}} />
    </View>
);
}

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
    finalizado: {
        fontSize: 14,
        marginTop: 8,
        color: '#555',
    },
    button: {
        marginBottom: 5,
        marginTop: 5
    }
});

export default GameItems;
