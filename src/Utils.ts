import {Buffer} from 'buffer';

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function base64ToByteArray(base64: string): Uint8Array {
    const buffer = Buffer.from(base64, 'base64');
    return new Uint8Array(buffer);
}

export function base64ToHex(base64String: string): string {
    const buffer = Buffer.from(base64String, 'base64');
    return buffer.toString('hex').toUpperCase();
}

export function hexToBase64(hexString: string): string {
    const buffer = Buffer.from(hexString, 'hex');
    return buffer.toString('base64');
}