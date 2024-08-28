import {BleManager, Device} from 'react-native-ble-plx';
import {Buffer} from 'buffer'
import {
    CarSettingsCharacteristic,
    DeviceConfigurationService,
    DeviceFactoryIdentificationCharacteristic,
    DeviceFirmwareInformationCharacteristic,
    DeviceInformationService,
    DeviceName, DeviceSettingsCharacteristic, PlayerSettingsCharacteristic
} from "./DeviceConfiguration";

let manager: BleManager = new BleManager();
let connectedDevice: Device;

export async function AutoConnect(): Promise<void> {
    console.log("Scanning devices...");
    manager.startDeviceScan(null, {allowDuplicates: false}, async (error, device) => {
        if (error) {
            console.log(error.message);
            return;
        }

        if (device?.name?.includes(DeviceName)) {
            await manager.stopDeviceScan();
            connectedDevice = await device.connect();
            console.log(`Connected to device: ${device.id}`);
            await connectedDevice.discoverAllServicesAndCharacteristics();
            await GetDeviceFactoryIdentification();
            await GetDeviceFirmwareInformation();
            await GetDeviceSettings();
            await GetCarSettings();
            await GetPlayerSettings();
        }
    }).then(async () => {
        await sleep(4000);
        await manager.stopDeviceScan();
        if (connectedDevice === undefined) {
            console.log("No device found.");
        }
    });
}

export async function GetDeviceFactoryIdentification(): Promise<void> {
    let characteristic = await connectedDevice.readCharacteristicForService(DeviceInformationService, DeviceFactoryIdentificationCharacteristic);
    // console.log(`Device Factory Identification Base64: ${characteristic.value}`);
    let byteArray = base64ToByteArray(characteristic.value!);
    // console.log(`Device Factory Identification ByteArray: [${byteArray}]`);
    let hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Device Factory Identification Hexadecimal: 0x${hexadecimal}`);
}

export async function GetDeviceFirmwareInformation(): Promise<void> {
    let characteristic = await connectedDevice.readCharacteristicForService(DeviceInformationService, DeviceFirmwareInformationCharacteristic);
    // console.log(`Device Firmware Information Base64: ${characteristic.value}`);
    let byteArray = base64ToByteArray(characteristic.value!);
    // console.log(`Device Firmware Information ByteArray: [${byteArray}]`);
    let hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Device Firmware Information Hexadecimal: 0x${hexadecimal}`);
}

export async function GetDeviceSettings(): Promise<void> {
    let characteristic = await connectedDevice.readCharacteristicForService(DeviceConfigurationService, DeviceSettingsCharacteristic);
    // console.log(`Device Settings Base64: ${characteristic.value}`);
    let byteArray = base64ToByteArray(characteristic.value!);
    // console.log(`Device Settings ByteArray: [${byteArray}]`);
    let hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Device Settings Hexadecimal: 0x${hexadecimal}`);
}

export async function GetCarSettings(): Promise<void> {
    let characteristic = await connectedDevice.readCharacteristicForService(DeviceConfigurationService, CarSettingsCharacteristic);
    // console.log(`Car Settings Base64: ${characteristic.value}`);
    let byteArray = base64ToByteArray(characteristic.value!);
    // console.log(`Car Settings ByteArray: [${byteArray}]`);
    let hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Car Settings Hexadecimal: 0x${hexadecimal}`);
}

export async function GetPlayerSettings(): Promise<void> {
    let characteristic = await connectedDevice.readCharacteristicForService(DeviceConfigurationService, PlayerSettingsCharacteristic);
    // console.log(`Player Settings Base64: ${characteristic.value}`);
    let byteArray = base64ToByteArray(characteristic.value!);
    console.log(`Player Settings ByteArray: [${byteArray}]`);
    let hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Player Settings Hexadecimal: 0x${hexadecimal}`);
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function base64ToByteArray(base64: string): Uint8Array {
    const buffer = Buffer.from(base64, 'base64');
    return new Uint8Array(buffer);
}

function base64ToHex(base64String: string): string {
    const buffer = Buffer.from(base64String, 'base64');
    return buffer.toString('hex').toUpperCase();
}