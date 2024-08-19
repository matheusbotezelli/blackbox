import {Button, StyleSheet, View} from 'react-native';
import {ScanDevices} from "./src/modules/BluetoothModule";

export default function App() {
    return (
        <View style={styles.container}>
            <Button title="Scan Devices" onPress={ScanDevices}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
