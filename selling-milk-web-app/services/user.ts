import axiosInstance from '@/lib/axios';
import { UserProfileSettingFormData } from '@/types';

export const updateProfileService = async (data: UserProfileSettingFormData) => {
    try {
        const response = await axiosInstance.put('/user/updateProfile', {
            userId: data.userId,
            username: data.username,
            phone: data.phone,
            address: data.address,
            avatar: data.avatar
        })

        return response.data
    } catch (error: any) {
        if (error && error.response) {
            return error.response.data
        }
    }
};

export const getUserService = async ({ userId }: { userId: string }) => {
    try {
        const response = await axiosInstance.get(`/user?userId=${userId}`,)

        return response.data
    } catch (error: any) {
        if (error && error.response) {
            return error.response.data
        }
    }
}