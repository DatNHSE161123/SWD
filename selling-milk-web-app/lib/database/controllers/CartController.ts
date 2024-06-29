import Cart, { ICart } from "../models/Cart";
import Product, { IProduct } from "../models/Product";

export const addToCart = async (userId: string, productId: string, quantity: number): Promise<ICart> => {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Sản phẩm không tồn tại');
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const itemIndex = cart.items.findIndex((item: any) => item.product.toString() === productId);

        if (itemIndex > -1) {
            if ((quantity + (cart.items[itemIndex]?.quantity || 0)) > product.totalStock) {
                throw new Error(`Không thể thêm nhiều hơn ${product.totalStock} số lượng của sản phẩm ${product.name} vào giỏ hàng.`);
            }

            cart.items[itemIndex].quantity += quantity;
        } else {
            if (quantity > product.totalStock) {
                throw new Error(`Không thể thêm nhiều hơn ${product.totalStock} số lượng của sản phẩm ${product.name} vào giỏ hàng.`);
            }
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();

        return cart;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getCartByUserId = async (userId: string): Promise<ICart | null> => {
    try {
        const cart = await Cart.findOne({ user: userId }).populate({
            path: 'items.product',
            populate: {
                path: 'stocks',
            }
        });

        if (!cart) {
            throw new Error('Không tìm thấy giỏ hàng');
        }

        let isUpdated = false;

        for (const item of cart.items) {
            const product = item.product as IProduct;
            if (item.quantity > product.totalStock) {
                item.quantity = product.totalStock;
                isUpdated = true;
            }
        }

        if (isUpdated) {
            await cart.save();
        }

        return cart;
    } catch (error: any) {
        throw new Error(error.message);
    }
};


export const updateCartQuantity = async (cartId: string, productId: string, quantity: number): Promise<ICart | null> => {
    try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            throw new Error('Giỏ hàng không tồn tại');
        }

        const itemIndex = cart.items.findIndex((item: any) => item.product.toString() === productId);
        if (itemIndex === -1) {
            throw new Error('Sản phẩm không tồn tại trong giỏ hàng');
        }

        const product = await Product.findById(productId);
        if (quantity > product.totalStock) {
            throw new Error(`Không thể thêm nhiều hơn ${product.totalStock} sô lương của sản phẩm.`);
        }

        cart.items[itemIndex].quantity = quantity;

        await cart.save();

        return cart;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const removeProductFromCart = async (userId: string, productId: string): Promise<ICart | null> => {
    try {
        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            { $pull: { items: { product: productId } } },
            { new: true }
        );
        return cart;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
