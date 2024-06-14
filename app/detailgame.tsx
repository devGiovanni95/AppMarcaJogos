// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import axios from 'axios';

// const GameDetails = () => {
//   const [jogo, setJogo] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchGameDetails = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/jogo/714f819d-f1f4-4f9e-9a4e-9004d770d03d');
//         setJogo(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Erro ao buscar os detalhes do jogo:", error);
//         setLoading(false);
//       }
//     };

//     fetchGameDetails();
//     console.log(jogo)
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (!jogo) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Erro ao carregar os detalhes do jogo.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>ID: {jogo.id}</Text>
//       <Text style={styles.label}>Local: {jogo.local}</Text>
//       <Text style={styles.label}>Valor Quadra: {jogo.valor_quadra}</Text>
//       <Text style={styles.label}>Data: {jogo.data}</Text>
//       <Text style={styles.label}>Horário: {jogo.horario}</Text>
//       <Text style={styles.label}>Finalizado: {jogo.finalizado ? "Sim" : "Não"}</Text>
//       <Text style={styles.label}>Grupo: {jogo.grupo ? jogo.grupo.nome : "N/A"}</Text>
//       <Text style={styles.label}>Usuários: {jogo.usuarios ? jogo.usuarios.map(usuario => usuario.nome).join(', ') : "N/A"}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 8,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     fontSize: 18,
//     color: 'red',
//   },
// });

// export default GameDetails;


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { storage } from '../storage/storage';
import BackButton from '../components/BackButton';
import ButtonFinish from '../components/ButtonFinish';
import { router } from 'expo-router';

const GameDetails = () => {
  const [jogo, setJogo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchGameDetails = async () => {
      const gameId = storage.getString('gameId') || '';
        let idJogo = gameId.replace(/"/g, '')
      try {
        const response = await axios.get(`http://localhost:3000/jogo/${idJogo}`);
        setJogo(response.data);



        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os detalhes do jogo:", error);
        setLoading(false);
      }
    };

    fetchGameDetails();
  console.log(jogo)
  }, []);


  const fetch = async (id: any) => {
    try{
        const response = await axios.put(`http://localhost:3000/jogo/${id}`);
        console.log("🚀 ~ fetch ~ response:", response)
        router.navigate('games')
    }catch(error){
        console.error("Erro ao buscar os detalhes do jogo:", error);
    }
}

  useEffect(()=>{

    if(jogo != null){
        //@ts-ignore
      let qtdpagantes = jogo?.usuarios?.length
        //@ts-ignore
      if(jogo.valor_quadra > 0){
        //@ts-ignore
      setPrice(jogo.valor_quadra / qtdpagantes);              
      }
    }
            })

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!jogo) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro ao carregar os detalhes do jogo.</Text>
      </View>
    );
  }

  const renderUserItem = ({ item }:any) => (
    <View style={styles.userItem}>
      <Text style={styles.userText}>{item.nome}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackButton page={'games'}/>
      { jogo?.finalizado === true ? '' : 
             <TouchableOpacity onPress={() =>{fetch(jogo?.id)}} style={styles.backButton}>
             <Text style={styles.backButtonText}>Finalizar Jogo</Text>
           </TouchableOpacity>
      }
      
      <View style={styles.card}>
        <Text style={styles.title}>Detalhes do Jogo</Text>
        {/* <Text style={styles.label}><Text style={styles.bold}>ID:</Text> {jogo.id}</Text> */}
        <Text style={styles.label}><Text style={styles.bold}>Local:</Text> {jogo.local}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Valor Quadra:</Text> {jogo.valor_quadra}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Valor indivividual:</Text> {jogo.grupo ? price : "0"}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Data:</Text> {jogo.data}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Horário:</Text> {jogo.horario}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Finalizado:</Text> {jogo.finalizado ? "Sim" : "Não"}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Grupo:</Text> {jogo.grupo ? jogo.grupo.nome : "N/A"}</Text>
        {/* <Text style={styles.label}><Text style={styles.bold}>Usuários:</Text> {jogo.usuarios ? jogo.usuarios.map(usuario => usuario.nome).join(', ') : "N/A"}</Text> */}
        <Text style={styles.label}><Text style={styles.bold}>Usuários:</Text></Text>
        <FlatList
          data={jogo.usuarios}
          renderItem={renderUserItem}
          keyExtractor={item => item.id}
          style={styles.userList}
        />
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
  bold: {
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  userList: {
    marginTop: 10,
  },
  userItem: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  userText: {
    fontSize: 16,
    color: '#333',
  },
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

export default GameDetails;
