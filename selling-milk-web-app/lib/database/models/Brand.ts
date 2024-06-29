import mongoose, { Document, Schema } from 'mongoose';

export interface IBrand extends Document {
  name: string;
}

const BrandSchema: Schema<IBrand> = new Schema({
  name: { type: String, required: true },
})

const Brand = mongoose.models.Brand || mongoose.model<IBrand>('Brand', BrandSchema);

export default Brand;
