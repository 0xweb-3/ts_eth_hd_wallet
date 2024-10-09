// tests/mnemonic.test.ts
import {generateMnemonic} from '../wallet/mnemonic';
import {validateMnemonic} from '../wallet/check_mnemonic';

describe('generateMnemonic', () => {
    test("正常助记词校验", async () => {
        const mnemonic: string = await generateMnemonic(256)
        console.log(mnemonic)
        const result: boolean = validateMnemonic(mnemonic)
        expect(result).toBe(true);
    })

    test("数量不对的助记词[23个单词的]", ()=>{
        const mnemonic:string ="art flat park rice weapon surround random taste weird rapid advance away sausage recall cute top dentist monitor melt belt daughter attend island"
        expect(() => validateMnemonic(mnemonic)).toThrow("Invalid number of words. Mnemonic should have 12, 15, 18, 21, or 24 words.");
    })

    test("存在单词不在词汇表中", ()=>{
        const mnemonic:string = "xinbl retire rough hint crucial mesh final armor tackle attract expose oval increase flock animal attitude because confirm smooth immense dignity annual oven style"
        expect(()=>validateMnemonic(mnemonic)).toThrow("Invalid word found in mnemonic: xinbl")
    })

    test("校验和不对", ()=>{
        const mnemonic:string = "stomach stomach price faint warrior pattern burden else ordinary suggest negative message welcome exhibit print carpet mother pilot rough narrow impact whip affair place"
        expect(()=>validateMnemonic(mnemonic)).toThrow("Checksum mismatch. Mnemonic is invalid.")
    })
})
