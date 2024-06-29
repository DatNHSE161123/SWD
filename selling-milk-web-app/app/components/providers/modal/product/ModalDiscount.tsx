"use client"

import { GlobalContext } from "@/contexts"
import { useContext } from "react"
import CustomModal from "../Modal"
import Input from "../../form/Input"
import Button from "../../form/Button"
import { LoadingActionWallet } from "../../loader"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { discountSchema } from "@/utils/schema"
import { toast } from "react-toastify"
import { mutate } from "swr"
import { useDiscountModal } from "@/hooks/useProduct"
import { DiscountProduct } from "@/types"
import { updateDiscountService } from "@/services/product"

const ModalDiscount = () => {
    const discountModal = useDiscountModal()
    const { setIsLoadingModal, isLoadingModal } = useContext(GlobalContext) || {}

    const { register, handleSubmit, formState: { errors }, reset } = useForm<DiscountProduct>({
        resolver: yupResolver(discountSchema)
    })

    const onSubmit = async (data: DiscountProduct) => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        if (discountModal.productId) {
            const res = await updateDiscountService(discountModal.productId, data.amount)

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

            reset()
            mutate("/product")
            discountModal.onClose()
        }

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    if (isLoadingModal) {
        return <LoadingActionWallet loading={isLoadingModal} />
    }

    return (
        <CustomModal
            isOpen={discountModal.isOpen}
            onClose={discountModal.onClose}
            title="Phần trăm giảm giá/sản phẩm"
            width="w-full lg:w-2/4 md:3/4 max-w-full"
            height="h-auto"
        >
            <form className="relative flex flex-col justify-center items-center gap-5 py-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="relative flex flex-col gap-3 w-full px-2 md:px-10">
                    <label className="text-gray-600 text-xl font-semibold text-left">
                        Nhập (%) giảm giá: (0-99)
                    </label>
                    <Input
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

export default ModalDiscount