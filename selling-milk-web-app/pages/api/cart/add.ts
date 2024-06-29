import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/database/mongoose';
import { addToCart } from '@/lib/database/controllers/CartController';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { userId, productId, quantity } = req.body;
            const cart = await addToCart(userId, productId, quantity)
            res.status(200).json({ data: cart, message: 'Thêm sản phẩm vào giỏ hàng thành công' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Phương thức không đúng' });
    }
}
