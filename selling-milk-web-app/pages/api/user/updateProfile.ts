import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/database/mongoose';
import { updateUser } from '@/lib/database/controllers/UserController';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        try {
            const { userId, username, phone, address, avatar } = req.body
            const user = await updateUser(userId, username, phone, address, avatar);
            res.status(200).json({ data: user, message: "Cập nhật hồ sơ thành công" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Phương thức không đúng' });
    }
}
