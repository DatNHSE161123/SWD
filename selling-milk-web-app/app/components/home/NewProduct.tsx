"use client"

import Image from "next/image";
import Container from "../hero/Container"
import ProductCarousel from "../providers/products/ProductCarousel"
import { LoadingFullScreen } from "../providers/loader";
import useSWR from "swr";
import { Product } from "@/types";
import axiosInstance from "@/lib/axios";

const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data);

const NewProduct = () => {
    const { data, error, isLoading } = useSWR<Product[]>('/product/newest', fetcher, { refreshInterval: 1000 });

    return (
        <Container>
            <div className="bg-white p-4">
                <div className="flex flex-col mb-4">
                    <div className="
                            flex 
                            flex-col
                            transition-all
                            duration-500
                            gap-2
                        "
                    >
                        <div className="
                                text-primary-cus
                                font-semibold
                                md:text-2xl
                                text-xl
                                text-left
                                transition-all
                                duration-500
                            "
                        >
                            Sản phẩm mới nhất
                        </div>
                        <div className="
                                w-full
                                h-[2px] 
                                bg-primary-cus
                                hidden
                                lg:block
                            "
                        />
                    </div>
                </div>
                <div className="h-fit flex items-center">
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
                        <ProductCarousel list={data} />
                    )}
                </div>
            </div>
        </Container>
    )
}

export default NewProduct