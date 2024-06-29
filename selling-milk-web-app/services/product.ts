import axiosInstance from '@/lib/axios';
import { ProductFormData } from '@/types';

export const postProductService = async (data: ProductFormData) => {
    try {
        const response = await axiosInstance.post('/product/postProduct', {
            name: data.name,
            price: data.price,
            description: data.description,
            origin: data.origin,
            savour: data.savour,
            from: data.from,
            brandName: data.brand,
            imageUrls: data.imageUrls,
            userId: data.userId,
        })

        return response.data
    } catch (error: any) {
        if (error && error.response) {
            return error.response.data
        }
    }
};

export const updateDiscountService = async (productId: string, newDiscount: number) => {
    try {
        const response = await axiosInstance.put('/product/updateDiscount', {
            productId, newDiscount
        })

        return response.data
    } catch (error: any) {
        if (error && error.response) {
            return error.response.data
        }
    }
}

export const deleteProductService = async (productId: string) => {
    try {
        const response = await axiosInstance.put('/product/delete', {
            productId
        })

        return response.data
    } catch (error: any) {
        if (error && error.response) {
            return error.response.data
        }
    }
}