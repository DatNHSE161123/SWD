import { NextApiRequest, NextApiResponse } from 'next';
import { getFilteredWalletHistory } from '@/lib/database/controllers/WalletController';

const walletHistoryHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { userId, startDate, endDate } = req.query;

        if (!userId || !startDate || !endDate) {
            return res.status(400).json({ message: 'Thiếu dữ liệu cần thiết' });
        }

        const start = new Date(startDate as string);
        const end = new Date(endDate as string);

        const history = await getFilteredWalletHistory(userId as string, start, end);

        return res.status(200).json(history);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export default walletHistoryHandler;
