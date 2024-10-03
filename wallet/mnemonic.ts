import {wordlists} from "bip39";
import { randomBytes } from 'crypto';

/**
 * 生成随机熵
 * @param bitsNumber 助记词所对应的位数， 12、15、18、21 或 24 个单词对应bitsNumber值分别为：
 * 128, 160, 192, 224, 256
 */
export function generateEntropy(bitsNumber: number): Uint8Array {
    // 是否为期望的助记词长度
    if (![128, 160, 192, 224, 256].includes(bitsNumber)) {
        throw new Error("Invalid entropy length. Choose 128, 160, 192, 224, or 256 bits.");
    }

    const entropyBytes: number = bitsNumber / 8;
    const randomBytesArray: Uint8Array = randomBytes(entropyBytes);
    return randomBytesArray;
}
