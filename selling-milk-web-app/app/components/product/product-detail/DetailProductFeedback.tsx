"use client"

import Image from "next/image"
import Input from "../../providers/form/Input"
import Button from "../../providers/form/Button"
import { useForm } from "react-hook-form"
import { CommentDetail, CommentForm } from "@/types/comment"
import { yupResolver } from "@hookform/resolvers/yup"
import { commentSchema } from "@/utils/schema"
import { useContext } from "react"
import { GlobalContext } from "@/contexts"
import { toast } from "react-toastify"
import { postCommentService } from "@/services/comment"
import { Loading, LoadingFullScreen } from "../../providers/loader"
import axiosInstance from "@/lib/axios"
import useSWR from "swr"
import { validateURLAvatar } from "@/utils/validData"
import { formatShortTime } from "@/utils/format"

interface DetailProductFeedbackProps {
    productId: string
}

const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data);

const DetailProductFeedback: React.FC<DetailProductFeedbackProps> = ({
    productId
}) => {
    const { user, isLoading, setIsLoading } = useContext(GlobalContext) || {}

    const { data, error, isLoading: loadingComment, mutate } = useSWR<CommentDetail[]>(productId ? `/comment?productId=${productId}` : null, fetcher, { refreshInterval: 1000 });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CommentForm>({
        resolver: yupResolver(commentSchema),
    })

    const onSubmit = async (data: CommentForm) => {
        if (setIsLoading) setIsLoading(true)

        if (!user) {
            toast.error("You need login for use", {
                position: "top-right"
            })
            if (setIsLoading) setIsLoading(false)
            return
        }

        const res = await postCommentService({
            productId: productId,
            userId: user._id,
            content: data.content,
            packaging: data.packaging,
            quality: data.quality
        })

        if (res.data == null) {
            toast.error(res.message, {
                position: "top-right"
            })
            if (setIsLoading) setIsLoading(false)
            return
        }

        toast.success(res.message, {
            position: "top-right"
        })

        reset()
        mutate()

        if (setIsLoading) setIsLoading(false)
    }

    return (
        <section className="relative w-full bg-white rounded-sm p-6 mt-5">
            <div className="flex flex-col gap-5">
                <h2 className="uppercase text-xl">Đánh giá sản phẩm</h2>
                <form className="border border-opacity-10 rounded-sm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-6 p-4 w-full gap-3">
                        <div className="col-span-5">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-2 w-full">
                                    <div className="relative w-1/2">
                                        <Input
                                            label="Mẫu mã/bao bì"
                                            id="packaging"
                                            name="packaging"
                                            type="number"
                                            placeholder="Đánh giá từ 1-10"
                                            register={register}
                                            errors={errors}
                                        />
                                    </div>
                                    <div className="relative w-1/2">
                                        <Input
                                            label="Chất lương"
                                            id="quality"
                                            name="quality"
                                            type="number"
                                            placeholder="Đánh giá từ 1-10"
                                            register={register}
                                            errors={errors}
                                        />
                                    </div>
                                </div>
                                <Input
                                    flagInput
                                    placeholder="Nhập nội dung"
                                    label="Nội dung"
                                    id="content"
                                    name="content"
                                    type="text"
                                    register={register}
                                    errors={errors}
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            {isLoading ? (
                                <Button
                                    title={<Loading loading={isLoading} color="white" />}
                                    style="w-full h-full text-3xl items-center justify-center"
                                    type="submit"
                                    isHover={false}
                                />
                            ) : (
                                <Button
                                    title="Gửi"
                                    style="w-full h-full text-3xl items-center justify-center"
                                    type="submit"
                                />
                            )}
                        </div>
                    </div>
                </form>
                <div className="flex flex-col gap-4 p-4 b">
                    {loadingComment ? (
                        <LoadingFullScreen loading={loadingComment} />
                    ) : error ? (
                        <div className="w-full relative flex flex-col space-x-3 items-center justify-center h-80 text-primary-blue-cus">
                            <p className="md:text-4xl text-3xl font-semibold">Đã xảy ra lỗi khi tải danh sách bình luận - error 500</p>
                            <div className="relative">
                                <Image
                                    src="/images/sad.gif"
                                    alt="Gif"
                                    width={100}
                                    height={100}
                                    className="object-contain md:w-32 md:h-32 h-20 w-20 transition-all duration-500"
                                />
                            </div>
                        </div>
                    ) : !data || data.length === 0 ? (
                        <div className="w-full relative flex flex-col space-x-3 items-center justify-center h-80 text-primary-blue-cus">
                            <p className="md:text-4xl text-3xl font-semibold">Không có bất kì bình luận nào</p>
                            <div className="relative">
                                <Image
                                    src="/images/sad.gif"
                                    alt="Gif"
                                    width={100}
                                    height={100}
                                    className="object-contain md:w-32 md:h-32 h-20 w-20 transition-all duration-500"
                                />
                            </div>
                        </div>
                    ) : (
                        data.map((item) => (
                            <>
                                <div className="flex flex-row gap-3" key={item._id}>
                                    <div className="flex flex-shrink-0 w-16 h-16 rounded-full">
                                        <Image
                                            src={validateURLAvatar(item.user.avatar)}
                                            alt="user"
                                            className="w-16 h-16 rounded-full object-cover"
                                            width={64}
                                            height={64}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3 text-sm">
                                        <label className="text-black">
                                            {item.user.username || ""}
                                        </label>
                                        <p className="text-gray-500">
                                            {formatShortTime(item.createdAt)}
                                        </p>
                                        <div className="flex flex-col gap-1 text-md">
                                            <div className="flex flex-row gap-2">
                                                <span className="text-gray-500">
                                                    Bao bì/Mẫu mã:
                                                </span>
                                                <span className="text-black">
                                                    {item.packaging || 0}
                                                </span>
                                            </div>
                                            <div className="flex flex-row gap-2">
                                                <span className="text-gray-500">
                                                    Hương vị:
                                                </span>
                                                <span className="text-black">
                                                    {item.quality || 0}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-black text-md">
                                            {item.content || ""}
                                        </p>
                                    </div>
                                </div>
                                <div className="border-b border-black border-opacity-20 pb-5" />
                            </>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}

export default DetailProductFeedback