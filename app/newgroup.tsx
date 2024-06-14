// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

// const CadastroGrupo = () => {
//   const [criador, setCriador] = useState('');
//   const [nome, setNome] = useState('');
//   const [descricao, setDescricao] = useState('');

//   const handleCadastro = () => {
//     const grupo = {
//       criador: criador,
//       nome: nome,
//       descricao: descricao
//     };
    
//     // Aqui você pode adicionar a lógica para enviar o grupo para o servidor ou salvar localmente
//     console.log(grupo);
//     Alert.alert('Grupo Cadastrado', `Criador: ${criador}\nNome: ${nome}\nDescrição: ${descricao}`);
    
//     // Reset dos campos após o cadastro
//     setCriador('');
//     setNome('');
//     setDescricao('');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Cadastro de Grupo</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Criador"
//         value={criador}
//         onChangeText={setCriador}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Nome"
//         value={nome}
//         onChangeText={setNome}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Descrição"
//         value={descricao}
//         onChangeText={setDescricao}
//         multiline
//       />
//       <Button title="Cadastrar Grupo" onPress={handleCadastro} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
// });

// export default CadastroGrupo;


// screens/CadastroGrupo.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { storage } from '../storage/storage';
import { router } from 'expo-router';

const CadastroGrupo = () => {
    const [criador, setCriador] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const navigation = useNavigation();

    const handleCadastro = async () => {
        const id = await storage.getString('userId') || '';
        let userId = id.replace(/"/g,'')
        console.log("🚀 ~ handleCadastro ~ userId:", userId)
        setCriador(userId)
        const grupo = {
            criadorId: userId,
            nome: nome,
            descricao: descricao
        };
        try {
            const response = await fetch('http://localhost:3000/grupo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(grupo)
            });

            if (response.ok) {
                // Reset dos campos após o cadastro
                setCriador('');
                setNome('');
                setDescricao('');
                router.navigate('allgroups')
            } else {
                router.navigate('msg4')
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao conectar com o servidor.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Grupo</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
                multiline
            />
            <View style={styles.buttonContainer}>
                <Button title="Cadastrar Grupo" onPress={handleCadastro} />
                <View style={styles.spacer} />
                <Button title="Voltar" onPress={() => navigation.goBack()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        // textAlign:'center',
        textAlignVertical:'center'
    },
    buttonContainer: {
        marginTop: 20,
    },
    spacer: {
        height: 10,
    },
});

export default CadastroGrupo;
