// 引入所需的库
import bip39 from "bip39";


const { hdkey } = require('ethereumjs-wallet');
const { bufferToHex, toChecksumAddress } = require('ethereumjs-util');

// 生成 HD ETH 钱包
export async function generateHDWalletFromMnemonic(mnemonic:string, ) {
    try {
        // 1. 从助记词生成种子
        const seed = await bip39.mnemonicToSeed(mnemonic);

        // 2. 从种子生成根密钥
        const root = hdkey.fromMasterSeed(seed);

        // 3. 从根密钥生成以太坊密钥对
        // 生成第一个钱包地址
        const path = "m/44'/60'/0'/0/0"; // BIP44路径
        const child = root.derivePath(path);
        const wallet = child.getWallet();
        const privateKey = wallet.getPrivateKey();
        const publicKey = wallet.getPublicKey();
        const address = wallet.getAddress();
        const addressHex = bufferToHex(address);

        // 4. 打印生成的密钥对和地址
        console.log("助记词为：", mnemonic);
        console.log('私钥:', bufferToHex(privateKey)); // 打印私钥
        console.log('公钥:', bufferToHex(publicKey)); // 打印公钥
        console.log('以太坊地址:', toChecksumAddress(addressHex)); // 打印以太坊地址
    } catch (error) {
        console.error('生成钱包时出错:', error);
    }
}


