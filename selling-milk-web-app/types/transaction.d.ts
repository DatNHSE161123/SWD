export interface TransactionDetail {
    _id: string
    user: {
        _id: string
        email: string
        username: string
        phone: number
        address: string
    }
    products: {
        product: {
            _id: string
            name: string
            price: number
            imageUrl: string
            discount: number
        }
        quantity: number
    }[]
    totalPrice: number
    status?: string
    reason?: string
    estimatedDelivery: string
    createdAt: string
}

export interface CanceledTransaction {
    reason: string
}

export interface ShippingTransaction {
    shippingHour: number
}