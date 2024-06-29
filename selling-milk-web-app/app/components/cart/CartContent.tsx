"use client"

import { removeProductFromCartService, updateQuantity } from "@/services/cart";
import { CartData } from "@/types";
import { formatCurrency } from "@/utils/format";
import { validateURLProduct } from "@/utils/validData";
import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

const CartContent: React.FC<CartData> = ({
    _id,
    product,
    quantity,
    userId
}) => {
    const [quantities, setQuantities] = useState<number>(quantity);

    const decreaseQuantity = async () => {
        if (quantities > 1) {
            const newQuantity = quantities - 1
            await updateQuantity(_id, product._id, newQuantity)
            await mutate(`/cart?userId=${userId}`)
            setQuantities(newQuantity)
        }
    };

    const increaseQuantity = async () => {
        if (quantity < product.totalStock) {
            const newQuantity = quantities + 1
            await updateQuantity(_id, product._id, newQuantity)
            await mutate(`/cart?userId=${userId}`)
            setQuantities(newQuantity)
        } else {
            toast.info(`Chỉ còn có ${product.totalStock} sản phẩm`, {
                position: "top-right"
            })
        }
    };

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let newQuantity = Number(e.target.value)

        if (newQuantity > product.totalStock) {
            toast.info(`Chỉ còn có ${product.totalStock} sản phẩm`, {
                position: "top-right"
            })
            newQuantity = product.totalStock;
        }

        if (newQuantity < 1) {
            newQuantity = 1
        }

        await updateQuantity(_id, product._id, newQuantity);
        await mutate(`/cart?userId=${userId}`)
        setQuantities(newQuantity)
    }

    const handleRemoveProduct = async (productId: string) => {
        const res = await removeProductFromCartService(userId, productId);

        if (res.data == null) {
            toast.error("Delete don't complete", {
                position: "top-right"
            })
            return
        }

        toast.success("Xóa thành công", {
            position: "top-right"
        })

        await mutate(`/cart?userId=${userId}`)
    }

    return (
        <>
            <section className="grid grid-cols-12 gap-2 items-center p-8" key={_id}>
                <Link className="col-span-5" href={`/product/detail-product/${product._id}`}>
                    <div className="w-full flex flex-row gap-2 items-start">
                        <div className="relative flex-shrink-0 w-32 h-32">
                            <Image
                                src={validateURLProduct(product.imageUrl)}
                                alt="product"
                                className="w-32 h-32 object-cover"
                                width={128}
                                height={128}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="text-xl hover:text-primary-cus">
                                {product.name}
                            </div>
                            {product.discount > 0 && (
                                <div className="p-1 text-sm bg-primary-cus text-white w-fit font-semibold">
                                    {product.discount}% Giảm
                                </div>
                            )}
                            {product.sale >= 100 && (
                                <div className="p-1 text-sm text-red-500 border border-red-500 w-fit font-semibold">
                                    Đang bán chạy
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
                {product.discount ? (
                    <div className="col-span-2 flex flex-row gap-2 items-center justify-center">
                        <span className="line-through">
                            {formatCurrency(product.price ? product.price : 0)}
                        </span>
                        <span className="text-xl font-semibold text-primary-cus">
                            {formatCurrency(product.price ? (product.price * (1 - product.discount / 100)) : 0)}
                        </span>
                    </div>
                ) : (
                    <div className="col-span-2 text-center">
                        {formatCurrency(product.price ? product.price : 0)}
                    </div>
                )}
                <div className="col-span-2 flex justify-center">
                    {product.totalStock <= quantities ? (
                        <div className="flex flex-row gap-3 items-center text-red-500 text-center font-semibold text-lg">
                            Sản phẩm không còn hàng
                        </div>
                    ) : (
                        <div className="flex flex-row gap-3 items-center">
                            <div className="flex flex-row text-md text-gray-600 font-semibold border border-black border-opacity-10 w-fit">
                                <button className="border border-r border-black border-opacity-10 px-4" onClick={decreaseQuantity}>
                                    -
                                </button>
                                <input
                                    type="number"
                                    className="w-12 text-center py-1"
                                    value={quantities}
                                    onChange={handleInputChange}
                                />
                                <button className="border border-l border-black border-opacity-10 px-4" onClick={increaseQuantity}>
                                    +
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {product.discount > 0 ? (
                    <div className="col-span-2 text-center text-primary-cus text-xl font-semibold">
                        {formatCurrency(product.price ? (product.price * quantities * (1 - product.discount / 100)) : 0)}
                    </div>
                ) : (
                    <div className="col-span-2 text-center text-primary-cus text-xl font-semibold">
                        {formatCurrency(product.price ? (product.price * quantities) : 0)}
                    </div>
                )}
                <button className="col-span-1 text-primary-cus cursor-pointer text-center" onClick={() => handleRemoveProduct(product._id)}>
                    Xóa
                </button>
            </section>
            <div className="border border-b border-black border-opacity-10 relative w-full" />
        </>
    )
}

export default CartContent