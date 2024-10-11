import EthereumRpcClient from "../wallet/requestEthRpc";

describe("Ethereum RPC Client", () => {
    test("获取noce", async () => {
        const rpcClient = new EthereumRpcClient('https://eth.llamarpc.com');
        const address: string = "0xC3B991ecD6079aCC8493b79aC7691c64Ce09EAC2";
        const nonce = await rpcClient.getTransactionCount(address);
        const noceNum: number = parseInt(nonce, 16);
        console.log(noceNum)
    })
})

