import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/database/mongoose';
import { updateCartQuantity } from '@/lib/database/controllers/CartController';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { cartId, productId, quantity } = req.body;

        try {
            const updatedCart = await updateCartQuantity(cartId as string, productId, quantity);

            res.status(200).json({ data: updatedCart });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Phương thức không đúng' });
    }
}
