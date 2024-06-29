import { create } from 'zustand';

interface ProductModalStore {
    isOpen: boolean;
    productId: string | null;
    onOpen: (productId: string) => void;
    onClose: () => void;
}

export const useDiscountModal = create<ProductModalStore>((set) => ({
    isOpen: false,
    productId: null,
    onOpen: (productId) => set({ isOpen: true, productId }),
    onClose: () => set({ isOpen: false, productId: null })
}))

export const useDeleteProductModal = create<ProductModalStore>((set) => ({
    isOpen: false,
    productId: null,
    onOpen: (productId) => set({ isOpen: true, productId }),
    onClose: () => set({ isOpen: false, productId: null })
}))