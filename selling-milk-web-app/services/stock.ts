import axiosInstance from '@/lib/axios';

export const addStockToProductService = async (productId: string, quantity: number, expiry: number, productionDate: string) => {
    try {
        const response = await axiosInstance.post('/stock/addStock', { productId, quantity, expiry, productionDate });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        } else {
            throw new Error('Network error');
        }
    }
};

export const deleteStockService = async (stockId: string) => {
    try {
        const response = await axiosInstance.delete(`/stock/deleteStock?stockId=${stockId}`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        } else {
            throw new Error('Network error');
        }
    }
};

export const activateStockService = async (stockId: string) => {
    try {
        const response = await axiosInstance.put(`/stock/activeStock?stockId=${stockId}`,{
            active: true
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        } else {
            throw new Error('Network error');
        }
    }
};