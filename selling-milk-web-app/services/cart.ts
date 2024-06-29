import axiosInstance from '@/lib/axios';
import { AddToCartData } from '@/types';

export const addToCart = async (data: AddToCartData) => {
    try {
        const response = await axiosInstance.post('/cart/add', data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        } else {
            throw new Error('Network error');
        }
    }
};

export const updateQuantity = async (cartId: string, productId: string, quantity: number) => {
    try {
        const response = await axiosInstance.put('/cart/updateQuantity', {
            cartId: cartId,
            productId: productId,
            quantity: quantity
        });

        return response.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        } else {
            throw new Error('Network error');
        }
    }
}

export const removeProductFromCartService = async (userId: string, productId: string) => {
    try {
        const response = await axiosInstance.delete('/cart/delete', {
            data: { userId, productId }
        });
        return response.data;
    } catch (error: any) {
        if (error && error.response) {
            return error.response.data;
        }
    }
};