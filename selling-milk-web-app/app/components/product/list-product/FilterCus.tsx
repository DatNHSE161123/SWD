"use client"

import { GlobalContext } from "@/contexts";
import axiosInstance from "@/lib/axios";
import { BrandDetail } from "@/types";
import { useContext, useState } from "react"
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai"
import { FaFilter } from "react-icons/fa"
import useSWR from "swr";

const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data);

const listPrice = [
    { name: "Tăng dần", order: "asc" },
    { name: "Giảm dần", order: "desc" },
]

const listDiscount = [
    { name: "Tăng dần", order: "asc" },
    { name: "Giảm dần", order: "desc" },
]

const FilterCus = () => {
    const [isDropdownBrand, setIsDropdownBrand] = useState(false)
    const [isDropdownPrice, setIsDropdownPrice] = useState(false)
    const [isDropdownDiscount, setIsDropdownDiscount] = useState(false)
    const { brand, setBrand, price, setPrice, discount, setDiscount } = useContext(GlobalContext) || {}

    const { data: listBrand, error, isLoading } = useSWR<BrandDetail[]>('/brand', fetcher, { refreshInterval: 1000 });

    const toggleDropdownBrand = () => {
        setIsDropdownBrand(!isDropdownBrand)
    }

    const toggleDropdownPrice = () => {
        setIsDropdownPrice(!isDropdownPrice)
    }

    const toggleDropdownDiscount = () => {
        setIsDropdownDiscount(!isDropdownDiscount)
    }

    return (
        <div className="lg:col-span-1 flex flex-col gap-3">
            <div className="flex flex-row text-gray-600 justify-between items-center">
                <div className="flex whitespace-nowrap items-center space-x-2">
                    <FaFilter size={20} />
                    <span className="font-semibold text-xl">Bộ lọc tìm kiếm</span>
                </div>
                {(brand || price || discount) && (
                    <button
                        className="text-lg hover:underline text-gray-500 font-medium"
                        onClick={() => {
                            if (setBrand && setPrice && setDiscount) {
                                setBrand(null)
                                setPrice(null)
                                setDiscount(null)
                            }
                        }}
                    >
                        Xóa lọc
                    </button>
                )}
            </div>
            <div className="relative">
                <ul className="py-2">
                    <li className="relative py-2">
                        <button className="
                                border-solid
                                border-2 
                                flex 
                                whitespace-nowrap 
                                justify-between
                                items-center 
                                w-full 
                                text-bg
                                p-3
                                rounded-md
                                transition
                                duration-500
                                text-gray-600
                                bg-white
                            "
                            type="button"
                            id="dropdownMenuButton"
                            data-dropdown-toggle="dropdown"
                            aria-expanded="false"
                            onClick={toggleDropdownBrand}
                        >
                            Chọn thương hiệu
                            <span>
                                {isDropdownBrand ?
                                    <AiFillCaretUp
                                        size={15}
                                        className="text-gray-400"
                                    />
                                    :
                                    <AiFillCaretDown
                                        size={15}
                                        className="text-gray-400"
                                    />}
                            </span>
                        </button>
                        <div
                            id="dropdown"
                            className={`
                                ${isDropdownBrand ? 'block' : 'hidden'}
                                z-10 
                            `}
                        >
                            <ul className="
                                    py-2 
                                    text-bg 
                                    font-semibold 
                                    uppercase
                                    
                                "
                                aria-labelledby="dropdownMenuButton"
                            >
                                {listBrand && listBrand.map((item, index) => (
                                    <li key={index}>
                                        <button
                                            className={`
                                                border-b-2 
                                                border-solid 
                                                block 
                                                py-2 
                                                whitespace-nowrap
                                                w-full
                                                text-left
                                                text-lg
                                                hover:text-primary-cus
                                                ${brand && brand.toString() === item._id.toString() ? "text-primary-cus" : "text-gray-600"}
                                            `}
                                            onClick={() => {
                                                if (setBrand && setPrice && setDiscount) {
                                                    setBrand(item._id)
                                                    setPrice(null)
                                                    setDiscount(null)
                                                }
                                            }}
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                </ul>
                <ul className="py-2">
                    <li className="relative py-2">
                        <button className="
                                border-solid
                                border-2 
                                flex 
                                whitespace-nowrap 
                                justify-between
                                items-center 
                                w-full 
                                text-bg
                                p-3
                                rounded-md
                                transition
                                duration-500
                                text-gray-600
                                bg-white
                            "
                            type="button"
                            id="dropdownMenuButton"
                            data-dropdown-toggle="dropdown"
                            aria-expanded="false"
                            onClick={toggleDropdownPrice}
                        >
                            Chọn giá tiền
                            <span>
                                {isDropdownPrice ?
                                    <AiFillCaretUp
                                        size={15}
                                        className="text-gray-400"
                                    />
                                    :
                                    <AiFillCaretDown
                                        size={15}
                                        className="text-gray-400"
                                    />}
                            </span>
                        </button>
                        <div
                            id="dropdown"
                            className={`
                                ${isDropdownPrice ? 'block' : 'hidden'}
                                z-10 
                            `}
                        >
                            <ul className="
                                    py-2 
                                    text-bg 
                                    font-semibold 
                                    uppercase
                                    
                                "
                                aria-labelledby="dropdownMenuButton"
                            >
                                {listPrice.map((item, index) => (
                                    <li key={index}>
                                        <button
                                            className={`
                                                border-b-2 
                                                border-solid 
                                                block 
                                                py-2 
                                                whitespace-nowrap
                                                w-full
                                                text-left
                                                text-lg
                                                hover:text-primary-cus
                                                ${price && price.toString() === item.order.toString() ? "text-primary-cus" : "text-gray-600"}
                                            `}
                                            onClick={() => {
                                                if (setBrand && setPrice && setDiscount) {
                                                    setBrand(null)
                                                    setPrice(item.order)
                                                    setDiscount(null)
                                                }
                                            }}
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                </ul>
                <ul className="py-2">
                    <li className="relative py-2">
                        <button className="
                                border-solid
                                border-2 
                                flex 
                                whitespace-nowrap 
                                justify-between
                                items-center 
                                w-full 
                                text-bg
                                p-3
                                rounded-md
                                transition
                                duration-500
                                text-gray-600
                                bg-white
                            "
                            type="button"
                            id="dropdownMenuButton"
                            data-dropdown-toggle="dropdown"
                            aria-expanded="false"
                            onClick={toggleDropdownDiscount}
                        >
                            Chọn giảm giá
                            <span>
                                {isDropdownDiscount ?
                                    <AiFillCaretUp
                                        size={15}
                                        className="text-gray-400"
                                    />
                                    :
                                    <AiFillCaretDown
                                        size={15}
                                        className="text-gray-400"
                                    />}
                            </span>
                        </button>
                        <div
                            id="dropdown"
                            className={`
                                ${isDropdownDiscount ? 'block' : 'hidden'}
                                z-10 
                            `}
                        >
                            <ul className="
                                    py-2 
                                    text-bg 
                                    font-semibold 
                                    uppercase
                                    
                                "
                                aria-labelledby="dropdownMenuButton"
                            >
                                {listDiscount.map((item, index) => (
                                    <li key={index}>
                                        <button
                                            className={`
                                                border-b-2 
                                                border-solid 
                                                block 
                                                py-2 
                                                whitespace-nowrap
                                                w-full
                                                text-left
                                                text-lg
                                                hover:text-primary-cus
                                                ${discount && discount.toString() === item.order.toString() ? "text-primary-cus" : "text-gray-600"}
                                            `}
                                            onClick={() => {
                                                if (setBrand && setPrice && setDiscount) {
                                                    setBrand(null)
                                                    setPrice(null)
                                                    setDiscount(item.order)
                                                }
                                            }}
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default FilterCus