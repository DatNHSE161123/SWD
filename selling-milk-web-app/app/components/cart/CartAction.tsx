import { usePaymentModal } from "@/hooks/useTransaction";
import { CartActionProps } from "@/types"
import { formatCurrency } from "@/utils/format"

const CartAction: React.FC<CartActionProps> = ({
    _id,
    total,
    countProduct,
    address,
    phone
}) => {
    const paymentModal = usePaymentModal()

    return (
        <section className="flex flex-col gap-3 bg-white border border-black border-opacity-10 py-3 px-8 rounded-sm shadow-sm">
            <div className="flex justify-end gap-2">
                <div className="text-lg">
                    Số điện thoại: {phone || ""}
                </div>
                <div className="border-l border-opacity-10" />
                <div className="text-lg">
                    Địa chỉ: {address || ""}
                </div>
            </div>
            <div className="flex flex-row justify-end items-center gap-3">
                <div className="text-lg">
                    Tổng sản phẩm thanh toán ({countProduct} sản phẩm):
                </div>
                <div className="text-primary-cus text-md text-3xl">
                    {formatCurrency(total)}
                </div>
                <button className="text-white bg-primary-cus hover:bg-red-500 py-2 px-10 text-md font-semibold" onClick={() => { if (_id) paymentModal.onOpen(_id) }}>
                    Mua Hàng
                </button>
            </div>
        </section>
    )
}

export default CartAction