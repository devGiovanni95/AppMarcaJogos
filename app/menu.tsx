import { router } from 'expo-router';
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Grupos" onPress={() => {router.push('allgroups')}} />
      </View>
      {/* <View style={styles.buttonContainer}>
        <Button title="Criar grupo" onPress={() => {router.push('/newgroup')}} />
      </View> */}
      <View style={styles.buttonContainer}>
        <Button title="Meus grupos" onPress={() => {router.replace('/mygroups')} }/>
      </View>
      {/* <View style={styles.buttonContainer}>
        <Button title="Entrar em grupo" onPress={() => {router.push('/enterInGroup')}} />
      </View> */}
      <View style={styles.buttonContainer}>
        <Button title="Próximos jogos" onPress={() => {router.push('/games')}} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Meus próximos jogos" onPress={() => {router.push('/gameswillgo')}} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Sair" onPress={() => {router.push('')}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    margin: 10,
    width: '80%',
  },
});

export default App;
