import auth from '@/lib/middleware/auth';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'Bảo vệ điều hướng' });
};

export default auth(handler);
