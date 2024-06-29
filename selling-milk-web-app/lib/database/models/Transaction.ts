import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  user: mongoose.Types.ObjectId;
  products: { product: mongoose.Types.ObjectId; quantity: number; stock: mongoose.Types.ObjectId }[];
  totalPrice: number;
  status: 'await' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  estimatedDelivery?: Date;
  reason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema: Schema<ITransaction> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      stock: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock', required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['await', 'confirmed', 'shipping', 'delivered', 'cancelled'], required: true, default: 'await' },
  estimatedDelivery: { type: Date },
  reason: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
