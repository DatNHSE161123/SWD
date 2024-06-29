import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
    product: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    content: string;
    packaging: number;
    quality: number;
    createdAt: Date;
}

const CommentSchema: Schema = new Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    packaging: { type: Number, required: true },
    quality: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;
