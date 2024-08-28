import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {
    AutoConnect,
} from "./src/BluetoothModule";
import {useState} from "react";

export default function App() {
    AutoConnect();

    const [FactoryIdentification, setFactoryIdentification] = useState('');

    const GetFactoryIdentification = () => {
        setFactoryIdentification('value');
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={{marginRight: 10}}>Factory Identification</Text>
                <Text>{FactoryIdentification}</Text>
                <TextInput style={styles.input} placeholder="Digite aqui"/>
                <Button title="Botão 1" onPress={GetFactoryIdentification}/>
                <Button title="Botão 2" onPress={() => {
                }}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        paddingHorizontal: 5,
    },
});