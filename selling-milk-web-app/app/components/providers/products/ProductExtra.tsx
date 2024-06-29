"use client"

import axiosInstance from "@/lib/axios";
import ProductOther from "./ProductOther"
import useSWR from "swr";
import { Product } from "@/types";
import Image from "next/image";
import { LoadingFullScreen } from "../loader";

const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data);

const ProductExtra = () => {
    const { data, error, isLoading } = useSWR<Product[]>('/product/updated', fetcher, { refreshInterval: 1000 });

    return (
        <section className="flex flex-col gap-3 mt-10">
            <label className="text-lg uppercase text-gray-500">
                CÓ THỂ BẠN CŨNG THÍCH
            </label>
            {isLoading ? (
                <div className="w-full flex items-center justify-center">
                    <LoadingFullScreen loading={isLoading} />
                </div>
            ) : error ? (
                <div className="w-full relative flex flex-col space-x-3 items-center justify-center h-80 text-primary-blue-cus">
                    <p className="md:text-4xl text-3xl font-semibold">Đã xảy ra lỗi khi tải danh sách sản phẩm - error 500</p>
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
                    <p className="md:text-4xl text-3xl font-semibold">Không tìm thấy danh sách sản phẩm</p>
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
                <div
                    className="
                        grid
                        xl:grid-cols-6
                        lg:grid-cols-5
                        md:grid-cols-4
                        grid-cols-3
                        gap-[5px]
                        transition-all
                        duration-500
                        pt-4
                    "
                >
                    {data.map((item) => (
                        <ProductOther
                            key={item._id}
                            _id={item._id}
                            imageUrl={item.imageUrl}
                            name={item.name}
                            sale={item.sale}
                            discount={item.discount}
                            price={item.price}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}

export default ProductExtra