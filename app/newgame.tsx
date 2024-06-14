// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, TouchableOpacity } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { useNavigation } from '@react-navigation/native';
// import BackButton from '../components/BackButton'; // Ajuste o caminho conforme a estrutura do seu projeto
// import { storage } from '../storage/storage';
// import { router } from 'expo-router';

// const NewGames = () => {
//     const navigation = useNavigation();
//     const [local, setLocal] = useState('');
//     const [valor_quadra, setValor_quadra] = useState('');
//     const [date, setDate] = useState(new Date());
//     const [showDatePicker, setShowDatePicker] = useState(false);
//     const [time, setTime] = useState(new Date());
//     const [showTimePicker, setShowTimePicker] = useState(false);

//     // const handleSave = () => {
//     //     if (!local || !valor_quadra || !date || !time) {
//     //         Alert.alert('Erro', 'Por favor, preencha todos os campos.');
//     //         return;
//     //     }

//     //     // Aqui você pode adicionar a lógica para salvar os dados do jogo, por exemplo, enviando-os para um servidor ou salvando-os localmente.
//     //     const data = date.toISOString().split('T')[0]; // Formata a data para AAAA-MM-DD
//     //     const horario = time.toTimeString().split(' ')[0]; // Formata o horário para HH:MM

//     //     Alert.alert('Sucesso', 'Jogo criado com sucesso!');
//     //     // Resetar os campos
//     //     setLocal('');
//     //     setValor_quadra('');
//     //     setDate(new Date());
//     //     setTime(new Date());
//     // };

//     const handleSave = async () => {
//         if (!local || !valor_quadra || !date || !time) {
//             Alert.alert('Erro', 'Por favor, preencha todos os campos.');
//             return;
//         }

//         const data = date.toISOString().split('T')[0]; // Formata a data para AAAA-MM-DD
//         const horario = time.toTimeString().split(' ')[0]; // Formata o horário para HH:MM

//         const group = await storage.getString('group') || '';
//         let groupId = group.replace(/"/g,'')
        

//         const gameData = {
//             local,
//             valor_quadra,
//             data,
//             horario,
//             finalizado:false,
//             groupId
//         };

//         try {
//             const response = await fetch('http://localhost:3000/jogo', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(gameData)
//             });

//             if (response.ok) {
//                 Alert.alert('Sucesso', 'Jogo criado com sucesso!');
//                 // Resetar os campos
//                 setLocal('');
//                 setValor_quadra('');
//                 setDate(new Date());
//                 setTime(new Date());
//                 router.navigate('games')
//             } else {
//                 const errorData = await response.json();
//                 Alert.alert('Erro', errorData.message || 'Ocorreu um erro ao criar o jogo.');
//             }
//         } catch (error) {
//             Alert.alert('Erro', 'Ocorreu um erro ao conectar com o servidor.');
//         }
//     };


//     const showDatepicker = () => {
//         setShowDatePicker(true);
//     };

//     const showTimepicker = () => {
//         setShowTimePicker(true);
//     };

//     const onDateChange = ({event, selectedDate}:any) => {
//         const currentDate = selectedDate || date;
//         setShowDatePicker(Platform.OS === 'ios');
//         setDate(currentDate);
//     };

//     const onTimeChange = ({event, selectedTime}:any) => {
//         const currentTime = selectedTime || time;
//         setShowTimePicker(Platform.OS === 'ios');
//         setTime(currentTime);
//     };

//     return (
//         <View style={styles.container}>
//             <BackButton page={"games"}/>
//             <Text style={styles.title}>Criar Novo Jogo</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Local"
//                 value={local}
//                 onChangeText={setLocal}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Valor da Quadra"
//                 value={valor_quadra}
//                 onChangeText={setValor_quadra}
//                 keyboardType="numeric"
//             />
//             <TouchableOpacity onPress={showDatepicker}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Data (AAAA-MM-DD)"
//                     value={date.toISOString().split('T')[0]}
//                     editable={true}
//                 />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={showTimepicker}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Horário (HH:MM)"
//                     value={time.toTimeString().split(' ')[0].substring(0, 5)}
//                     editable={true}
//                 />
//             </TouchableOpacity>
//             {showDatePicker && (
//                 <DateTimePicker
//                     value={date}
//                     mode="date"
//                     display="default"
//                     onChange={onDateChange}
//                 />
//             )}
//             {showTimePicker && (
//                 <DateTimePicker
//                     value={time}
//                     mode="time"
//                     display="default"
//                     onChange={onTimeChange}
//                 />
//             )}
//             <Button title="Salvar" onPress={handleSave} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 10,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     input: {
//         height: 40,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         marginBottom: 20,
//         paddingHorizontal: 10,
//         borderRadius: 5,
//     },
// });

// export default NewGames;


import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton'; // Ajuste o caminho conforme a estrutura do seu projeto
import { storage } from '../storage/storage';
import { router } from 'expo-router';

const NewGames = () => {
    const navigation = useNavigation();
    const [local, setLocal] = useState('');
    const [valor_quadra, setValor_quadra] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [time, setTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleSave = async () => {
        if (!local || !valor_quadra || !date || !time) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        const data = date.toISOString().split('T')[0]; // Formata a data para AAAA-MM-DD
        const horario = time.toTimeString().split(' ')[0]; // Formata o horário para HH:MM

        const group = await storage.getString('group') || '';
        let groupId = group.replace(/"/g, '');

        const gameData = {
            local,
            valor_quadra,
            data,
            horario,
            finalizado: false,
            groupId
        };

        try {
            const response = await fetch('http://localhost:3000/jogo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gameData)
            });

            if (response.ok) {
                Alert.alert('Sucesso', 'Jogo criado com sucesso!');
                // Resetar os campos
                setLocal('');
                setValor_quadra('');
                setDate(new Date());
                setTime(new Date());
                router.navigate('games');
            } else {
                const errorData = await response.json();
                Alert.alert('Erro', errorData.message || 'Ocorreu um erro ao criar o jogo.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao conectar com o servidor.');
        }
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const showTimepicker = () => {
        setShowTimePicker(true);
    };

    const onDateChange = (event: any, selectedDate: React.SetStateAction<Date>) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const onTimeChange = (event: any, selectedTime: React.SetStateAction<Date>) => {
        setShowTimePicker(false);
        if (selectedTime) {
            setTime(selectedTime);
        }
    };

    return (
        <View style={styles.container}>
            <BackButton page={"games"} />
            <Text style={styles.title}>Criar Novo Jogo</Text>
            <TextInput
                style={styles.input}
                placeholder="Local"
                value={local}
                onChangeText={setLocal}
            />
            <TextInput
                style={styles.input}
                placeholder="Valor da Quadra"
                value={valor_quadra}
                onChangeText={setValor_quadra}
                keyboardType="numeric"
            />
            <TouchableOpacity onPress={showDatepicker}>
                <TextInput
                    style={styles.input}
                    placeholder="Data (AAAA-MM-DD)"
                    value={date.toISOString().split('T')[0]}
                    editable={false}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={showTimepicker}>
                <TextInput
                    style={styles.input}
                    placeholder="Horário (HH:MM)"
                    value={time.toTimeString().split(' ')[0].substring(0, 5)}
                    editable={false}
                />
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}
            {showTimePicker && (
                <DateTimePicker
                    value={time}
                    mode="time"
                    display="default"
                    onChange={onTimeChange}
                />
            )}
            <Button title="Salvar" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default NewGames;
