"use client"

import CartAction from '@/app/components/cart/CartAction'
import CartContent from '@/app/components/cart/CartContent'
import CartOverview from '@/app/components/cart/CartOverview'
import Container from '@/app/components/hero/Container'
import { LoadingFullScreen } from '@/app/components/providers/loader'
import ModalContinuePayment from '@/app/components/providers/modal/transaction/ModalContinuePayment'
import ProductExtra from '@/app/components/providers/products/ProductExtra'
import Layout from '@/app/layout'
import { GlobalContext } from '@/contexts'
import axiosInstance from '@/lib/axios'
import { CartItem } from '@/types'
import Image from 'next/image'
import { useContext } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data);

const Cart = () => {
    const { user } = useContext(GlobalContext) || {}

    const { data, error, isLoading } = useSWR<CartItem>(user ? `/cart?userId=${user._id}` : null, fetcher, { refreshInterval: 1000 });

    return (
        <Layout>
            <ModalContinuePayment />
            <Container>
                <div className="relative py-5 flex flex-col gap-3">
                    <CartOverview />
                    <section className="bg-white border border-black border-opacity-10 rounded-sm shadow-sm">
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
                        ) : !data || data.items?.length === 0 ? (
                            <div className="w-full relative flex flex-col space-x-3 items-center justify-center h-80 text-primary-blue-cus">
                                <p className="md:text-4xl text-3xl font-semibold">Vui lòng mua hàng!!!</p>
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
                            data.items?.map((item) => (
                                <CartContent
                                    key={item._id}
                                    _id={data._id}
                                    userId={user ? user._id : "1"}
                                    product={item.product}
                                    quantity={item.quantity}
                                />
                            ))
                        )}
                    </section>
                    {!data ? (
                        <CartAction total={0} _id={user ? user._id : "1"} countProduct={0} />
                    ) : (
                        (() => {
                            const items = data.items;
                            const total = items?.reduce((acc, item) => {
                                const price = item.product.price || 0;
                                const discount = item.product.discount || 0;
                                const discountedPrice = price * (1 - discount / 100);
                                return acc + discountedPrice * item.quantity;
                            }, 0);
                            const countProduct = items?.length;
                            const address = user ? user.address : ""
                            const phone = user ? user.phone : ""
                            return <CartAction total={total} _id={user ? user._id : "1"} countProduct={countProduct} address={address} phone={phone} />;
                        })()
                    )}
                </div>
                <ProductExtra />
            </Container>
        </Layout>
    )
}

export default Cart