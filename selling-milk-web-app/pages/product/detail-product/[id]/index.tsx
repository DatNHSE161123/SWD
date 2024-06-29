"use client"

import Layout from "@/app/layout"
import Container from "@/app/components/hero/Container";
import axiosInstance from "@/lib/axios";
import useSWR from "swr";
import { useRouter } from "next/router";
import ProductExtra from "@/app/components/providers/products/ProductExtra";
import { LoadingFullScreen } from "@/app/components/providers/loader";
import Image from "next/image";
import DetailProductOverview from "@/app/components/product/product-detail/DetailProductOverview";
import DetailProductContent from "@/app/components/product/product-detail/DetailProductContent";
import DetailProductFeedback from "@/app/components/product/product-detail/DetailProductFeedback";
import { ProductDetailData } from "@/types";
import { ManageStockData } from "@/types/stock";

const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data);

const ProductDetail = () => {
    const router = useRouter()

    const { id } = router.query

    const { data: Product, error: errorProduct, isLoading: loadingProduct } = useSWR<ProductDetailData>(`/product/${id}`, fetcher, { refreshInterval: 1000 });
    const { data: listManagementStock, error, isLoading } = useSWR<ManageStockData[]>(id ? `/stock/${id}` : null, fetcher, { refreshInterval: 1000 })


    return (
        <Layout>
            <div className="relative py-10">
                {(loadingProduct || isLoading) ? (
                    <Container>
                        <LoadingFullScreen loading={(loadingProduct || isLoading)} height="h-screen" />
                    </Container>
                ) : (errorProduct || error) ? (
                    <Container>
                        <div className="relative h-screen flex flex-col items-center justify-center gap-5 text-primary-blue-cus font-semibold">
                            <div className="flex space-x-3 items-center flex-wrap justify-center transition-all duration-500">
                                <h1 className="md:text-5xl text-3xl transition-all duration-500">500 - Lỗi máy chủ</h1>
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
                            <p className="md:text-3xl text-xl text-center transition-all duration-500">Xin lỗi, có lỗi xảy ra từ phía máy chủ. Vui lòng thử lại sau.</p>
                        </div>
                    </Container>
                ) : (!Product || !listManagementStock) ? (
                    <Container>
                        <div className="relative h-screen flex flex-col items-center justify-center gap-5 text-primary-blue-cus font-semibold">
                            <div className="flex space-x-3 items-center flex-wrap justify-center transition-all duration-500">
                                <h1 className="md:text-5xl text-3xl transition-all duration-500">404 - Trang không được tìm thấy</h1>
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
                            <p className="md:text-3xl text-xl text-center transition-all duration-500">Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
                        </div>
                    </Container>
                ) : (
                    <Container>
                        <DetailProductOverview
                            _id={Product._id}
                            discount={Product.discount}
                            sale={Product.sale}
                            imageUrls={Product.imageUrls}
                            name={Product.name}
                            price={Product.price}
                            totalStock={Product.totalStock}
                        />
                        <DetailProductContent
                            _id={Product._id}
                            brand={Product.brand}
                            description={Product.description}
                            stocks={listManagementStock}
                            totalStock={Product.totalStock}
                            from={Product.from}
                            origin={Product.origin}
                            savour={Product.savour}
                            sale={Product.sale}
                            discount={Product.discount}
                        />
                        <DetailProductFeedback productId={Product._id} />
                        <ProductExtra />
                    </Container>
                )}
            </div>
        </Layout>
    )
}

export default ProductDetail