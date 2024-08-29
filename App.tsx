import {Button, StyleSheet, View} from 'react-native';
import {AutoConnect, GetDeviceSettings, IndicateDeviceSettings} from "./src/BluetoothModule";

export default function App() {
    AutoConnect();

    return (
        <View style={styles.container}>
            <Button title={"GetDeviceSettings"} onPress={GetDeviceSettings}/>
            <Button title={"IndicateDeviceSettings"} onPress={IndicateDeviceSettings}/>
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