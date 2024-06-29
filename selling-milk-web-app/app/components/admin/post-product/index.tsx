"use client"

import ThumbGallery from "./ThumbsGallery"
import React, { useContext, useState } from "react"
import Input from "../../providers/form/Input"
import Button from "../../providers/form/Button"
import { postProductInputs } from "@/utils/constants"
import { useForm } from "react-hook-form"
import { ProductFormData } from "@/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { postProductSchema } from "@/utils/schema"
import { toast } from "react-toastify"
import { GlobalContext } from "@/contexts"
import { postProductService } from "@/services/product"
import { Loading } from "../../providers/loader"

const PostNewForm = () => {
    const [uploadImages, setUploadImages] = useState<string[]>([])

    const {
        user,
        setIsLoading,
        isLoading,
        setIsRefresh
    } = useContext(GlobalContext) || {}

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ProductFormData>({
        resolver: yupResolver(postProductSchema),
    })

    const onSubmit = async (data: ProductFormData) => {
        if (setIsLoading) setIsLoading(true)

        if (user) {
            const res = await postProductService({
                name: data.name,
                price: data.price,
                description: data.description,
                origin: data.origin,
                savour: data.savour,
                from: data.from,
                brand: data.brand,
                imageUrls: uploadImages,
                userId: user._id
            })

            if (res.data == null) {
                toast.error(res.message, {
                    position: "top-right",
                })
                if (setIsLoading) setIsLoading(false)
                return
            }

            toast.success("Tạo sản phẩm mới thành công", {
                position: "top-right",
            })

            reset()
            setUploadImages([])
            if (setIsRefresh) setIsRefresh(true)
        }

        if (setIsLoading) setIsLoading(false)
    }

    return (
        <form className="grid lg:grid-cols-2 grid-cols-1 gap-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-span-1">
                <ThumbGallery setImages={setUploadImages} />
            </div>
            <div className="col-span-1">
                <div className="relative">
                    <div className="flex flex-col gap-8">
                        {postProductInputs.map((input) => (
                            <React.Fragment key={input.id}>
                                <div className="grid grid-cols-3 gap-3 items-center">
                                    <div className="col-span-1">
                                        <label className="text-lg font-semibold text-gray-600">{input.label}</label>
                                    </div>
                                    <div className="col-span-2">
                                        <Input
                                            id={input.id}
                                            name={input.name}
                                            colorInput="bg-[#F5F5F5]"
                                            type={input.type}
                                            maxLength={100}
                                            register={register}
                                            errors={errors}
                                        />
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                        <div className="grid grid-cols-3 gap-3 items-center">
                            <div className="col-span-1">
                                <label className="text-lg font-semibold text-gray-600">Mô tả:</label>
                            </div>
                            <div className="col-span-2">
                                <Input
                                    flagInput
                                    id="description"
                                    name="description"
                                    colorInput="bg-[#F5F5F5]"
                                    type="text"
                                    maxLength={500}
                                    register={register}
                                    errors={errors}
                                />
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-3 grid-cols-1">
                            <div className="lg:col-span-1" />
                            <div className="lg:col-span-2 col-span-1 py-4 flex justify-center">
                                {isLoading ? (
                                    <Button
                                        title={<Loading loading={isLoading} color="white" />}
                                        style="px-16 py-3 text-xl"
                                        type="submit"
                                        isHover={false}
                                    />
                                ) : (
                                    <Button
                                        title="Đăng bài"
                                        style="px-16 py-3 text-xl"
                                        type="submit"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PostNewForm