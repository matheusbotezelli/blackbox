import {BleManager, Characteristic, Device, Subscription} from "react-native-ble-plx";
import {
    CarSettingsCharacteristic,
    DeviceFactoryIdentificationCharacteristic,
    DeviceFirmwareInformationCharacteristic,
    DeviceName,
    DeviceSettingsCharacteristic,
    PhoneCommandCharacteristic,
    PlayerSettingsCharacteristic,
    Service1,
    Service2,
    Service3,
    UnlockKey
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
let deviceSettingsSubscription: Subscription;

export async function AutoConnect(): Promise<void> {
    try {
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
            console.log("Scanning devices stopped.");
            if (mainDevice === undefined) {
                console.log("No device found.");
            }
        });
    } catch (error) {
        console.log(error);
    }
}

async function MapCharacteristics(): Promise<void> {
    try {
        const service1Characteristics = await mainDevice.characteristicsForService(Service1);
        const service2Characteristics = await mainDevice.characteristicsForService(Service2);
        const service3Characteristics = await mainDevice.characteristicsForService(Service3);
        factoryIdentification = service1Characteristics.find(x => x.uuid.toUpperCase() === DeviceFactoryIdentificationCharacteristic)!;
        firmwareInformation = service1Characteristics.find(x => x.uuid.toUpperCase() === DeviceFirmwareInformationCharacteristic)!;
        deviceSettings = service2Characteristics.find(x => x.uuid.toUpperCase() === DeviceSettingsCharacteristic)!;
        carSettings = service2Characteristics.find(x => x.uuid.toUpperCase() === CarSettingsCharacteristic)!;
        playerSettings = service2Characteristics.find(x => x.uuid.toUpperCase() === PlayerSettingsCharacteristic)!;
        phoneCommand = service3Characteristics.find(x => x.uuid.toUpperCase() === PhoneCommandCharacteristic)!;
    } catch (error) {
        console.log(`Error Mapping Characteristics: ${error}`);
    }
}

// Service 1
export async function ReadDeviceFactoryIdentification(): Promise<void> {
    try {
        factoryIdentification = await factoryIdentification.read();
        const hexadecimal = base64ToHex(factoryIdentification.value!);
        console.log(`Device Factory Identification: 0x${hexadecimal}`);
    } catch (error) {
        console.log(error);
    }
}

export async function ReadDeviceFirmwareInformation(): Promise<void> {
    try {
        firmwareInformation = await firmwareInformation.read();
        const hexadecimal = base64ToHex(firmwareInformation.value!);
        console.log(`Device Firmware Information: 0x${hexadecimal}`);
    } catch (error) {
        console.log(error);
    }
}

// Service 2
export async function ReadDeviceSettings(): Promise<void> {
    try {
        deviceSettings = await deviceSettings.read();
        const hexadecimal = base64ToHex(deviceSettings.value!);
        console.log(`Device Settings: 0x${hexadecimal}`);
    } catch (error) {
        console.log(error);
    }
}

export async function WriteDeviceSettings(): Promise<void> {
    try {
        if (!deviceSettings.isNotifying) {
            deviceSettingsSubscription = deviceSettings.monitor((error, characteristic) => {
                deviceSettings = characteristic!;
                if (error) {
                    console.log(error);
                    return;
                }

                const hexadecimal = base64ToHex(characteristic!.value!);
                console.log(`Notification: 0x${hexadecimal}`);
            });
        }
        deviceSettings = await deviceSettings.writeWithResponse(UnlockKey);
    } catch (error) {
        console.log(error);
    }
}

export async function ReadCarSettings(): Promise<void> {
    try {
        carSettings = await carSettings.read();
        const hexadecimal = base64ToHex(carSettings.value!);
        console.log(`Car Settings: 0x${hexadecimal}`);
    } catch (error) {
        console.log(error);
    }
}

export async function ReadPlayerSettings(): Promise<void> {
    try {
        playerSettings = await playerSettings.read();
        const hexadecimal = base64ToHex(playerSettings.value!);
        console.log(`Player Settings: 0x${hexadecimal}`);
    } catch (error) {
        console.log(error);
    }
}

// Service 3
export async function WritePhoneCommand(): Promise<void> {
    try {
        phoneCommand = await phoneCommand.writeWithoutResponse("SET_THE_BASE_64_STRING_HERE");
        const hexadecimal = base64ToHex(phoneCommand.value!);
        console.log(`Phone Command: ${hexadecimal}`);
    } catch (error) {
        console.log(error);
    }
}