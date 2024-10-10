// 引入所需的库
const bip39 = require("bip39");  // 确保使用 require 导入
import {WalletInfo} from "./types/walletTypes";  // 导入接口定义
import {hdkey} from "ethereumjs-wallet"
import {bufferToHex, toChecksumAddress} from "ethereumjs-util";

// 生成 HD ETH 钱包
export async function generateHDWalletFromMnemonic(mnemonic: string, index: number): Promise<WalletInfo> {
    try {
        // 1. 从助记词生成种子
        const seed: Buffer = await bip39.mnemonicToSeed(mnemonic);

        // 2. 从种子生成根密钥
        const root = hdkey.fromMasterSeed(seed);

        // 3. 从根密钥生成以太坊密钥对
        const path: string = `m/44'/60'/0'/0/${index}`; // BIP44路径

        const child = root.derivePath(path);
        const wallet = child.getWallet();
        const privateKey = wallet.getPrivateKey();
        const publicKey = wallet.getPublicKey();
        const address = wallet.getAddress();
        const addressHex = bufferToHex(address);

        // 4. 打印生成的密钥对和地址
        // console.log("助记词为：", mnemonic);
        // console.log('私钥:', bufferToHex(privateKey)); // 打印私钥
        // console.log('公钥:', bufferToHex(publicKey)); // 打印公钥
        // console.log('以太坊地址:', toChecksumAddress(addressHex)); // 打印以太坊地址

        const privateKeyStr: string = bufferToHex(privateKey)
        const publicKeyStr: string = bufferToHex(publicKey)
        const addressHexStr: string = toChecksumAddress(addressHex)

        return {address: addressHexStr, mnemonic: mnemonic, privateKey: privateKeyStr, publicKey: publicKeyStr}
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error generating wallet: ${error.message}`);
        } else {
            throw new Error("An unknown error occurred during wallet generation.");
        }
    }
}


