import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { storage } from '../storage/storage';

const DetailGame = () => {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJogos = async () => {
      const gameId = await storage.getString('gameId') || '';
      let id = gameId.replace(/"/g, '');
      console.log("🚀 id jogo:", id);

      try {
        const response = await fetch(`http://localhost:3000/jogo/${id}`);
        const data = await response.json();
        console.log("🚀 ~ fetchJogos ~ data:", data);
        setJogos(data);

        if (response.ok) {
          setJogos(data);
        } else {
          console.error("Erro na resposta da API:", data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        setLoading(false);
      }
    };

    fetchJogos();
  }, []);

  const renderItem = ({ item }:any) => (
    <View style={styles.item}>
      <Text style={styles.title}>Local: {item.local}</Text>
      <Text>Valor Quadra: {item.valor_quadra}</Text>
      <Text>Data: {item.data}</Text>
      <Text>Horário: {item.horario}</Text>
      <Text>Finalizado: {item.finalizado ? "Sim" : "Não"}</Text>
      {/* <Text>Grupo: {item.grupo ? item.grupo.nome : "N/A"}</Text> */}
      {/* <Text>Usuários: {item.usuarios ? item.usuarios.map(usuario => usuario.nome).join(', ') : "N/A"}</Text> */}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={jogos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailGame;
