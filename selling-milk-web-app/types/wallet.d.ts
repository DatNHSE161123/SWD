export interface WalletFromRecharge {
    amount: number
}

export interface WalletUserData {
    balance: number
}

export interface WalletFrom {
    bankName?: string
    accountName: string
    bankNumber: string
    amount: number
}

export interface HistoryTransactionData {
    amount: number
    action: string
    status: string
    date: string
}