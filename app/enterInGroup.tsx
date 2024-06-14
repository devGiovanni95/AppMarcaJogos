// import React from 'react';
// import { FlatList, StyleSheet, View } from 'react-native';
// import ListItemEnter from '../components/ListItem'; // Certifique-se de ajustar o caminho conforme a sua estrutura de pastas
// import BackButton from '../components/BackButton';

// const data = [
//     { id: '1', criador: 'João', nome: 'Grupo de Estudos', descricao: 'Grupo focado em estudos de matemática.' },
//     { id: '2', criador: 'Maria', nome: 'Clube do Livro', descricao: 'Discussões semanais sobre livros.' },
//     { id: '3', criador: 'Carlos', nome: 'Equipe de Futebol', descricao: 'Treinos e partidas aos finais de semana.' },
//     { id: '4', criador: 'Ana', nome: 'Grupo de Culinária', descricao: 'Compartilhamento de receitas e técnicas culinárias.' },
//     { id: '5', criador: 'Pedro', nome: 'Time de Xadrez', descricao: 'Encontros para jogar e estudar estratégias de xadrez.' },
// ];

// const EnterInGroup = () => {
//     const renderItem = ({ item }:any) => (
//         <ListItemEnter criador={item.criador} nome={item.nome} descricao={item.descricao} />
//     );

//     return (
//         <View style={styles.container}>
//              <BackButton />
//             <FlatList
//                 data={data}
//                 renderItem={renderItem}
//                 keyExtractor={item => item.id}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 20,
//     },
// });

// export default EnterInGroup;
