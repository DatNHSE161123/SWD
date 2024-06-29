import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/database/mongoose';
import { updateProductDiscount } from '@/lib/database/controllers/ProductController';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        try {
            const { productId, newDiscount } = req.body
            const product = await updateProductDiscount(productId as string, newDiscount);
            res.status(200).json({ data: product, message: "Cập nhật thành công" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Phương thức không đúng' });
    }
}
