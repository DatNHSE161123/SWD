"use client"

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/pagination';

import ProductOther from './ProductOther'
import React from 'react';
import { ListProduct } from '@/types';

const ProductCarousel: React.FC<ListProduct> = ({
    list
}) => {
    return (
        <Swiper
            modules={[Pagination]}
            spaceBetween={5}
            pagination={{ clickable: true }}
            loop={true}
            breakpoints={{
                640: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                },
                768: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                },
                1024: {
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                },
                1280: {
                    slidesPerView: 6,
                    slidesPerGroup: 6,
                },
            }}
        >
            {list.map((item) => (
                <SwiperSlide key={item._id}>
                    <ProductOther
                        _id={item._id}
                        imageUrl={item.imageUrl}
                        name={item.name}
                        sale={item.sale}
                        discount={item.discount}
                        price={item.price}

                        styleMargin={true}
                    />
                </SwiperSlide>
            ))}
            <div className="mt-10" />
        </Swiper>
    );
};

export default ProductCarousel
