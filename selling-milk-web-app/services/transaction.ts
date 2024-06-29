import axiosInstance from '@/lib/axios';

export const paymentService = async (userId: string) => {
    try {
        const response = await axiosInstance.post('/transaction', { userId });
        return response.data;
    } catch (error: any) {
        if (error && error.response) {
            return error.response.data;
        }
    }
};

export const confirmedService = async (transactionId: string) => {
    try {
        const response = await axiosInstance.put(`/transaction/confirmed?transactionId=${transactionId}`);
        return response.data;
    } catch (error: any) {
        if (error && error.response) {
            return error.response.data;
        }
    }
}

export const shippingService = async (transactionId: string, shippingHours: number) => {
    try {
        const response = await axiosInstance.put(`/transaction/shipping?transactionId=${transactionId}`, { shippingHours });
        return response.data;
    } catch (error: any) {
        if (error && error.response) {
            return error.response.data;
        }
    }
}

export const deliveredService = async (transactionId: string) => {
    try {
        const response = await axiosInstance.put(`/transaction/delivered?transactionId=${transactionId}`);
        return response.data;
    } catch (error: any) {
        if (error && error.response) {
            return error.response.data;
        }
    }
}

export const canceledService = async (transactionId: string, reason: string) => {
    try {
        const response = await axiosInstance.put(`/transaction/canceled?transactionId=${transactionId}`, { reason });
        return response.data;
    } catch (error: any) {
        if (error && error.response) {
            return error.response.data;
        }
    }
}