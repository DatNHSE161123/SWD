import { RegisterFormData } from '@/types'
import axiosInstance from '@/lib/axios';

const registerService = async (data: RegisterFormData) => {
    try {
        const response = await axiosInstance.post('/register', {
            username: data.username,
            phone: data.phone,
            email: data.email,
            password: data.password,
            reEnterPass: data.confirmPassword,
            avatar: "/images/avatar_1.jpg",
            role: "user",
            address: data.address
        })

        return response.data;

    } catch (error: any) {
        if (error && error.response) {
            return error.response.data
        }
    }
}

export default registerService