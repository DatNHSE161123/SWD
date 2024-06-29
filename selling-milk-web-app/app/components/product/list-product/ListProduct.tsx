"use client"

import { GlobalContext } from "@/contexts";
import axiosInstance from "@/lib/axios";
import { Product } from "@/types";
import { removeVietnameseTones } from "@/utils/format";
import { useContext, useState } from "react";
import useSWR from "swr";
import Search from "../../providers/form/Search";
import { LoadingFullScreen } from "../../providers/loader";
import Image from "next/image";
import ProductOther from "../../providers/products/ProductOther";
import ReactPaginate from "react-paginate";

const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data);

const ListProduct = () => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const { brand, price, discount } = useContext(GlobalContext) || {}

    const { data: listItem, error } = useSWR<Product[]>(brand ? `/product/filter?brandName=${brand}` : price ? `/product/filter?sortBy=price&order=${price}` : discount ? `/product/filter?sortBy=discount&order=${discount}` : "/product", fetcher, { refreshInterval: 5000 })

    const isLoading = !listItem && !error

    const filterProduct = listItem && listItem.filter(product => product.name && removeVietnameseTones(product.name).trim().toLowerCase().includes(removeVietnameseTones(searchTerm).trim().toLowerCase()))

    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 24
    const pageCount = Math.ceil(filterProduct ? filterProduct.length / itemsPerPage : 0)

    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected)
    }

    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const visibleItems = filterProduct && filterProduct.length > 0 ? filterProduct.slice(startIndex, endIndex) : []

    return (
        <div className="lg:col-span-3 col-span-1 h-auto w-full relative">
            <div className="flex md:flex-row flex-col md:justify-between gap-3 pb-5">
                <h1 className="text-4xl font-semibold text-gray-600 translate-y-0">Các sản phẩm</h1>
                <Search value={searchTerm} onChange={setSearchTerm} style="w-full md:w-2/4" />
            </div>
            {isLoading ? (
                <div className="h-screen flex items-center justify-center">
                    <LoadingFullScreen loading={isLoading} />
                </div>
            ) : listItem && listItem.length === 0 ? (
                <div className="relative h-screen flex flex-col items-center justify-center gap-5 text-primary-blue-cus font-semibold">
                    <div className="flex space-x-3 items-center flex-wrap justify-center transition-all duration-500">
                        <h1 className="md:text-4xl text-3xl transition-all duration-500">Không có sản phẩm nào cả!</h1>
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
                    <p className="md:text-3xl text-xl text-center transition-all duration-500">Vui lòng thử lại sau...</p>
                </div>
            ) : filterProduct && filterProduct.length === 0 ? (
                <div className="relative h-screen flex flex-col items-center justify-center gap-5 text-primary-blue-cus font-semibold">
                    <div className="flex space-x-3 items-center flex-wrap justify-center transition-all duration-500">
                        <h1 className="md:text-4xl text-3xl transition-all duration-500">Sản phẩm này không tồn tại!</h1>
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
                    <p className="md:text-3xl text-xl text-center transition-all duration-500">Hãy thử tìm kiếm sân khác...</p>
                </div>
            ) : (
                <>
                    {visibleItems.map((item) => (
                        <div
                            className="
                                grid
                                md:grid-cols-4
                                grid-cols-3
                                gap-[5px]
                                transition-all
                                duration-500
                                pt-4
                            "
                        >
                            <ProductOther
                                _id={item._id}
                                name={item.name}
                                price={item.price}
                                imageUrl={item.imageUrl}
                                sale={item.sale}
                                discount={item.discount}
                                styleMargin
                            />
                        </div>
                    ))}
                    {pageCount > 1 && (
                        <div className="flex justify-end mt-10 text-base font-semibold">
                            <ReactPaginate
                                pageCount={pageCount}
                                pageRangeDisplayed={4}
                                marginPagesDisplayed={1}
                                onPageChange={handlePageChange}
                                containerClassName="pagination flex p-0 m-0"
                                activeClassName="text-gray-400 bg-gray-200"
                                previousLabel="<"
                                nextLabel=">"
                                pageClassName="border-2 px-4 py-2"
                                previousClassName="border-2 px-4 py-2"
                                nextClassName="border-2 px-4 py-2"
                                pageLinkClassName="pagination-link"
                                nextLinkClassName="pagination-link"
                                breakClassName="pagination-items border-2 px-3 py-2"
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default ListProduct