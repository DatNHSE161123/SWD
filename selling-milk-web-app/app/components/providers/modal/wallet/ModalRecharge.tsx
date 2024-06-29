"use client"

import { GlobalContext } from "@/contexts"
import { useRechargeModal } from "@/hooks/useWallet"
import { useContext } from "react"
import CustomModal from "../Modal"
import Image from "next/image"
import Input from "../../form/Input"
import Button from "../../form/Button"
import { LoadingActionWallet } from "../../loader"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { WalletFromRecharge } from "@/types"
import { walletRechargeSchema } from "@/utils/schema"
import { depositService } from "@/services/wallet"
import { toast } from "react-toastify"
import { mutate } from "swr"

const ModalRecharge = () => {
    const rechargeModal = useRechargeModal()
    const { user, setIsLoadingModal, isLoadingModal, setFetchUser } = useContext(GlobalContext) || {}

    const { register, handleSubmit, formState: { errors }, reset } = useForm<WalletFromRecharge>({
        resolver: yupResolver(walletRechargeSchema)
    })

    const onSubmit = async (data: WalletFromRecharge) => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        if (user) {
            const res = await depositService(user._id, data.amount)

            if (res.data == null) {
                toast.error(res.message, {
                    position: "top-right"
                })
                if (setIsLoadingModal) setIsLoadingModal(false)
                return
            }

            toast.success("Nạp tiền thành công", {
                position: "top-right"
            })

            mutate(`/wallet/getWallet?userId=${user._id}`)
            rechargeModal.onClose()
            reset()
        }

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    if (isLoadingModal) {
        return <LoadingActionWallet loading={isLoadingModal} />
    }

    return (
        <CustomModal
            isOpen={rechargeModal.isOpen}
            onClose={rechargeModal.onClose}
            title="Nhập chi tiết giao dịch"
            width="w-full lg:w-2/4 md:3/4 max-w-full"
            height="h-auto"
        >
            <form className="relative flex flex-col justify-center items-center gap-5 py-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center space-x-5">
                    <div className="relative flex-shrink-0">
                        <Image
                            src="/images/withdraw.png"
                            alt="VNPAY"
                            height={100}
                            width={100}
                            className="object-contain w-16 h-12"
                        />
                    </div>
                    <div className="text-2xl font-semibold text-gray-600">
                        Nạp tiền
                    </div>
                </div>
                <div className="relative flex flex-col gap-3 w-full px-2 md:px-10">
                    <label className="text-gray-600 text-xl font-semibold text-left">
                        Nhập số tiền cần nạp:
                    </label>
                    <Input
                        isMoney
                        colorInput="w-full bg-[#F5F5F5] text-gray-600 text-xl"
                        id="amount"
                        type="number"
                        name="amount"
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

export default ModalRecharge