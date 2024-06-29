export interface LoginFormData {
    email: string 
    password: string 
}

export interface RegisterFormData {
    username: string 
    email: string 
    phone: string 
    password: string 
    confirmPassword: string 
    avatar?: string
    role?: string
    address: string
}

interface TableUserProps {
    listUser: ManageUserData[],
    currentPage: number,
    itemsPerPage: number,
}
interface ManageUserData {
    email: string
    username: string
    phone: string
    address: string
    role: string
}

export interface UserProfileSettingForm {
    username: string 
    phone: string 
    address: string 
    avatar: string
}

export interface UserProfileSettingFormData {
    userId: string
    username: string 
    phone: string 
    address: string 
    avatar: string
}