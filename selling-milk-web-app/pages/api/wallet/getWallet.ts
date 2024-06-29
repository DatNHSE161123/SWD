import { getWalletBalance } from '@/lib/database/controllers/WalletController';
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/database/mongoose';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { userId } = req.query;

        try {
            const balance = await getWalletBalance(userId as string);
            res.status(200).json({ balance: balance });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Phương thức không đúng' });
    }
}
