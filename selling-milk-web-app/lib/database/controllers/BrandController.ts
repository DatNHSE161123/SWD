import Brand, { IBrand } from "../models/Brand";

export const getAllBrands = async (): Promise<IBrand[]> => {
    try {
        const brands = await Brand.find();
        return brands;
    } catch (error: any) {
        throw new Error(error.message);
    }
};