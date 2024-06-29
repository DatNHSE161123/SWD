"use client"

import { GlobalContext } from "@/contexts"
import { useContext } from "react"
import CustomModal from "../Modal"
import Input from "../../form/Input"
import Button from "../../form/Button"
import { LoadingActionWallet } from "../../loader"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { shippingTransactionSchema } from "@/utils/schema"
import { toast } from "react-toastify"
import { mutate } from "swr"
import { useShippingModal } from "@/hooks/useTransaction"
import { ShippingTransaction } from "@/types/transaction"
import { shippingService } from "@/services/transaction"

const ModalShipping = () => {
    const shippingModal = useShippingModal()
    const { setIsLoadingModal, isLoadingModal } = useContext(GlobalContext) || {}

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ShippingTransaction>({
        resolver: yupResolver(shippingTransactionSchema)
    })

    const onSubmit = async (data: ShippingTransaction) => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        if (shippingModal.transactionId) {
            const res = await shippingService(shippingModal.transactionId, data.shippingHour)

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
            reset()
            shippingModal.onClose()
        } 

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    if (isLoadingModal) {
        return <LoadingActionWallet loading={isLoadingModal} />
    }

    return (
        <CustomModal
            isOpen={shippingModal.isOpen}
            onClose={shippingModal.onClose}
            title="Thời gian dự kiến giao hàng"
            width="w-full lg:w-2/4 md:3/4 max-w-full"
            height="h-auto"
        >
            <form className="relative flex flex-col justify-center items-center gap-5 py-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="relative flex flex-col gap-3 w-full px-2 md:px-10">
                    <label className="text-gray-600 text-xl font-semibold text-left">
                        Nhập thời gian: (giờ)
                    </label>
                    <Input
                        colorInput="w-full bg-[#F5F5F5] text-gray-600 text-xl"
                        id="shippingHour"
                        type="number"
                        name="shippingHour"
                        register={register}
                        errors={errors}
                    />
                    <div className="relative flex self-end">
                        <Button
                            title="Đồng ý"
                            style="py-3 px-12"
                            type="submit"
                        />
                    </div>
                </div>
            </form>
        </CustomModal>
    )
}

export default ModalShipping