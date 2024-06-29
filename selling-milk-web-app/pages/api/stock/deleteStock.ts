import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/database/mongoose';
import { deleteStock } from '@/lib/database/controllers/StockController';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        try {
            const { stockId } = req.query;
            await deleteStock(stockId as string);
            res.status(200).json({ data: 'Success', message: 'Xóa kho hàng thành công' });
        }
        catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Phương thức không đúng' });
    }
}
