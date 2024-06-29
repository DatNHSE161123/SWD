import Comment, { IComment } from "../models/Comment";
import Transaction from "../models/Transaction";

export const postComment = async (productId: string, userId: string, content: string, packaging: number, quality: number): Promise<IComment> => {
    try {
        const transaction = await Transaction.findOne({ user: userId, 'products.product': productId, status: 'delivered' });
        if (!transaction) {
            throw new Error('Bạn cần mua sản phẩm này để được bình luận');
        }

        const newComment = new Comment({
            product: productId,
            user: userId,
            content,
            packaging,
            quality,
        });

        await newComment.save();

        return newComment
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getCommentsByProductId = async (productId: string): Promise<IComment[]> => {
    try {
        const comments = await Comment.find({ product: productId }).populate('user');
        return comments;
    } catch (error: any) {
        throw new Error(error.message);
    }
};