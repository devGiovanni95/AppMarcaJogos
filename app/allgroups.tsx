
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import BackButton from '../components/BackButton'
import ListItemEnter from '../components/ListItemEnter';
import ButtonCreateGroup from '../components/ButtonCreateGroup';


const Home = () => {
    const [grupos, setGrupos] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch('http://localhost:3000/grupo')
        .then(response => {
            if (!response.ok) {
                    throw new Error('Não foi possível carregar os grupos');
                }
                return response.json();
                })
                .then(data => {
                    console.log("🚀 ~ useEffect ~ data:", data)
                    setGrupos(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
                });
            console.log("🚀 ~ Home ~ grupos:", grupos)
    }, []);

    const renderItem = ({ item }:any) => (
        <ListItemEnter criador={item.criador.nome} nome={item.nome} descricao={item.descricao} id={item.id}/>
    );

    return (
        <View style={styles.container}>
            <BackButton page="menu"  />
            <ButtonCreateGroup page="newgroup"  />
            {loading ? (
                <Text>Carregando...</Text>
            ) : grupos.length === 0 ? (
                <Text style={styles.message}>Não há grupos disponíveis</Text>
            ) : (
                <FlatList
                    data={grupos}
                    renderItem={renderItem}
                        keyExtractor={item => item?.id}
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
    message: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default Home;
