// 传统交易
export interface TxTraditional {
    from: string;
    to: string;
    value: string;
    gas: number;
    gasPrice: string;
    nonce: bigint;
}

// EIP-1559 交易
export interface TxEIP1559 {
    from: string;
    to: string;
    value: string;
    gas: number;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
    nonce: bigint;
    chainId: number;
}