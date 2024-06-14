import { router, useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { storage } from '../storage/storage';

const ListItem = ({ criador, nome, descricao, id }:any) => {
    const navigation = useNavigation(); 
    const handle = async (x:string) => {
        storage.set('group', JSON.stringify(x));
        router.push('/games')
    }

    return(
    <View style={styles.item}>
        <Text style={styles.title}>{nome}</Text>
        <Text style={styles.subtitle}>{descricao}</Text>
        <Text style={styles.creator}>Criador: {criador}</Text>
        {/* <Text style={styles.creator}>Criador: {id}</Text> */}
        <Button title="Ver jogos no grupo" onPress={()=>{handle(id)}} />
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
        fontWeight: 'bold',
        },
    creator: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 4,
        marginBottom: 4,
        color: '#555',
    },
});

export default ListItem;
