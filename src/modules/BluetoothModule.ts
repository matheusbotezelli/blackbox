import {BleManager, Device} from 'react-native-ble-plx';
import {Buffer} from 'buffer'

let manager: BleManager = new BleManager();
let devices: Device[] = [];
let connectedDevice: Device;

const DeviceUUID: string = "5B732855-6C98-BE5C-53DA-42DEF038D059";

const DeviceInformationService: string = "812B5541-3E76-44AC-A119-27EADFB48B4F";
const DeviceFactoryIdentificationCharacteristic: string = "FE8DF3D7-807A-4514-993F-146ED5B76E32";
const DeviceFirmwareInformationCharacteristic: string = "3E240DAD-B045-434F-A4E1-F022BBC4F767";

const DeviceConfigurationService: string = "FE1637F9-190C-411A-B1BD-ACFDC391C9F3";
const DeviceSettingsCharacteristic: string = "2EDF6646-D783-4FDC-9845-FA0D9E3D8807";
const CarSettingsCharacteristic: string = "106FA464-71 FB-41 FF-81B3-5A1148E2B2E9";
const PlayerSettingsCharacteristic: string = "60E869FA-84E5-4EE7-A58A-EB3640D13367";

const PhoneRemoteControlService: string = "B9653801-9A6B-4C53-A3E9-2EFE67C2C931";
const PhoneCommandCharacteristic: string = "544B8542-0C08-4009-B554-82A3708F3D8C";

export function ScanDevices(): void {
    devices = [];
    const scan = manager.startDeviceScan(null, {allowDuplicates: false}, (error, device) => {
        if (error) {
            console.log(error.message);
            return;
        }
        if (device != null && !devices.some(x => x.id === device.id)) {
            devices.push(device);
            console.log(`ID: ${device?.id} Name: ${device?.name}`);
        }
    }).then(async () => {
        await sleep(4000);
        await manager.stopDeviceScan();
        console.log("Scan finished");
        connectedDevice = await manager.connectToDevice(DeviceUUID);
        console.log(`Connected to device: ${DeviceUUID}`);
        await connectedDevice.discoverAllServicesAndCharacteristics();
    });
}

export async function GetDeviceFactoryIdentification(): Promise<void> {
    let characteristic = await connectedDevice.readCharacteristicForService(DeviceInformationService, DeviceFactoryIdentificationCharacteristic);
    console.log(`Raw value: ${characteristic.value}`);
    let result = base64ToBigEndianBytes(characteristic.value!);
    console.log(`Device Factory Identification: ${result}`);
}

export async function GetDeviceFirmwareInformation(): Promise<void> {
    let result = await connectedDevice.readCharacteristicForService(DeviceInformationService, DeviceFirmwareInformationCharacteristic);
    console.log(`Device Firmware Information: ${result.value}`);
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function base64ToBigEndianBytes(base64: string): Uint8Array {
    const buffer = Buffer.from(base64, 'base64');
    console.log(buffer);
    const byteArray = new Uint8Array(buffer);
    return byteArray.reverse();
}