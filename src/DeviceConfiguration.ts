import {Buffer} from "buffer";

export const DeviceName: string = "Furunculo";

export const Service1: string = "812B5541-3E76-44AC-A119-27EADFB48B4F";
export const DeviceFactoryIdentificationCharacteristic: string = "FE8DF3D7-807A-4514-993F-146ED5B76E32";
export const DeviceFirmwareInformationCharacteristic: string = "3E240DAD-B045-434F-A4E1-F022BBC4F767";

export const Service2: string = "FE1637F9-190C-411A-B1BD-ACFDC391C9F3";
export const DeviceSettingsCharacteristic: string = "2EDF6646-F783-4FDC-9845-FA0D9E3D8807";
export const CarSettingsCharacteristic: string = "106FA464-71FB-41FF-81B3-5A1148E2B2E9";
export const PlayerSettingsCharacteristic: string = "60E869FA-84E5-4EE7-A58A-EB3640D13367";

export const Service3: string = "B9653801-9A6B-4C53-A3E9-2EFE67C2C931";
export const PhoneCommandCharacteristic: string = "544B8542-0C08-4009-B554-82A3708F3D8C";

const UnlockKeyString: string = "\0Vamos ficar ricos!";
const paddedUnlockKeyString: string = UnlockKeyString.padEnd(33, "\0");
export const UnlockKey: string = Buffer.from(paddedUnlockKeyString, "ascii").toString("base64");