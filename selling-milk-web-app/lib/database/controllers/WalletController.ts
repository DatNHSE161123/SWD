import Wallet, { IWallet, ITransactionHistory } from '../models/Wallet';
import mongoose from 'mongoose';

export const deposit = async (userId: string, amount: number): Promise<IWallet | null> => {
    try {
        const wallet = await Wallet.findOne({ user: userId });
        if (!wallet) {
            throw new Error('Ví tiền không tồn tại');
        }

        const transaction = {
            transaction: new mongoose.Types.ObjectId(),
            amount,
            action: 'deposit',
            status: 'success',
        } as ITransactionHistory;

        wallet.balance += amount;
        wallet.history.push(transaction);

        await wallet.save();
        return wallet;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const withdraw = async (userId: string, amount: number): Promise<IWallet | null> => {
    try {
        const wallet = await Wallet.findOne({ user: userId });
        if (!wallet) {
            throw new Error('Ví tiền không tồn tại');
        }

        if (wallet.balance < amount) {
            const transaction = {
                transaction: new mongoose.Types.ObjectId(),
                amount,
                action: 'withdraw',
                status: 'failure',
            } as ITransactionHistory;

            wallet.history.push(transaction);
            await wallet.save();

            throw new Error('Không đủ tiền');
        }

        const transaction = {
            transaction: new mongoose.Types.ObjectId(),
            amount,
            action: 'withdraw',
            status: 'success',
        } as ITransactionHistory;

        wallet.balance -= amount;
        wallet.history.push(transaction);

        await wallet.save();
        return wallet;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getWalletBalance = async (userId: string): Promise<number> => {
    try {
        const wallet = await Wallet.findOne({ user: userId });
        if (!wallet) {
            throw new Error('Ví tiền không tồn tại');
        }
        await wallet.calculateBalance()
        return wallet.balance;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getWalletHistory = async (userId: string): Promise<ITransactionHistory[]> => {
    try {
        const wallet = await Wallet.findOne({ user: userId });
        if (!wallet) {
            throw new Error('Ví tiền không tồn tại');
        }
        return wallet.history;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getFilteredWalletHistory = async (userId: string, startDate: Date, endDate: Date): Promise<ITransactionHistory[]> => {
    try {
        if (!startDate || !endDate || startDate > endDate) {
            throw new Error('Phạm vi ngày không hợp lệ');
        }

        const wallet = await Wallet.findOne({ user: userId });
        
        if (!wallet) {
            throw new Error('Ví tiền không tồn tại');
        }

        const filteredHistory = wallet.history.filter((transaction: ITransactionHistory) => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= startDate && transactionDate <= endDate;
        });

        return filteredHistory;
    } catch (error: any) {
        throw new Error(error.message);
    }
};