import {BleManager, Device} from 'react-native-ble-plx';

const manager = new BleManager();
let devices: Device[] = [];

export function ScanDevices(): void {
    devices = [];
    const scan = manager.startDeviceScan(null, {allowDuplicates: false}, (error, device) => {
        if (error) {
            console.log(error.message);
            return;
        }
        if (device != null && !devices.some(x => x.id === device.id)) {
            devices.push(device);
            // console.log(`ID: ${device?.id} Name: ${device?.name}`);
        }
    }).then(async () => {
        await sleep(4000);
        await manager.stopDeviceScan();
        console.log("Scan finished");
        let device = await manager.connectToDevice("5FF05834-B58F-4974-69F2-83A766288DAA");
        await device.discoverAllServicesAndCharacteristics();
        await device.readCharacteristicForService("812B5541-3E76-44AC-A119-27EADFB48B4F", "FE8DF3D7-807A-4514-993F-146ED5B76E32");
    });
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}