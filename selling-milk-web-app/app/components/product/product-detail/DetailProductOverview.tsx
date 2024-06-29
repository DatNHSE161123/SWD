"use client"

import Image from "next/image"
import { formatCurrency } from "@/utils/format";
import { FaCartPlus } from "react-icons/fa";
import React, { useContext, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { ProductDetailData } from "@/types";
import { validateURLProduct } from "@/utils/validData";
import { GlobalContext } from "@/contexts";
import { toast } from "react-toastify";
import { addToCart } from "@/services/cart";
import { mutate } from "swr";
import { Loading } from "../../providers/loader";

const DetailProductOverview: React.FC<ProductDetailData> = ({
    _id,
    discount,
    sale,
    imageUrls,
    name,
    price,
    totalStock,
}) => {
    const images = [
        "/images/product_1.png",
        "/images/product.png"
    ]

    const [selectedImage, setSelectedImage] = useState(imageUrls ? imageUrls[0] : images[0]);
    const [swiper, setSwiper] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const goToPrevious = () => {
        if (swiper) swiper.slidePrev();
    };

    const goToNext = () => {
        if (swiper) swiper.slideNext();
    };

    const { isAuthUser, user, isLoading, setIsLoading } = useContext(GlobalContext) || {}

    const handleAddToCart = async () => {
        if (setIsLoading) setIsLoading(true)

        if (user) {
            const userId = user._id
            const productId = _id
            const data = { userId, productId, quantity }

            const res = await addToCart(data)

            if (res.data == null) {
                toast.error(res.message, {
                    position: "top-right",
                })
                if (setIsLoading) setIsLoading(false)
                return
            }

            toast.success("Thêm vào giỏ hàng thành công", {
                position: "top-right",
            })

            mutate(`/cart?userId=${userId}`)
        }

        if (setIsLoading) setIsLoading(false)
    }

    return (
        <section className="relative w-full bg-white rounded-sm p-6">
            <div className="grid grid-cols-9 gap-5">
                <section className="col-span-4 transition-all duration-500">
                    <div className="w-full h-[600px] top-0 left-0 flex items-center justify-center">
                        <Image
                            src={validateURLProduct(selectedImage)}
                            alt="Selected"
                            className="w-80 h-100 object-fill"
                            height={800}
                            width={600}
                            sizes="(max-width: 600px) 100vw, 600px"
                            draggable="false"
                        />
                    </div>
                    <Swiper
                        onSwiper={setSwiper}
                        slidesPerView={5}
                        spaceBetween={10}
                        navigation={{
                            prevEl: '.swiper-button-prev',
                            nextEl: '.swiper-button-next',
                        }}
                        modules={[Navigation]}
                        className="w-full z-30"
                    >
                        {imageUrls?.map((src, index) => (
                            <SwiperSlide key={index}>
                                <Image
                                    src={src}
                                    alt={`Thumbnail ${index}`}
                                    className={`w-40 h-32 cursor-pointer object-fill ${selectedImage === src ? 'border-2 border-primary-cus' : ''
                                        }`}
                                    height={100}
                                    width={160}
                                    onMouseEnter={() => setSelectedImage(src)}
                                />
                            </SwiperSlide>
                        ))}
                        <button
                            className="z-20 swiper-button-prev absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-30 text-white px-3 py-3 rounded-md text-lg font-bold"
                            onClick={goToPrevious}
                        >
                            &lt;
                        </button>
                        <button
                            className="z-20 swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-30 text-white px-3 py-3 rounded-md text-lg font-bold"
                            onClick={goToNext}
                        >
                            &gt;
                        </button>
                    </Swiper>
                </section>
                <section className="col-span-5">
                    <div className="flex flex-col gap-3">
                        <section className="text-2xl">
                            {name}
                        </section>
                        <section className="flex flex-row justify-between text-gray-500">
                            <div className="flex flex-row gap-5">
                                <h2>
                                    Chưa có đánh giá
                                </h2>
                                <div className="border border-l border-gray-500 border-opacity-30" />
                                <div className="flex flex-row gap-1">
                                    <span className="text-black">
                                        {sale}
                                    </span>
                                    <span>
                                        Đã bán
                                    </span>
                                </div>
                            </div>
                            <div className="cursor-pointer">
                                Tố cáo
                            </div>
                        </section>
                        {discount > 0 ? (
                            <section className="w-full bg-gray-100 rounded-sm px-6 py-4">
                                <div className="flex flex-row gap-5 items-center">
                                    <span className="line-through text-gray-500 text-lg">
                                        {formatCurrency(price ? price : 0)}
                                    </span>
                                    <span className="text-primary-cus text-3xl">
                                        {formatCurrency(price ? (price * (1 - discount / 100)) : 0)}
                                    </span>
                                    <span className="px-2 text-sm bg-primary-cus text-white w-fit font-semibold">
                                        {discount}% Giảm
                                    </span>
                                </div>
                            </section>
                        ) : (
                            <section className="w-full bg-gray-100 rounded-sm px-6 py-4">
                                <div className="flex flex-row gap-5 items-center">
                                    <span className="text-primary-cus text-3xl">
                                        {formatCurrency(price ? price : 0)}
                                    </span>
                                </div>
                            </section>
                        )}
                        <section className="flex flex-col gap-8 px-5 pt-4">
                            <section className="grid grid-cols-5 gap-4 items-center">
                                <div className="col-span-1">
                                    <div className="text-gray-500 text-md">
                                        Chính Sách Trả Hàng
                                    </div>
                                </div>
                                <div className="col-span-4 flex gap-3 text-md">
                                    <div className="flex items-center gap-2">
                                        <input type="radio" className="text-primary-cus focus:ring-0" checked readOnly />
                                        <p className="text-gray-500">
                                            Trả hàng 15 ngày
                                        </p>
                                    </div>
                                </div>
                            </section>
                            <section className="grid grid-cols-5 gap-4 items-start">
                                <div className="col-span-1">
                                    <div className="text-gray-500 text-md">
                                        Vận Chuyển
                                    </div>
                                </div>
                                <div className="col-span-4 flex flex-col gap-2 text-md">
                                    <div className="text-primary-cus">
                                        Hàng Đặt Trước (có hàng sau 5 ngày)
                                    </div>
                                    <div className="">
                                        Miễn phí vận chuyển
                                    </div>
                                    <div className="text-gray-500">

                                        Vận Chuyển Tới
                                    </div>
                                </div>
                            </section>
                            <section className="grid grid-cols-5 gap-4 items-center">
                                <div className="col-span-1">
                                    <div className="text-gray-500 text-md">
                                        Số Lượng
                                    </div>
                                </div>
                                <div className="col-span-4">
                                    <div className="flex flex-row gap-3 items-center">
                                        <div className="flex flex-row text-md text-gray-600 font-semibold border border-black border-opacity-10 w-fit">
                                            <button className="border border-r border-black border-opacity-10 px-4 py-1" onClick={decreaseQuantity}>
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                className="w-12 text-center"
                                                value={quantity}
                                                onChange={(e) => setQuantity(Number(e.target.value))}
                                            />
                                            <button className="border border-l border-black border-opacity-10 px-4 py-1" onClick={increaseQuantity}>
                                                +
                                            </button>
                                        </div>
                                        <div className="text-gray-500 text-sm">
                                            {totalStock} sản phẩm có sẵn
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="flex flex-row gap-5 h-full">
                                {(!user || user.role === "admin") ? (
                                    <button className="flex flex-row gap-2 px-2 py-1 w-60 h-14 items-center justify-center text-primary-cus bg-red-100 hover:bg-red-50 border border-primary-cus cursor-not-allowed" disabled>
                                        <span>
                                            <FaCartPlus size={30} />
                                        </span>
                                        <span>
                                            Thêm vào giỏ hàng
                                        </span>
                                    </button>
                                ) : (
                                    isLoading ? (
                                        <button className="flex flex-row gap-2 px-2 py-1 w-60 h-14 items-center justify-center text-primary-cus bg-red-100 hover:bg-red-50 border border-primary-cus" onClick={handleAddToCart}>
                                            <span>
                                                <FaCartPlus size={30} />
                                            </span>
                                            <span className="w-40">
                                                <Loading loading={isLoading} />
                                            </span>
                                        </button>
                                    ) : (
                                        <button className="flex flex-row gap-2 px-2 py-1 w-60 h-14 items-center justify-center text-primary-cus bg-red-100 hover:bg-red-50 border border-primary-cus" onClick={handleAddToCart}>
                                            <span>
                                                <FaCartPlus size={30} />
                                            </span>
                                            <span>
                                                Thêm vào giỏ hàng
                                            </span>
                                        </button>
                                    )
                                )}
                            </section>
                            <section className="border-b border-black opacity-10 pt-5" />
                            <section className="flex flex-row gap-5 w-full text-md pt-5">
                                <span>
                                    Đảm bảo
                                </span>
                                <span className="text-gray-500">
                                    Trả hàng miễn phí 15 ngày
                                </span>
                            </section>
                        </section>
                    </div>
                </section>
            </div>
        </section>
    )
}

export default DetailProductOverview