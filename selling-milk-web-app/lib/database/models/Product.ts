import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  origin: string;
  savour: string;
  from: string;
  brand: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  imageUrl: string;
  imageUrls: string[];
  stocks: mongoose.Types.ObjectId[];
  totalStock: number;
  sale: number;
  discount: number;
  comments: mongoose.Types.ObjectId[];
  isDelete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true }, 
  price: { type: Number, required: true },
  description: { type: String, required: true },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  savour: { type: String, required: true },
  origin: { type: String, required: true },
  from: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imageUrls: { type: [String], required: true },
  stocks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stock' }],
  totalStock: { type: Number, default: 0 },
  sale: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  isDelete: { type: Boolean, require: true, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
