"use client"

import { GlobalContext } from "@/contexts"
import { useContext } from "react"
import { LoadingActionWallet } from "../../loader"
import CustomModal from "../Modal"
import Button from "../../form/Button"
import { toast } from "react-toastify"
import { mutate } from "swr"
import { useDeliveredModal } from "@/hooks/useTransaction"
import { deliveredService } from "@/services/transaction"

const ModalDelivered = () => {
    const { user, setIsLoadingModal, isLoadingModal } = useContext(GlobalContext) || {}

    const deliveredModal = useDeliveredModal()

    const handleDeleteStock = async () => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        if (deliveredModal.transactionId) {
            const res = await deliveredService(deliveredModal.transactionId)

            if (res.data == null) {
                toast.error(res.message, {
                    position: "top-right"
                })
                if (setIsLoadingModal) setIsLoadingModal(false)
                return
            }

            toast.success(res.message, {
                position: "top-right"
            })

            mutate("/transaction/getAll")
            if (user) mutate(`/transaction/getByUser?userId=${user._id}`)
            deliveredModal.onClose()
        }

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    if (isLoadingModal) {
        return <LoadingActionWallet loading={isLoadingModal} />
    }

    return (
        <CustomModal
            isOpen={deliveredModal.isOpen}
            onClose={deliveredModal.onClose}
            title="Bạn có chắc chắn đã nhận hàng không?"
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
                        onClick={deliveredModal.onClose}
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

export default ModalDelivered