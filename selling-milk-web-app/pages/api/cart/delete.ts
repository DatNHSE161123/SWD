// pages/api/cart/delete.ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/database/mongoose';
import { removeProductFromCart } from '@/lib/database/controllers/CartController';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { userId, productId } = req.body;
        try {
            const cart = await removeProductFromCart(userId, productId);

            res.status(200).json({ data: "Success", message: 'Xóa sản phẩm khỏi giỏ hàng thành công' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Phương thức không đúng' });
    }
}
