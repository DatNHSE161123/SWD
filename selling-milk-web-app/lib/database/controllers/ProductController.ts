import cloudinary from '@/lib/cloudinary';
import Brand from '../models/Brand';
import Product, { IProduct } from '../models/Product';
import Stock from '../models/Stock';

export const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    const products = await Product.find({ isDelete: false });
    return products;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getProductById = async (productId: string): Promise<IProduct | null> => {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const postProduct = async (name: string, price: number, description: string, origin: string, savour: string, from: string, brandName: string, imageUrls: string[], userId: string): Promise<IProduct | null> => {
  try {
    let brand = await Brand.findOne({ name: brandName });

    if (!brand) {
      brand = new Brand({ name: brandName });
      await brand.save();
    }

    const uploadedImages = [];

    for (let i = 0; i < imageUrls.length; i++) {
      const result = await cloudinary.uploader.upload(imageUrls[i], { folder: 'product-images/' });
      uploadedImages.push(result.secure_url);
    }

    const imageUrl = uploadedImages[0];

    let product = await Product.findOne({ name: new RegExp(`^${name}$`, 'i') });

    if (product) {
      if (product.isDelete) {
        product.isDelete = false;
        product.price = price;
        product.description = description;
        product.origin = origin;
        product.savour = savour;
        product.from = from;
        product.brand = brand._id;
        product.imageUrl = imageUrl;
        product.imageUrls = uploadedImages;
        product.user = userId;
      } else {
        throw new Error('Sản phẩm đã sớm tồn tại');
      }
    } else {
      product = new Product({
        name,
        price,
        description,
        origin,
        savour,
        from,
        brand: brand._id,
        imageUrl,
        imageUrls: uploadedImages,
        user: userId,
      });
    }

    await product.save();

    return product
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getProductsByNewest = async (): Promise<IProduct[]> => {
  try {
    const products = await Product.find({ isDelete: false, totalStock: { $gt: 0 } })
      .sort({ createdAt: -1 })
      .limit(12);

    return products;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getProductsByBestSale = async (): Promise<IProduct[]> => {
  try {
    const products = await Product.find({ isDelete: false, totalStock: { $gt: 0 } })
      .sort({ sale: -1 })
      .limit(12);

    return products;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getProductsByUpdated = async (): Promise<IProduct[]> => {
  try {
    const products = await Product.find({ isDelete: false, totalStock: { $gt: 0 } })
      .sort({ updatedAt: -1 })
      .limit(18);

    return products;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export interface IProductFilter {
  brandId?: string;
  sortBy?: 'price' | 'discount';
  order?: 'asc' | 'desc';
}

export const getFilteredProducts = async (filter: IProductFilter): Promise<IProduct[]> => {
  try {
    const { brandId, sortBy, order } = filter;

    const query: any = { isDelete: false };

    if (brandId) {
      query['brand'] = brandId;
    }

    let sort: any = {};
    if (sortBy) {
      sort[sortBy] = order === 'desc' ? -1 : 1;
    }

    const products = await Product.find(query)
      .sort(sort)
      .populate({
        path: 'stocks',
        match: { active: true, quantity: { $gt: 0 } },
      });

    const validProducts = products.filter(product => product.stocks.length > 0);
    return validProducts;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateProductDiscount = async (productId: string, newDiscount: number): Promise<IProduct | null> => {
  try {
    if (newDiscount < 0 || newDiscount > 100) {
      throw new Error('Giảm giá phải từ 1%-99%');
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { discount: newDiscount },
      { new: true }
    );

    if (!updatedProduct) {
      throw new Error('Sản phẩm không tồn tại');
    }

    return updatedProduct;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteProduct = async (productId: string): Promise<IProduct | null> => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { isDelete: true, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedProduct) {
      throw new Error('Sản phẩm không tồn tại');
    }

    const stocksToUpdate = await Stock.find({ product: productId });

    return updatedProduct;
  } catch (error: any) {
    throw new Error(error.message);
  }
};