// // import React, { useEffect, useState } from 'react';
// // import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
// // import axios from 'axios';
// // import { storage } from '../strorage/storage';

// // const GameList = () => {
// //   const [jogos, setJogos] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchGames = async () => {
// //         const userId = await storage.getString('group') || '';
// //         let id = userId.replace(/"/g,'')
// //       try {
// //         const response = await axios.get(`http://localhost:3000/jogos/games/${id}`);
// //         setJogos(response.data);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error('Erro ao buscar os dados dos jogos:', error);
// //         setLoading(false);
// //       }
// //     };

// //     fetchGames();
// //   }, []);

// //   const renderGame = ({ item }:any) => (
// //     <View style={styles.gameContainer}>
// //       <Text style={styles.label}><Text style={styles.bold}>Local:</Text> {item.local}</Text>
// //       <Text style={styles.label}><Text style={styles.bold}>Valor Quadra:</Text> {item.valor_quadra}</Text>
// //       <Text style={styles.label}><Text style={styles.bold}>Data:</Text> {item.data}</Text>
// //       <Text style={styles.label}><Text style={styles.bold}>Horário:</Text> {item.horario}</Text>
// //       <Text style={styles.label}><Text style={styles.bold}>Finalizado:</Text> {item.finalizado ? "Sim" : "Não"}</Text>
// //       <Text style={styles.label}><Text style={styles.bold}>Grupo:</Text> {item.grupo ? item.grupo.nome : "N/A"}</Text>
// //       <Text style={styles.label}><Text style={styles.bold}>Descrição do Grupo:</Text> {item.grupo ? item.grupo.descricao : "N/A"}</Text>
// //       <Text style={styles.label}><Text style={styles.bold}>Usuários:</Text></Text>
// //       {item.usuarios && item.usuarios.length > 0 ? (
// //         item.usuarios.map((usuario: { id: React.Key | null | undefined; nome: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
// //           <Text key={usuario.id} style={styles.userItem}>{usuario.nome}</Text>
// //         ))
// //       ) : (
// //         <Text style={styles.label}>N/A</Text>
// //       )}
// //     </View>
// //   );

// //   if (loading) {
// //     return (
// //       <View style={styles.loader}>
// //         <ActivityIndicator size="large" color="#0000ff" />
// //       </View>
// //     );
// //   }

// //   return (
// //     <FlatList
// //       data={jogos}
// //       renderItem={renderGame}
// //       keyExtractor={item => item.id}
// //       contentContainerStyle={styles.listContainer}
// //     />
// //   );
// // };

// // const styles = StyleSheet.create({
// //   listContainer: {
// //     padding: 16,
// //     backgroundColor: '#f0f0f0',
// //   },
// //   gameContainer: {
// //     backgroundColor: '#fff',
// //     padding: 16,
// //     marginBottom: 16,
// //     borderRadius: 8,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 3,
// //     elevation: 3,
// //   },
// //   label: {
// //     fontSize: 16,
// //     marginBottom: 4,
// //   },
// //   bold: {
// //     fontWeight: 'bold',
// //   },
// //   userItem: {
// //     fontSize: 14,
// //     marginLeft: 16,
// //     marginBottom: 2,
// //   },
// //   loader: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// // });

// // export default GameList;

// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
// import axios from 'axios';
// import { storage } from '../storage/storage';
// import BackButton from '../components/BackButton';

// const GameList = () => {
//   const [jogos, setJogos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchGames = async () => {
//       const userId = await storage.getString('userId') || '';
//       let id = userId.replace(/"/g, '');
//       try {
//         const response = await axios.get(`http://localhost:3000/jogo/games/${id}`);
//         setJogos(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Erro ao buscar os dados dos jogos:', error);
//         setLoading(false);
//       }
//     };

//     fetchGames();
//   }, []);

//   const renderGame = ({ item }:any) => (
//     <View style={styles.gameContainer}>
//       <Text style={styles.label}><Text style={styles.bold}>Local:</Text> {item.local}</Text>
//       <Text style={styles.label}><Text style={styles.bold}>Valor Quadra:</Text> {item.valor_quadra}</Text>
//       <Text style={styles.label}><Text style={styles.bold}>Data:</Text> {item.data}</Text>
//       <Text style={styles.label}><Text style={styles.bold}>Horário:</Text> {item.horario}</Text>
//       <Text style={styles.label}><Text style={styles.bold}>Finalizado:</Text> {item.finalizado ? "Sim" : "Não"}</Text>
//       <Text style={styles.label}><Text style={styles.bold}>Grupo:</Text> {item.grupo ? item.grupo.nome : "N/A"}</Text>
//       <Text style={styles.label}><Text style={styles.bold}>Descrição do Grupo:</Text> {item.grupo ? item.grupo.descricao : "N/A"}</Text>
//       <Text style={styles.label}><Text style={styles.bold}>Usuários:</Text></Text>
//       {item.usuarios && item.usuarios.length > 0 ? (
//         item.usuarios.map((usuario: { id: React.Key | null | undefined; nome: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
//           <Text key={usuario.id} style={styles.userItem}>{usuario.nome}</Text>
//         ))
//       ) : (
//         <Text style={styles.label}>N/A</Text>
//       )}
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (jogos.length === 0) {
//     return (
//       <View style={styles.messageContainer}>
//         <BackButton page={'menu'}/>
//         <Text style={styles.messageText}>Nenhum jogo encontrado.</Text>
//       </View>
//     );
//   }

//   return (
//     <View>
//       <BackButton page={'menu'}/>

//     <ScrollView >
//     <FlatList
//       data={jogos}
//       renderItem={renderGame}
//       keyExtractor={item => item.id}
//       contentContainerStyle={styles.listContainer}
//       />
//       </ScrollView>
//       </View>
//   );
// };

// const styles = StyleSheet.create({
//   listContainer: {
//     padding: 16,
//     backgroundColor: '#f0f0f0',
//   },
//   gameContainer: {
//     backgroundColor: '#fff',
//     padding: 16,
//     marginBottom: 16,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   bold: {
//     fontWeight: 'bold',
//   },
//   userItem: {
//     fontSize: 14,
//     marginLeft: 16,
//     marginBottom: 2,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   messageContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   messageText: {
//     fontSize: 18,
//     color: '#666',
//   },
// });

// export default GameList;

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { storage } from '../storage/storage';
import BackButton from '../components/BackButton';

const GameList = () => {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      const userId = await storage.getString('userId') || '';
      let id = userId.replace(/"/g, '');
      try {
        const response = await axios.get(`http://localhost:3000/jogo/games/${id}`);
        setJogos(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os dados dos jogos:', error);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const renderGame = ({ item }: any) => (
    <View style={styles.gameContainer}>
      <Text style={styles.label}><Text style={styles.bold}>Local:</Text> {item.local}</Text>
      <Text style={styles.label}><Text style={styles.bold}>Valor Quadra:</Text> {item.valor_quadra}</Text>
      <Text style={styles.label}><Text style={styles.bold}>Data:</Text> {item.data}</Text>
      <Text style={styles.label}><Text style={styles.bold}>Horário:</Text> {item.horario}</Text>
      <Text style={styles.label}><Text style={styles.bold}>Finalizado:</Text> {item.finalizado ? "Sim" : "Não"}</Text>
      <Text style={styles.label}><Text style={styles.bold}>Grupo:</Text> {item.grupo ? item.grupo.nome : "N/A"}</Text>
      <Text style={styles.label}><Text style={styles.bold}>Descrição do Grupo:</Text> {item.grupo ? item.grupo.descricao : "N/A"}</Text>
      <Text style={styles.label}><Text style={styles.bold}>Usuários:</Text></Text>
      {item.usuarios && item.usuarios.length > 0 ? (
        item.usuarios.map((usuario: { id: React.Key | null | undefined; nome: string }) => (
          <Text key={usuario.id} style={styles.userItem}>{usuario.nome}</Text>
        ))
      ) : (
        <Text style={styles.label}>N/A</Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (jogos.length === 0) {
    return (
      <View style={styles.messageContainer}>
        <BackButton page={'menu'}/>
        <Text style={styles.messageText}>Nenhum jogo encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton page={'menu'}/>
      <FlatList
        data={jogos}
        renderItem={renderGame}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  gameContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  userItem: {
    fontSize: 14,
    marginLeft: 16,
    marginBottom: 2,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 18,
    color: '#666',
  },
});

export default GameList;
