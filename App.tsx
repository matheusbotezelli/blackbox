import {Button, StyleSheet, View} from 'react-native';
import {
    GetDeviceFactoryIdentification,
    GetDeviceFirmwareInformation,
    ScanDevices
} from "./src/modules/BluetoothModule";

export default function App() {
    return (
        <View style={styles.container}>
            <Button title="Scan and Connect" onPress={ScanDevices}></Button>
            <Button title="Device Factory Identification" onPress={GetDeviceFactoryIdentification}></Button>
            <Button title="Device Firmware Identification" onPress={GetDeviceFirmwareInformation}></Button>
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
