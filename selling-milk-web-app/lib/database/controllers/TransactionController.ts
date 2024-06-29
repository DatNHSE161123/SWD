import Cart from '../models/Cart';
import Product from '../models/Product';
import Transaction, { ITransaction } from '../models/Transaction';
import Wallet from '../models/Wallet';
import User from '../models/User';
import Stock from '../models/Stock';

export const processPayment = async (userId: string) => {
    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) throw new Error('Không tìm thấy giỏ hàng');

        const buyerWallet = await Wallet.findOne({ user: userId });
        if (!buyerWallet) throw new Error('Ví tiền không tồn tại');

        const user = await User.findById(userId);
        if (!user || !user.address) throw new Error('Người dùng thiếu địa chỉ');

        let totalPrice = 0;
        const sellerWallets: { [key: string]: typeof Wallet.prototype } = {};

        for (const item of cart.items) {
            totalPrice += item.product.price * item.quantity * (1 - (item.product.discount / 100));
            if (!sellerWallets[item.product.user]) {
                sellerWallets[item.product.user] = await Wallet.findOne({ user: item.product.user });
            }
        }

        if (buyerWallet.balance < totalPrice) throw new Error('Không đủ tiền');

        const transactionProducts = [];
        const transaction = new Transaction({
            user: userId,
            products: [],
            totalPrice,
            status: 'await',
        });

        for (const item of cart.items) {
            const product = await Product.findById(item.product._id);
            if (!product) throw new Error('Sản phẩm không tồn tại');

            if (product.totalStock < item.quantity) {
                throw new Error('Không đủ sản phẩm');
            }

            const stocks = await Stock.find({ product: product._id }).sort({ expiryAt: 1 });
            let remainingQuantity = item.quantity;

            for (const stock of stocks) {
                if (remainingQuantity <= 0) break;
                const quantityToDeduct = Math.min(stock.quantity, remainingQuantity);
                stock.quantity -= quantityToDeduct;
                remainingQuantity -= quantityToDeduct;

                await stock.save();

                transactionProducts.push({ product: item.product._id, quantity: quantityToDeduct, stock: stock._id });
            }

            if (remainingQuantity > 0) throw new Error('Không đủ sản phẩm');

            product.sale += item.quantity;
            product.totalStock -= item.quantity;
            await product.save();

            const amount = item.product.price * item.quantity * (1 - (item.product.discount / 100));
            const sellerWallet = sellerWallets[product.user];
            sellerWallet.history.push({
                transaction: transaction._id,
                amount,
                action: 'receive',
                status: 'success',
            });
            sellerWallet.balance += amount;
            await sellerWallet.save();
        }

        transaction.products = transactionProducts;
        await transaction.save();

        buyerWallet.history.push({
            transaction: transaction._id,
            amount: totalPrice,
            action: 'payment',
            status: 'success',
        });

        buyerWallet.balance -= totalPrice;
        cart.items = [];

        await buyerWallet.save();
        await cart.save();

        return transaction;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getAllTransactions = async (): Promise<ITransaction[]> => {
    try {
        const transactions = await Transaction.find().populate('user').populate('products.product').sort({ createdAt: -1 });
        return transactions;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getTransactionByUser = async (userId: string): Promise<ITransaction[]> => {
    try {
        const transactions = await Transaction.find({ user: userId })
            .populate('user')
            .populate('products.product')
            .sort({ createdAt: -1 });
        return transactions;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const confirmTransaction = async (transactionId: string) => {
    try {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) throw new Error('Giao dịch không tồn tại');

        if (transaction.status !== 'await') throw new Error('Giao dịch phải ở trạng thái: chờ đợi');

        transaction.status = 'confirmed';
        await transaction.save();

        return transaction;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const shipTransaction = async (transactionId: string, shippingHours: number) => {
    try {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) throw new Error('Giao dịch không tồn tại');

        if (transaction.status !== 'confirmed') throw new Error('Giao dịch phải ở trạng thái: Đã xác nhận');

        transaction.status = 'shipping';
        transaction.estimatedDelivery = new Date(transaction.createdAt.getTime() + shippingHours * 60 * 60 * 1000);
        await transaction.save();

        return transaction;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const deliverTransaction = async (transactionId: string) => {
    try {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) throw new Error('Giao dịch không tồn tại');

        if (transaction.status !== 'shipping') throw new Error('Giao dịch phải ở trạng thái: Đang giao hàng');

        transaction.status = 'delivered';
        await transaction.save();

        return transaction;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const cancelTransaction = async (transactionId: string, reason: string) => {
    try {
        const transaction = await Transaction.findById(transactionId).populate('products.product');
        if (!transaction) throw new Error('Giao dịch không tồn tại');

        if (transaction.status === 'shipping' || transaction.status === 'delivered') {
            throw new Error('Giao dịch chỉ được hủy trước khi giao hàng');
        }

        transaction.status = 'cancelled';
        transaction.reason = reason;
        await transaction.save();

        const buyerWallet = await Wallet.findOne({ user: transaction.user });
        if (!buyerWallet) throw new Error('Ví tiền không tồn tại');

        buyerWallet.history.push({
            transaction: transaction._id,
            amount: transaction.totalPrice,
            action: 'refund',
            status: 'success',
        });

        buyerWallet.balance += transaction.totalPrice;
        await buyerWallet.save();

        for (const item of transaction.products) {
            const stock = await Stock.findById(item.stock);
            if (!stock) throw new Error('Kho hàng không tồn tại');
            stock.quantity += item.quantity;
            await stock.save();

            const product = await Product.findById(item.product._id);
            if (!product) throw new Error('Sản phẩm không tồn tại');
            product.sale -= item.quantity;
            product.totalStock += item.quantity;
            await product.save();

            const sellerWallet = await Wallet.findOne({ user: item.product.user });
            if (!sellerWallet) throw new Error('Ví tiền không tồn tại');
            const amount = item.product.price * item.quantity * (1 - (item.product.discount / 100));
            sellerWallet.history.push({
                transaction: transaction._id,
                amount,
                action: 'deduct',
                status: 'success',
            });
            sellerWallet.balance -= amount;
            await sellerWallet.save();
        }

        return transaction;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
