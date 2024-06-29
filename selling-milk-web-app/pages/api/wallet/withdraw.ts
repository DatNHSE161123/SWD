import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/database/mongoose';
import { withdraw } from '@/lib/database/controllers/WalletController';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { userId, amount } = req.body;
        try {
            const wallet = await withdraw(userId, amount);
            res.status(200).json({ data: wallet, message: 'Rút tiền thành công' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Phương thức không đúng' });
    }
}
