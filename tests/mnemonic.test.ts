// tests/mnemonic.test.ts
import { generateEntropy } from '../wallet/mnemonic';

describe('generateEntropy', () => {
    test('should generate 128 bits of entropy', () => {
        const entropy = generateEntropy(128);
        expect(entropy.length).toBe(16); // 128 bits = 16 bytes
    });

    test('should generate 256 bits of entropy', () => {
        const entropy = generateEntropy(256);
        expect(entropy.length).toBe(32); // 256 bits = 32 bytes
    });

    test('should throw error for invalid bitsNumber', () => {
        expect(() => generateEntropy(100)).toThrow("Invalid entropy length. Choose 128, 160, 192, 224, or 256 bits.");
        expect(() => generateEntropy(300)).toThrow("Invalid entropy length. Choose 128, 160, 192, 224, or 256 bits.");
    });
});
