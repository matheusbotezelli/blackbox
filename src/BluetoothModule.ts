import {BleManager, Device} from 'react-native-ble-plx';
import {Buffer} from 'buffer'
import {
    CarSettingsCharacteristic,
    DeviceAppearanceCharacteristic,
    DeviceFactoryIdentificationCharacteristic,
    DeviceFirmwareInformationCharacteristic,
    DeviceFirmwareRevisionCharacteristic,
    DeviceHardwareRevisionCharacteristic,
    DeviceInformationService,
    DeviceManufacturerNameCharacteristic,
    DeviceModelNumberCharacteristic,
    DeviceName,
    DeviceNameCharacteristic,
    DeviceSerialNumberCharacteristic,
    DeviceSettingsCharacteristic,
    GenericAccessService,
    PlayerSettingsCharacteristic,
    Service1,
    Service2
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
            // await GetDeviceName();
            // await GetDeviceAppearance();
            // await GetDeviceModelNumber();
            // await GetDeviceSerialNumber();
            // await GetDeviceFirmwareRevision();
            // await GetDeviceHardwareRevision();
            // await GetDeviceManufacturerName();
            // await GetDeviceFactoryIdentification();
            // await GetDeviceFirmwareInformation();
            // await GetDeviceSettings();
            // await GetCarSettings();
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

// Generic Access Service
export async function GetDeviceName(): Promise<void> {
    const characteristic = await connectedDevice.readCharacteristicForService(GenericAccessService, DeviceNameCharacteristic);
    const hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Device Name: 0x${hexadecimal}`);
}

export async function GetDeviceAppearance(): Promise<void> {
    const characteristic = await connectedDevice.readCharacteristicForService(GenericAccessService, DeviceAppearanceCharacteristic);
    const hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Device Appearance: 0x${hexadecimal}`);
}

// Device Information Service
export async function GetDeviceModelNumber(): Promise<void> {
    const characteristic = await connectedDevice.readCharacteristicForService(DeviceInformationService, DeviceModelNumberCharacteristic);
    const hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Device Model Number: 0x${hexadecimal}`);
}

export async function GetDeviceSerialNumber(): Promise<void> {
    const characteristic = await connectedDevice.readCharacteristicForService(DeviceInformationService, DeviceSerialNumberCharacteristic);
    const hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Device Serial Number: 0x${hexadecimal}`);
}

export async function GetDeviceFirmwareRevision(): Promise<void> {
    const characteristic = await connectedDevice.readCharacteristicForService(DeviceInformationService, DeviceFirmwareRevisionCharacteristic);
    const hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Device Firmware Revision: 0x${hexadecimal}`);
}

export async function GetDeviceHardwareRevision(): Promise<void> {
    const characteristic = await connectedDevice.readCharacteristicForService(DeviceInformationService, DeviceHardwareRevisionCharacteristic);
    const hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Device Hardware Revision: 0x${hexadecimal}`);
}

export async function GetDeviceManufacturerName(): Promise<void> {
    const characteristic = await connectedDevice.readCharacteristicForService(DeviceInformationService, DeviceManufacturerNameCharacteristic);
    const hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Device Manufacturer Name: 0x${hexadecimal}`);
}

// Service 1
export async function GetDeviceFactoryIdentification(): Promise<void> {
    const characteristic = await connectedDevice.readCharacteristicForService(Service1, DeviceFactoryIdentificationCharacteristic);
    const hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Device Factory Identification: 0x${hexadecimal}`);
}

export async function GetDeviceFirmwareInformation(): Promise<void> {
    const characteristic = await connectedDevice.readCharacteristicForService(Service1, DeviceFirmwareInformationCharacteristic);
    const hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Device Firmware Information: 0x${hexadecimal}`);
}

// Service 2
export async function GetDeviceSettings(): Promise<void> {
    const characteristic = await connectedDevice.readCharacteristicForService(Service2, DeviceSettingsCharacteristic);
    const hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Device Settings: 0x${hexadecimal}`);
}

export async function GetCarSettings(): Promise<void> {
    const characteristic = await connectedDevice.readCharacteristicForService(Service2, CarSettingsCharacteristic);
    const hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Car Settings: 0x${hexadecimal}`);
}

export async function GetPlayerSettings(): Promise<void> {
    try {
        console.log("Reading Player Settings...");
        const characteristic = await connectedDevice.readCharacteristicForService(Service2, PlayerSettingsCharacteristic);
        const hexadecimal = base64ToHex(characteristic.value!);
        console.log(`Player Settings: 0x${hexadecimal}`);
    } catch (error) {
        console.log(error);
    }
}

export async function WritePlayerSettings(): Promise<void> {
    try {
        const playerSettings = hexToBase64("00110011001100");
        console.log(`Writing Player Settings: ${playerSettings}`);
        await connectedDevice.writeCharacteristicWithoutResponseForService(Service2, PlayerSettingsCharacteristic, playerSettings);
        console.log("Player Settings written successfully.");
    } catch (error) {
        console.log(error);
    }
}

// Utils
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

function hexToBase64(hexString: string): string {
    const buffer = Buffer.from(hexString, 'hex');
    return buffer.toString('base64');
}