import connectDB from '@/lib/database/mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { registerUser } from '@/lib/database/controllers/UserController';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, email, password, phone, avatar, role, address } = req.body;
    try {
      const user = await registerUser(username, email, password, phone, avatar, role, address)

      res.status(200).json({ data: 'Success', user, message: "Tạo tài khoản thành công" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Phương thức không đúng' });
  }
}
