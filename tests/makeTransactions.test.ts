import signTransactions from "../wallet/makeTransactions";
import EthereumRpcClient from "../wallet/requestEthRpc";

// privateKey: string, fromAddress: string, toAddress: string, rpcURL: string, ethNum: number, nonce:bigint, chainId: number = 1

const privateKey:string = "0x4d194ece4504f15c14bb962ae7320c0aa3055e4777c8c590b3130b70247c193a";
const fromAddress:string = "0xb8065eABE90A1511561139fE14a1322bEdA31434"
const toAddress:string = "0xC3B991ecD6079aCC8493b79aC7691c64Ce09EAC2"
const rpcUrl:string = "https://eth.llamarpc.com"


describe("MakeTransactions", () => {
    test("正常构建交易", async ()=>{
        // 获取nonce
        const rpcClient = new EthereumRpcClient(rpcUrl);
        const address: string = "0xC3B991ecD6079aCC8493b79aC7691c64Ce09EAC2";
        const nonce = await rpcClient.getTransactionCount(address);
        const noceNum = BigInt(nonce);
        console.log(noceNum)

        const signedTxTraditional = await signTransactions(privateKey, fromAddress, toAddress,rpcUrl, 0.001, noceNum, 1)
        console.log(signedTxTraditional.signedTxTraditional)
    })
})