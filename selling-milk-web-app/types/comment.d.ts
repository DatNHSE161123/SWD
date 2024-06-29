export interface CommentForm {
    productId?: string
    userId?: string
    content: string
    packaging: number
    quality: number
}

export interface CommentDetail {
    _id: string
    user: {
        username: string
        avatar: string
    }
    content: string
    packaging: number
    quality: number
    createdAt: string
}