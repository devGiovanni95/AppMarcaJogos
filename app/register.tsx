import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { storage } from '../storage/storage';

const Register = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    const navigation = useNavigation();

    const handleCadastro = () => {
        if (senha !== confirmSenha) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return;
        }

        fetch('http://localhost:3000/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, senha }),
        })
        .then(response => {
            console.log("🚀 ~ handleCadastro ~ response:", response)
            if (!response.ok) {
                console.log('Erro na resposta do servidor:', response.status);
                throw new Error('Erro ao cadastrar usuário');
            }
            return response.json();
        })
        .then(data => {
            storage.set('email', JSON.stringify(email));
            router.navigate('/');
        })
        .catch(error => {
            Alert.alert('Erro', 'Erro ao cadastrar usuário');
            console.error("Erro no handleCadastro:", error);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
                autoCapitalize="words"
            />
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
            <TextInput
                style={styles.input}
                placeholder="Confirme a senha"
                value={confirmSenha}
                onChangeText={setConfirmSenha}
                secureTextEntry
            />
            <TouchableOpacity onPress={handleCadastro} style={styles.button}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.navigate('/')} style={styles.button}>
                <Text style={styles.buttonText}>Voltar para Login</Text>
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

export default Register;
