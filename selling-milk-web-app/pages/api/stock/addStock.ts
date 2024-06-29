import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/database/mongoose';
import { addStockToProduct } from '@/lib/database/controllers/StockController';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { quantity, expiry, productId, productionDate } = req.body;
            const newStock = await addStockToProduct(productId as string, quantity, expiry, productionDate);
            res.status(200).json({ data: newStock, message: 'Thêm kho hàng thành công' });
        }
        catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Phương thức không đúng' });
    }
}
