import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/database/mongoose';
import { postComment } from '@/lib/database/controllers/CommentController';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { productId, userId, content, packaging, quality } = req.body;
            const comment = await postComment(productId, userId, content, packaging, quality);

            res.status(200).json({ data: comment, message: 'Bình luận thành công' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Phương thức không đúng' });
    }
}
