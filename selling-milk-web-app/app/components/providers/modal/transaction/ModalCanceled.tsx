"use client"

import { GlobalContext } from "@/contexts"
import { useContext } from "react"
import CustomModal from "../Modal"
import Input from "../../form/Input"
import Button from "../../form/Button"
import { LoadingActionWallet } from "../../loader"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { canceledTransactionSchema } from "@/utils/schema"
import { toast } from "react-toastify"
import { mutate } from "swr"
import { useCanceledModal } from "@/hooks/useTransaction"
import { CanceledTransaction } from "@/types/transaction"
import { canceledService } from "@/services/transaction"

const ModalCanceled = () => {
    const canceledModal = useCanceledModal()
    const { user, setIsLoadingModal, isLoadingModal } = useContext(GlobalContext) || {}

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CanceledTransaction>({
        resolver: yupResolver(canceledTransactionSchema)
    })

    const onSubmit = async (data: CanceledTransaction) => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        if (canceledModal.transactionId) {
            const res = await canceledService(canceledModal.transactionId, data.reason)

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
            reset()
            canceledModal.onClose()
        }

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    if (isLoadingModal) {
        return <LoadingActionWallet loading={isLoadingModal} />
    }

    return (
        <CustomModal
            isOpen={canceledModal.isOpen}
            onClose={canceledModal.onClose}
            title="Lý do hủy đơn hàng"
            width="w-full lg:w-2/4 md:3/4 max-w-full"
            height="h-auto"
        >
            <form className="relative flex flex-col justify-center items-center gap-5 py-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="relative flex flex-col gap-3 w-full px-2 md:px-10">
                    <label className="text-gray-600 text-xl font-semibold text-left">
                        Nhập lý do:
                    </label>
                    <Input
                        flagInput
                        colorInput="w-full bg-[#F5F5F5] text-gray-600 text-xl"
                        id="reason"
                        type="text"
                        name="reason"
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

export default ModalCanceled