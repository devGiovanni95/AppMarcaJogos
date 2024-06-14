import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import BackButton from '../components/BackButton';
import GameItems from './../components/GameItems';
import * as SecureStore from 'expo-secure-store';
import { storage } from '../storage/storage';
import CreateGameButton from '../components/CreateGameButton';

const Games = () => {
    const [groupId, setGroupId] = useState('');
    const [jogosData, setJogosData] = useState([]);

    const renderItem = ({ item }: any) => (
        <GameItems
            id={item.id}
            local={item.local}
            valor_quadra={item.valor_quadra}
            data={item.data}
            horario={item.horario}
            finalizado={item.finalizado}
        />
    );

    useEffect(() => {
        const retrieveGroupId = async () => {
          try {
            const storedGroupId = await storage.getString('group') || '';
            let id1 = storedGroupId.replace(/"/g,'');

            if (storedGroupId) {
                setGroupId(id1);
                fetchJogosData(id1);
            }
          } catch (error) {
            console.error('Erro ao recuperar o ID do grupo:', error);
          }
        };
    
        retrieveGroupId();
    }, []);

    const fetchJogosData = async (groupId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/jogo/group/${groupId}`);
            if (!response.ok) {
                throw new Error('Não foi possível carregar os dados dos jogos');
            }
            const data = await response.json();
            setJogosData(data);
        } catch (error) {
            console.error('Erro ao buscar os dados dos jogos:', error);
        }
    };

    return (
        <View style={styles.container}>
            <BackButton page="mygroups"/>
            <CreateGameButton/>
            {jogosData.length === 0 ? (
                <Text style={styles.noGamesText}>Nenhum jogo encontrado.</Text>
            ) : (
                <FlatList
                    data={jogosData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    noGamesText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#333',
    },
});

export default Games;
