declare global {
    interface Wallet {
        request: (args: { method: string; params?: any[] }) => Promise<any>;
    }
    const wallet: Wallet;
}
