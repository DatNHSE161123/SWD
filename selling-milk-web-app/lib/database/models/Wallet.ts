import mongoose, { Document, Schema } from 'mongoose';

export interface ITransactionHistory {
  transaction: mongoose.Types.ObjectId;
  amount: number;
  date: Date;
  action: 'deposit' | 'withdraw' | 'payment' | 'receive' | 'refund' | 'deduct';
  status: 'success' | 'failure';
}

export interface IWallet extends Document {
  user: mongoose.Types.ObjectId;
  balance: number;
  history: ITransactionHistory[];
}

const TransactionHistorySchema: Schema<ITransactionHistory> = new Schema({
  transaction: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  action: { type: String, enum: ['deposit', 'withdraw', 'payment', 'receive', 'refund', 'deduct'], required: true },
  status: { type: String, enum: ['success', 'failure'], required: true },
});

const WalletSchema: Schema<IWallet> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, required: true, default: 0 },
  history: [TransactionHistorySchema],
});

WalletSchema.methods.calculateBalance = async function () {
  let balance = 0;
  this.history.forEach((transaction: ITransactionHistory) => {
    if (transaction.status === 'success') {
      switch (transaction.action) {
        case 'deposit':
          balance += transaction.amount;
          break;
        case 'receive':
          balance += transaction.amount;
          break;
        case 'withdraw':
          balance -= transaction.amount;
          break;
        case 'payment':
          balance -= transaction.amount;
          break;
        case 'refund':
          balance += transaction.amount;
          break;
        case 'deduct':
          balance -= transaction.amount;
          break;
        default:
          break;
      }
    }
  });
  this.balance = balance;
  await this.save();
};

const Wallet = mongoose.models.Wallet || mongoose.model<IWallet>('Wallet', WalletSchema);

export default Wallet;
