import { Buffer } from "buffer";

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const base64ToByteArray = (base64: string): Uint8Array =>
    new Uint8Array(Buffer.from(base64, "base64"));

export const base64ToHex = (base64String: string): string =>
    Buffer.from(base64String, "base64").toString("hex").toUpperCase();

export const hexToBase64 = (hexString: string): string =>
    Buffer.from(hexString, "hex").toString("base64");