"use client"

import { Product } from "@/types"
import { formatNoTime } from "@/utils/format"
import React from "react"

const DetailProductContent: React.FC<Product> = ({
    brand,
    description,
    stocks,
    from,
    origin,
    savour
}) => {

    const validStocks = stocks && stocks.filter(stock => stock.quantity > 0);

    if (validStocks && validStocks.length === 0) {
        return null; 
    }

    validStocks && validStocks.sort((a, b) => {
        const dateA = new Date(a.expiryAt).getTime();
        const dateB = new Date(b.expiryAt).getTime();
        return dateA - dateB;
    });

    const nearestExpiryStock = validStocks && validStocks[0].expiryAt;

    return (
        <section className="relative w-full bg-white rounded-sm p-6 mt-5">
            <div className="flex flex-col gap-7">
                <section className="flex flex-col gap-5">
                    <div className="w-full bg-[#F5F5F5] text-xl p-4 uppercase">
                        Chi tiết sản phẩm
                    </div>
                    <div className="flex flex-row justify-between gap-10 text-md w-fit p-4">
                        <ul className="text-gray-400 flex flex-col gap-4">
                            <li>
                                Thương hiệu
                            </li>
                            <li>
                                Xuất xứ
                            </li>
                            <li>
                                Hương vị
                            </li>
                            <li>
                                Hạn sử dụng
                            </li>
                            <li>
                                Gửi từ
                            </li>
                        </ul>
                        <ul className="text-gray-900 flex flex-col gap-4">
                            <li>
                                {brand}
                            </li>
                            <li>
                                {origin}
                            </li>
                            <li>
                                {savour}
                            </li>
                            <li>
                                {formatNoTime(nearestExpiryStock || "")}
                            </li>
                            <li>
                                {from}
                            </li>
                        </ul>
                    </div>
                </section>
                <section className="flex flex-col gap-5 w-full">
                    <div className="w-full bg-[#F5F5F5] text-xl p-4 uppercase">
                        Mô tả sản phẩm
                    </div>
                    <p className="text-base p-4 text-wrap">
                        {description}
                    </p>
                </section>
            </div>
        </section>
    )
}

export default DetailProductContent