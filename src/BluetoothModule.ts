import {BleManager, Characteristic, Device} from 'react-native-ble-plx';
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
    PhoneCommandCharacteristic,
    PlayerSettingsCharacteristic,
    Service1,
    Service2,
    Service3
} from "./DeviceConfiguration";
import {base64ToHex, sleep} from "./Utils";

const manager: BleManager = new BleManager();
let mainDevice: Device;
let factoryIdentification: Characteristic;
let firmwareInformation: Characteristic;
let deviceSettings: Characteristic;
let carSettings: Characteristic;
let playerSettings: Characteristic;
let phoneCommand: Characteristic;

export async function AutoConnect(): Promise<void> {
    const connectedDevices = await manager.connectedDevices([Service2]);
    const deviceFound = connectedDevices.find(x => x.name?.includes(DeviceName));

    if (deviceFound) {
        mainDevice = deviceFound;
        const isConnected = await mainDevice.isConnected();
        if (!isConnected) {
            await mainDevice.connect();
        }
        await mainDevice.discoverAllServicesAndCharacteristics();
        await MapCharacteristics();
        console.log(`Connected to device: ${mainDevice.id}`);
        return;
    }

    console.log("Scanning devices...");
    manager.startDeviceScan(null, {allowDuplicates: false}, async (error, device) => {
        if (error) {
            console.log(error.message);
            return;
        }

        if (device?.name?.includes(DeviceName)) {
            await manager.stopDeviceScan();
            mainDevice = await device.connect();
            console.log(`Connected to device: ${device.id}`);
            await mainDevice.discoverAllServicesAndCharacteristics();
            await MapCharacteristics();
        }
    }).then(async () => {
        await sleep(10000);
        await manager.stopDeviceScan();
        if (mainDevice === undefined) {
            console.log("No device found.");
        }
    });
}

async function MapCharacteristics(): Promise<void> {
    const service1Characteristics = await mainDevice.characteristicsForService(Service1);
    const service2Characteristics = await mainDevice.characteristicsForService(Service2);
    const service3Characteristics = await mainDevice.characteristicsForService(Service3);
    factoryIdentification = service1Characteristics.find(x => x.uuid.toUpperCase() === DeviceFactoryIdentificationCharacteristic)!;
    firmwareInformation = service1Characteristics.find(x => x.uuid.toUpperCase() === DeviceFirmwareInformationCharacteristic)!;
    deviceSettings = service2Characteristics.find(x => x.uuid.toUpperCase() === DeviceSettingsCharacteristic)!;
    carSettings = service2Characteristics.find(x => x.uuid.toUpperCase() === CarSettingsCharacteristic)!;
    playerSettings = service2Characteristics.find(x => x.uuid.toUpperCase() === PlayerSettingsCharacteristic)!;
    phoneCommand = service3Characteristics.find(x => x.uuid.toUpperCase() === PhoneCommandCharacteristic)!;
}

// Generic Access Service
export async function GetDeviceName(): Promise<void> {
    const characteristic = await mainDevice.readCharacteristicForService(GenericAccessService, DeviceNameCharacteristic);
    const hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Device Name: 0x${hexadecimal}`);
}

export async function GetDeviceAppearance(): Promise<void> {
    const characteristic = await mainDevice.readCharacteristicForService(GenericAccessService, DeviceAppearanceCharacteristic);
    const hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Device Appearance: 0x${hexadecimal}`);
}

// Device Information Service
export async function GetDeviceModelNumber(): Promise<void> {
    const characteristic = await mainDevice.readCharacteristicForService(DeviceInformationService, DeviceModelNumberCharacteristic);
    const hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Device Model Number: 0x${hexadecimal}`);
}

export async function GetDeviceSerialNumber(): Promise<void> {
    const characteristic = await mainDevice.readCharacteristicForService(DeviceInformationService, DeviceSerialNumberCharacteristic);
    const hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Device Serial Number: 0x${hexadecimal}`);
}

export async function GetDeviceFirmwareRevision(): Promise<void> {
    const characteristic = await mainDevice.readCharacteristicForService(DeviceInformationService, DeviceFirmwareRevisionCharacteristic);
    const hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Device Firmware Revision: 0x${hexadecimal}`);
}

export async function GetDeviceHardwareRevision(): Promise<void> {
    const characteristic = await mainDevice.readCharacteristicForService(DeviceInformationService, DeviceHardwareRevisionCharacteristic);
    const hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Device Hardware Revision: 0x${hexadecimal}`);
}

export async function GetDeviceManufacturerName(): Promise<void> {
    const characteristic = await mainDevice.readCharacteristicForService(DeviceInformationService, DeviceManufacturerNameCharacteristic);
    const hexadecimal = base64ToHex(characteristic.value!);
    console.log(`Device Manufacturer Name: 0x${hexadecimal}`);
}

// Service 1
export async function GetDeviceFactoryIdentification(): Promise<void> {
    try {
        const characteristic = await factoryIdentification.read();
        const hexadecimal = base64ToHex(characteristic.value!);
        console.log(`Device Factory Identification: 0x${hexadecimal}`);
    } catch (error) {
        console.log(error);
    }
}

export async function GetDeviceFirmwareInformation(): Promise<void> {
    try {
        const characteristic = await firmwareInformation.read();
        const hexadecimal = base64ToHex(characteristic.value!);
        console.log(`Device Firmware Information: 0x${hexadecimal}`);
    } catch (error) {
        console.log(error);
    }
}

// Service 2
export async function GetDeviceSettings(): Promise<void> {
    try {
        const characteristic = await deviceSettings.read();
        const hexadecimal = base64ToHex(characteristic.value!);
        console.log(`Device Settings: 0x${hexadecimal}`);
    } catch (error) {
        console.log(error);
    }
}

export async function GetCarSettings(): Promise<void> {
    try {
        const characteristic = await carSettings.read();
        const hexadecimal = base64ToHex(characteristic.value!);
        console.log(`Car Settings: 0x${hexadecimal}`);
    } catch (error) {
        console.log(error);
    }
}

export async function GetPlayerSettings(): Promise<void> {
    try {
        console.log("Reading Player Settings...");
        const characteristic = await playerSettings.read();
        const hexadecimal = base64ToHex(characteristic.value!);
        console.log(`Player Settings: 0x${hexadecimal}`);
    } catch (error) {
        console.log(error);
    }
}
