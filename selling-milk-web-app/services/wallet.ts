import axiosInstance from '@/lib/axios';

export const depositService = async (userId: string, amount: number) => {
    try {
        const response = await axiosInstance.post('/wallet/deposit', { userId, amount });
        return response.data;
    } catch (error: any) {
        if (error && error.response) {
            return error.response.data;
        }
    }
};

export const withdrawService = async (userId: string, amount: number) => {
    try {
        const response = await axiosInstance.post('/wallet/withdraw', { userId, amount });
        return response.data;
    } catch (error: any) {
        if (error && error.response) {
            return error.response.data;
        }
    }
};