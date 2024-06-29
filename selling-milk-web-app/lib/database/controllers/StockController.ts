import Product from '../models/Product';
import Stock, { IStock } from '../models/Stock';

export const getAllStocks = async (productId: string): Promise<IStock[]> => {
    try {
        const stocks = await Stock.find({ product: productId }).populate('product');

        return stocks;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const addStockToProduct = async (productId: string, quantity: number, expiry: number, productionDate: string): Promise<IStock> => {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Sản phẩm không tồn tại');
        }

        const parsedProductionDate = new Date(productionDate);
        const expiryAt = new Date(parsedProductionDate.getTime() + expiry * 30 * 24 * 60 * 60 * 1000);

        const stock = new Stock({
            product: productId,
            quantity,
            productionDate: parsedProductionDate,
            expiryAt: expiryAt,
        });

        await stock.save();

        product.totalStock += quantity;
        product.updatedAt = new Date();
        product.stocks.push(stock._id)
        await product.save();

        return stock;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const deleteStock = async (stockId: string): Promise<void> => {
    try {
        const stock = await Stock.findById(stockId);
        if (!stock) {
            throw new Error('Stock not found');
        }

        if (stock.quantity) {
            throw new Error('Kho hàng đã hết hàng');
        }

        const product = await Product.findById(stock.product);
        if (!product) {
            throw new Error('Sản phẩm không tồn tại');
        }

        product.totalStock -= stock.quantity;
        product.updatedAt = new Date();
        await product.save();

        await Stock.findByIdAndDelete(stockId);

        await Stock.updateMany({ product: stock.product, _id: { $ne: stockId } });
    } catch (error: any) {
        throw new Error(error.message);
    }
};