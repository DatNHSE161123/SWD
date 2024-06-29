export interface Product {
    _id: string;
    name?: string;
    price?: number;
    description?: string;
    origin?: string;
    savour?: string;
    expiry?: string;
    from?: string;
    brand?: string;
    imageUrl?: string;
    imageUrls?: string[];
    totalStock: number;
    stocks?: {
        _id: string;
        quantity: number
        expiryAt: string;
    }[];
    sale: number;
    discount: number;
    styleMargin?: boolean | true
}

export interface ProductDetailData {
    _id: string;
    name?: string;
    price?: number;
    description?: string;
    origin?: string;
    savour?: string;
    expiry?: string;
    from?: string;
    brand?: string;
    imageUrl?: string;
    imageUrls?: string[];
    totalStock: number;
    stocks?: {
        _id: string;
        quantity: number
        expiryAt: string;
    }[];
    sale: number;
    discount: number;
    styleMargin?: boolean | true
}

export interface ListProduct {
    list: Product[]
}

export interface ProductFormData {
    name: string;
    price: number;
    description: string;
    origin: string;
    savour: string;
    from: string;
    brand: string;
    imageUrls?: string[];
    userId?: string;
}

export interface TableProductProps {
    listProduct: ManageProductData[],
    currentPage: number,
    itemsPerPage: number,
}

export interface ManageProductData {
    _id: string
    name: string
    totalStock: number
    sale: string
    discount: string
    updatedAt: string
}

export interface DiscountProduct {
    amount: number
}