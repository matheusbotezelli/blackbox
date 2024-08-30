import {Button, StyleSheet, View} from 'react-native';
import {AutoConnect, ReadDeviceSettings} from "./src/BluetoothModule";

export default function App() {
    AutoConnect();

    return (
        <View style={styles.container}>
            <Button title={"ReadDeviceSettings"} onPress={ReadDeviceSettings}/>
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