import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, View} from 'react-native';

export default function App() {
    return (
        <View style={styles.container}>
            <Button title="Press"></Button>
            <StatusBar style="auto"/>
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
