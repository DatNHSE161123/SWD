import { Product } from "./product";

export interface AddToCartData {
    userId: string;
    productId: string;
    quantity: number;
}

export interface CartItem {
    _id: string;
    items: {
        product: Product;
        quantity: number;
        _id: string;
    }[]
}

export interface CartData {
    product: Product;
    quantity: number;
    _id: string;
    userId: string;
}

export interface CartActionProps {
    _id: string;
    total: number;
    countProduct: number;
    address?: string | null;
    phone?: string | null;
}