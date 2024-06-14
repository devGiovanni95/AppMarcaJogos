// screens/Login.js
import  { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { UserContext } from '../UserContext';
// import jwtDecode from 'jwt-decode';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { storage } from '../storage/storage';


const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigation = useNavigation();

    const handleRegister = () => {
        router.navigate('register')
    }

    const handleLogin = () => {
        console.log("Entrou no handleLogin");
        // router.navigate('/menu')
        fetch('http://localhost:3000/usuario/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        })
        .then(response => {
            if (!response.ok) {
                console.log('Erro na resposta do servidor:', response.status);
                throw new Error('Credenciais inválidas');
            }
            return response.json();
        })
        .then(data => {
            const { token } = data;
            const { userId } = data;
    
            if (!token) {
                throw new Error('Token não encontrado na resposta');
            }
    
            console.log("🚀 ~ handleLogin ~ token:", token);
            console.log("🚀 ~ handleLogin ~ userId:", userId);
    
            storage.set('userId', JSON.stringify(userId));
            // return SecureStore.setItemAsync('userToken', token)
            //     .then(() => SecureStore.setItemAsync('userId', userId));
        })
        .then(() => {
            console.log("Token e ID armazenados com sucesso");
            router.navigate('/menu');
        })
        .catch(error => {
            Alert.alert('Erro', 'Credenciais inválidas');
            console.error("Erro no handleLogin:", error);
            router.navigate('msg0')
        });
    };

    useEffect(()=>{
        const mail = storage.getString('email') || '';
        let getEmail = mail.replace(/"/g, '')
        if(getEmail != ''){
            setEmail(getEmail)
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRegister} style={styles.button}>
                <Text style={styles.buttonText}>Não sou cadastrado</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
    },
    input: {
        width: '100%',
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    button: {
        backgroundColor: '#6495ED',
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Login;
