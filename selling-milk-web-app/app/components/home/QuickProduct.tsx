"use client"

import Container from "../hero/Container";
import ProductOther from "../providers/products/ProductOther";
import useSWR from "swr";
import { Product } from "@/types";
import axiosInstance from "@/lib/axios";
import Image from "next/image";
import { LoadingFullScreen } from "../providers/loader";
import Button from "../providers/form/Button";
import { useRouter } from "next/router";

const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data);

const QuickProduct = () => {
    const router = useRouter()
    const { data, error, isLoading } = useSWR<Product[]>('/product/updated', fetcher, { refreshInterval: 1000 });

    return (
        <Container>
            <div className="
                    flex 
                    flex-col
                    transition-all
                    duration-500
                    gap-2
                    bg-white
                "
            >
                <div className="
                        pt-2
                        text-primary-cus
                        font-semibold
                        md:text-2xl
                        text-xl
                        text-center
                        transition-all
                        duration-500
                    "
                >
                    Sản phẩm mới nhất
                </div>
                <div className="
                        w-full
                        h-[4px] 
                        bg-primary-cus
                        hidden
                        lg:block
                    "
                />
            </div>
            {isLoading ? (
                <div className="w-full flex items-center justify-center">
                    <LoadingFullScreen loading={isLoading} />
                </div>
            ) : error ? (
                <div className="relative flex flex-col space-x-3 items-center justify-center h-80 text-primary-blue-cus">
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
                <div className="relative flex flex-col space-x-3 items-center justify-center h-80 text-primary-blue-cus">
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
            <div className="relative py-5 flex justify-center items-center">
                <Button
                    title="Xem thêm"
                    style="text-lg py-3 px-7"
                    onClick={() => router.push("/product/listProduct")}
                />
            </div>
        </Container>
    );
};

export default QuickProduct;
