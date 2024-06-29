import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/database/mongoose';
import { postProduct } from '@/lib/database/controllers/ProductController';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, price, description, origin, savour, from, brandName, imageUrls, userId } = req.body;
      const product = await postProduct(name, price, description, origin, savour, from, brandName, imageUrls, userId);
      res.status(200).json({ data: product, message: 'Thêm sản phẩm thành công' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Phương thức không đúng' });
  }
}
