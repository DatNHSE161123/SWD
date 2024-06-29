import { IProductFilter, getFilteredProducts } from '@/lib/database/controllers/ProductController';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const filter: IProductFilter = {
      brandId: req.query.brandId as string,
      sortBy: req.query.sortBy as 'price' | 'discount',
      order: req.query.order as 'asc' | 'desc',
    };

    const products = await getFilteredProducts(filter);
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
