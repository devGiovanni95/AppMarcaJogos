
// import React, { useEffect, useState } from 'react';
// import { FlatList, StyleSheet, View, Text } from 'react-native';
// import ListItem from '../components/ListItem'; 
// import BackButton from '../components/BackButton';
// import { storage } from '../strorage/storage';
// // import CreateGameButton from '../components/CreateGameButton';


// const Home = () => {
//     const [grupos, setGrupos] = useState([]);
//     const [loading, setLoading] = useState(true);
//     // const id = 'd4c16495-8c12-4648-83cf-26edfb7f6301'
//     const [id, setId] = useState()
    
//     const fetchGroups = async () => {

//         try {
//             const id1 = await storage.getString('users') == undefined ? '' : storage.getString('users');
//             await setId(id1);
//             console.log("🚀 ~ Home ~ storedUsers:", id)
//           const response = await fetch(`http://localhost:3000/grupo/my/${id}`);
//           if (!response.ok) {
//             throw new Error('Não foi possível carregar os grupos');
//           }
//           const data = await response.json();
//           console.log("🚀 ~ fetchGroups ~ data:", data);
//           setGrupos(data);
//         } catch (error) {
//           console.error(error);
//         } finally {
//           setLoading(false);
//         }
//       };

//     useEffect(()=>{
  
//         fetchGroups()
//     },[id])

//     // useEffect(() => {
//     //     fetch(`http://localhost:3000/grupo/my/${id}`)
//     //     .then(response => {
//     //         if (!response.ok) {
//     //                 throw new Error('Não foi possível carregar os grupos');
//     //             }
//     //             return response.json();
//     //             })
//     //             .then(data => {
//     //                 console.log("🚀 ~ useEffect ~ data:", data)
//     //                 setGrupos(data);
//     //             setLoading(false);
//     //         })
//     //         .catch(error => {
//     //             console.error(error);
//     //             setLoading(false);
//     //             });
//     //         console.log("🚀 ~ Home ~ grupos:", grupos)
//     // }, []);

//     const renderItem = ({ item }:any) => (
//         <ListItem criador={item.criador.nome} nome={item.nome} descricao={item.descricao} id={item.id}/>
//     );

//     return (
//         <View style={styles.container}>
//             <BackButton />
//             {/* <CreateGameButton /> */}
//             {loading ? (
//                 <Text>Carregando...</Text>
//             ) : grupos.length === 0 ? (
//                 <Text>Não há grupos disponíveis</Text>
//             ) : (
//                 <FlatList
//                     data={grupos}
//                     renderItem={renderItem}
//                         keyExtractor={item => item?.id}
//                 />
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 20,
//     },
// });

// export default Home;


import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import ListItem from '../components/ListItem'; 
import BackButton from '../components/BackButton';
import { storage } from '../storage/storage';

const myGroups = () => {
    const [grupos, setGrupos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState<String | undefined>();
    
    const fetchGroups = async (userId: String) => {
        try {
            const response = await fetch(`http://localhost:3000/grupo/my/${userId}`);
            if (!response.ok) {
                throw new Error('Não foi possível carregar os grupos');
            }
            const data = await response.json();
            console.log("🚀 ~ fetchGroups ~ data:", data);
            setGrupos(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getId = async () => {
            const storedId = await storage.getString('userId') || '';
            let id1 = storedId.replace(/"/g,'')
            setId(id1);
        };
        getId();
    }, []);

    useEffect(() => {
        if (id) {
            fetchGroups(id);
        }
    }, [id]);

    const renderItem = ({ item }:any) => (
        <ListItem criador={item.criador.nome} nome={item.nome} descricao={item.descricao} id={item.id} />
    );

    return (
        <View style={styles.container}>
            <BackButton page="menu"/>
            {loading ? (
                <Text>Carregando...</Text>
            ) : grupos.length === 0 ? (
                <Text style={styles.message}>Voce não faz parte de nenhum grupo ainda.</Text>
            ) : (
                <FlatList
                    data={grupos}
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
    message: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default myGroups;
