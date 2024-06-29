import { create } from 'zustand';

interface PaymentModalStore {
    isOpen: boolean;
    userId: string | null;
    onOpen: (userId: string) => void;
    onClose: () => void;
}

interface TransactionModalStore {
    isOpen: boolean;
    transactionId: string | null;
    onOpen: (transactionId: string) => void;
    onClose: () => void;
}

export const usePaymentModal = create<PaymentModalStore>((set) => ({
    isOpen: false,
    userId: null,
    onOpen: (userId) => set({ isOpen: true, userId }),
    onClose: () => set({ isOpen: false, userId: null })
}))

export const useCanceledModal = create<TransactionModalStore>((set) => ({
    isOpen: false,
    transactionId: null,
    onOpen: (transactionId) => set({ isOpen: true, transactionId }),
    onClose: () => set({ isOpen: false, transactionId: null })
}))

export const useShippingModal = create<TransactionModalStore>((set) => ({
    isOpen: false,
    transactionId: null,
    onOpen: (transactionId) => set({ isOpen: true, transactionId }),
    onClose: () => set({ isOpen: false, transactionId: null })
}))

export const useDeliveredModal = create<TransactionModalStore>((set) => ({
    isOpen: false,
    transactionId: null,
    onOpen: (transactionId) => set({ isOpen: true, transactionId }),
    onClose: () => set({ isOpen: false, transactionId: null })
}))
