// signTransactions.js
import Web3 from 'web3';
import {TxTraditional, TxEIP1559} from "./types/transactionsTypes";

async function signTransactions(privateKey: string, fromAddress: string, toAddress: string, rpcURL: string, ethNum: number, nonce:bigint, chainId: number = 1) {
    const web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));
    // 直接通过包中的方法获取nonce
    // const nonce = await web3.eth.getTransactionCount(fromAddress);

    // 传统交易
    const txTraditional: TxTraditional = {
        from: fromAddress,
        to: toAddress,
        value: web3.utils.toWei(ethNum, 'ether'),
        gas: 21000,
        gasPrice: web3.utils.toWei('20', 'gwei'),
        nonce: nonce
    };

    // EIP-1559 交易
    const txEIP1559: TxEIP1559 = {
        from: fromAddress,
        to: toAddress,
        value: web3.utils.toWei(ethNum, 'ether'),
        gas: 21000,
        maxFeePerGas: web3.utils.toWei('20', 'gwei'),
        maxPriorityFeePerGas: web3.utils.toWei('2', 'gwei'),
        nonce: nonce,
        chainId: chainId // Mainnet
    };

    // 签名传统交易
    const signedTxTraditional = await web3.eth.accounts.signTransaction(txTraditional, privateKey);

    // 签名 EIP-1559 交易
    const signedTxEIP1559 = await web3.eth.accounts.signTransaction(txEIP1559, privateKey);

    return {signedTxTraditional, signedTxEIP1559};
}


export default signTransactions;