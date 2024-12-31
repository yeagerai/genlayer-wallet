import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';

const RPC_URL = "http://127.0.0.1:4000/api";

async function forwardToRpc(method: string, params: any[]): Promise<any> {
    const response = await fetch(RPC_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: Date.now(),
            method,
            params,
        }),
    });

    const result = await response.json();

    if (result.error) {
        throw new Error(result.error.message);
    }

    return result.result;
}

export const onRpcRequest: OnRpcRequestHandler = async ({
    origin,
    request,
}) => {
    let { method, params } = request;
    params = params || []

    switch (method) {
        case "eth_sendTransaction": {
            //@ts-ignore
            const transaction = params[0];

            //@ts-ignore
            const signedTransaction = await window.ethereum.request({
                method: "eth_sign",
                params: [transaction.from, transaction.data],
            });

            // Forward the signed transaction to the RPC
            return await forwardToRpc("eth_sendRawTransaction", [signedTransaction]);
        }

        default: {
            //@ts-ignore
            return await forwardToRpc(method, params || []);
        }
    }
};
