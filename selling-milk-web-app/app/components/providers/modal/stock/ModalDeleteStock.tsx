"use client"

import { GlobalContext } from "@/contexts"
import { useContext } from "react"
import { LoadingActionWallet } from "../../loader"
import CustomModal from "../Modal"
import Button from "../../form/Button"
import { toast } from "react-toastify"
import { mutate } from "swr"
import { useDeleteStockModal } from "@/hooks/useStock"
import { deleteStockService } from "@/services/stock"

const ModalDeleteStock = () => {
    const { setIsLoadingModal, isLoadingModal } = useContext(GlobalContext) || {}

    const deleteStockModal = useDeleteStockModal()

    const handleDeleteStock = async () => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        if (deleteStockModal.stockId) {
            const res = await deleteStockService(deleteStockModal.stockId)

            if (res.data == null) {
                toast.error(res.message, {
                    position: "top-right"
                })
                if (setIsLoadingModal) setIsLoadingModal(false)
                return
            }

            toast.success("Xóa kho hàng thành công", {
                position: "top-right"
            })

            mutate(`/stock/${deleteStockModal.productId}`)
            deleteStockModal.onClose()
        }

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    if (isLoadingModal) {
        return <LoadingActionWallet loading={isLoadingModal} />
    }

    return (
        <CustomModal
            isOpen={deleteStockModal.isOpen}
            onClose={deleteStockModal.onClose}
            title="Bạn có chắc chắn muốn xóa kho hàng này không?"
            width="md:w-auto w-full"
            height="h-auto"
        >
            <form className="flex flex-col md:px-10 pb-5 gap-5 justify-center items-center">
                <div className="flex flex-row gap-5">
                    <Button
                        title="Không"
                        color="border-primary-blue-cus bg-white"
                        text="text-primary-blue-cus"
                        style="py-3 px-8"
                        onClick={deleteStockModal.onClose}
                    />
                    <Button
                        title="Có"
                        isHover={false}
                        style="py-3 px-8"
                        onClick={handleDeleteStock}
                    />
                </div>
            </form>
        </CustomModal>
    )
}

export default ModalDeleteStock