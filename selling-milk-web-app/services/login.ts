import axiosInstance from '@/lib/axios';
import { LoginFormData } from '@/types';

export const loginService = async (data: LoginFormData) => {
    try {
        const response = await axiosInstance.post('/login', data)

        return response.data
    } catch (error: any) {
        if (error && error.response) {
            return error.response.data
        }
    }
};
