"use client"

import { GlobalContext } from "@/contexts"
import { useContext } from "react"
import { LoadingActionPayment } from "../../loader"
import { useForm } from "react-hook-form"
import Image from "next/image"
import CustomModal from "../Modal"
import Button from "../../form/Button"
import { usePaymentModal } from "@/hooks/useTransaction"
import { paymentService } from "@/services/transaction"
import { toast } from "react-toastify"
import { mutate } from "swr"

const ModalContinuePayment = () => {
    const { setIsLoadingModal, isLoadingModal } = useContext(GlobalContext) || {}
    const { handleSubmit } = useForm()
    const paymentModal = usePaymentModal()

    const onSubmit = async () => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        if (paymentModal.userId) {
            const res = await paymentService(paymentModal.userId)

            if (res.data == null) {
                toast.error(res.message, {
                    position: "top-right"
                })
                if (setIsLoadingModal) setIsLoadingModal(false)
                return
            }

            toast.success("Thanh toán thành công", {
                position: "top-right"
            })

            mutate(`/cart?userId=${paymentModal.userId}`)
            paymentModal.onClose()
        }

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    if (isLoadingModal) {
        return <LoadingActionPayment loading={isLoadingModal} />
    }

    return (
        <CustomModal
            isOpen={paymentModal.isOpen}
            onClose={paymentModal.onClose}
            width="md:w-auto w-full"
            height="h-auto"
        >
            <form className="flex flex-col md:px-10 pb-5 gap-5 justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
                <Image
                    src="/images/pay.png"
                    alt="error"
                    height={200}
                    width={200}
                    className="object-contain w-20 h-16"
                />
                <label className="text-gray-600 font-semibold text-3xl truncate">Bạn có muốn thanh toán không?</label>
                <div className="flex flex-row gap-5">
                    <Button
                        title="Không"
                        color="border-primary-blue-cus bg-white"
                        text="text-primary-blue-cus"
                        style="py-3 px-8"
                        onClick={paymentModal.onClose}
                    />
                    <Button
                        title="Có"
                        isHover={false}
                        style="py-3 px-8"
                        type="submit"
                    />
                </div>
            </form>
        </CustomModal>
    )
}

export default ModalContinuePayment