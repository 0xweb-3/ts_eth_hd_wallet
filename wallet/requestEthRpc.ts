import axios from 'axios';
import {JsonRpcRequest} from "./types/requestEthTypes";

class EthereumRpcClient {
    private endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    public async sendRpcRequest(method: string, params: any[], id: number) {
        const requestData: JsonRpcRequest = {
            jsonrpc: '2.0',
            method,
            params,
            id,
        };

        try {
            const response = await axios.post(this.endpoint, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data.result;
        } catch (error) {
            console.error(`Error in RPC request: ${error}`);
            throw error;
        }
    }

    public async getTransactionCount(address: string, block: string = 'latest') {
        return this.sendRpcRequest('eth_getTransactionCount', [address, block], 2);
    }

    public async getGasPrice() {
        return this.sendRpcRequest('eth_gasPrice', [], 3);
    }
}

export default EthereumRpcClient;
