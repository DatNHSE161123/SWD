"use client"

import { GlobalContext } from "@/contexts"
import { useContext } from "react"
import { LoadingActionWallet } from "../../loader"
import CustomModal from "../Modal"
import Button from "../../form/Button"
import { toast } from "react-toastify"
import { mutate } from "swr"
import { useActiveStockModal } from "@/hooks/useStock"
import { activateStockService } from "@/services/stock"

const ModalActiveStock = () => {
    const { setIsLoadingModal, isLoadingModal } = useContext(GlobalContext) || {}

    const activeStockModal = useActiveStockModal()

    const handleDeleteStock = async () => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        if (activeStockModal.stockId) {
            const res = await activateStockService(activeStockModal.stockId)

            if (res.data == null) {
                toast.error(res.message, {
                    position: "top-right"
                })
                if (setIsLoadingModal) setIsLoadingModal(false)
                return
            }

            toast.success("Export Stock Success", {
                position: "top-right"
            })

            mutate(`/stock/${activeStockModal.productId}`)
            activeStockModal.onClose()
        }

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    if (isLoadingModal) {
        return <LoadingActionWallet loading={isLoadingModal} />
    }

    return (
        <CustomModal
            isOpen={activeStockModal.isOpen}
            onClose={activeStockModal.onClose}
            title="Bạn có chắc chắn muốn xuất kho hàng này không?"
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
                        onClick={activeStockModal.onClose}
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

export default ModalActiveStock