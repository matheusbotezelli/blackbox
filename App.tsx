import {Button, StyleSheet, View} from 'react-native';
import {AutoConnect, ReadDeviceSettings, WriteDeviceSettings} from "./src/BluetoothModule";

export default function App() {
    AutoConnect();

    return (
        <View style={styles.container}>
            <Button title={"AutoConnect"} onPress={AutoConnect}/>
            <Button title={"ReadDeviceSettings"} onPress={ReadDeviceSettings}/>
            <Button title={"WriteDeviceSettings"} onPress={WriteDeviceSettings}/>
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