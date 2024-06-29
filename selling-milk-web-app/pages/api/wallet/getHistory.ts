import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/database/mongoose';
import { getWalletHistory } from '@/lib/database/controllers/WalletController';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { userId } = req.query;
        try {
            const history = await getWalletHistory(userId as string);
            res.status(200).json(history);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Phương thức không đúng' });
    }
}
