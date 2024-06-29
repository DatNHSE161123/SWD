import axiosInstance from '@/lib/axios';
import { CommentForm } from '@/types/comment';

export const postCommentService = async (data: CommentForm) => {
    try {
        const response = await axiosInstance.post('/comment/post', {
            productId: data.productId,
            userId: data.userId,
            content: data.content,
            packaging: data.packaging,
            quality: data.quality
        })

        return response.data
    } catch (error: any) {
        if (error && error.response) {
            return error.response.data
        }
    }
};
