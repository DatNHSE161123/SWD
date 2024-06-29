"use client"

const BannerIntro = () => {
    return (
        <div className="lg:col-span-2 pb-5">
            <div className="
                    flex 
                    flex-col 
                    text-white 
                    gap-5
                    justify-center
                    items-center
                    max-w-xl
                    lg:max-w-md 
                    lg:items-baseline
                    transition-all
                    duration-500
                "
            >
                <h1 className="
                        xl:text-5xl
                        xl:leading-tight
                        lg:text-4xl
                        lg:text-left
                        md:text-5xl
                        md:leading-tight
                        text-4xl
                        text-center
                        font-semibold 
                        uppercase
                        transition-all
                        duration-500
                    "
                >
                    Bạn muốn đại lý bán sữa?
                </h1>
                <p className="
                        text-gray-300
                        text-lg
                        text-center 
                        lg:text-left
                        transition-all
                        duration-500
                    "
                >
                    XXXXX là trang mạng thương mại điện tử, quản lý những cửa hàng bán sữa. Tại đây, chúng tôi có các loại mặt hàng về sữa, từ bán sĩ tới bán lẽ, giá cả từ đắt tới rẻ, đều có, đảm bảo chất lượng
                </p>
            </div>
        </div>
    )
}

export default BannerIntro