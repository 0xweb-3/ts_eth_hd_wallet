import {generateHDWalletFromMnemonic} from "../wallet/makeEthWallet";

const mnemonicStr: string = "guess category verb rebuild amateur excite fire add bench head blue vital race average swallow material brave spoon museum also mirror lake supreme awful";

describe('generateHDWalletFromMnemonic', () => {
    test("生成HD钱包 - 正常使用", async () => {
        // 调用函数并等待结果
        const walletInfo = await generateHDWalletFromMnemonic(mnemonicStr, 0);

        // 检查返回值是否匹配预期
        expect(walletInfo.mnemonic).toBe(mnemonicStr); // 助记词应该和输入的一致
        expect(walletInfo.privateKey).toBeDefined(); // 私钥应该存在
        expect(walletInfo.publicKey).toBeDefined();  // 公钥应该存在
        expect(walletInfo.address).toBeDefined();    // 地址应该存在

        // 验证地址格式
        expect(walletInfo.address).toMatch(/^0x[a-fA-F0-9]{40}$/); // 地址应该符合以太坊地址格式
        console.log(walletInfo)
    });
});
