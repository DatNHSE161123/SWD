import mongoose, { Document, Schema } from 'mongoose';

export interface IStock extends Document {
    product: mongoose.Types.ObjectId;
    quantity: number;
    productionDate: Date;
    createdAt: Date;
    updatedAt: Date;
    expiryAt: Date;
}

const StockSchema: Schema = new Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    productionDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    expiryAt: { type: Date, required: true },
});

const Stock = mongoose.models.Stock as mongoose.Model<IStock> || mongoose.model<IStock>('Stock', StockSchema);

export default Stock;