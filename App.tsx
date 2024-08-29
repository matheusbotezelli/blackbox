import {Button, StyleSheet, View} from 'react-native';
import {AutoConnect, GetPlayerSettings, WritePlayerSettings} from "./src/BluetoothModule";

export default function App() {
    AutoConnect();

    return (
        <View style={styles.container}>
            <Button title={"GetPlayerSettings"} onPress={GetPlayerSettings}/>
            <Button title={"WritePlayerSettings"} onPress={WritePlayerSettings}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});