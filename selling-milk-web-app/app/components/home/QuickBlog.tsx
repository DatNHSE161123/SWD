import Image from "next/image"
import Container from "../hero/Container"

const QuickBlog = () => {
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
                            Kinh Nghiệm Cho mẹ
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
                <div className="w-full">
                    <div className="grid grid-cols-2 gap-3">
                        <section className="col-span-1 bg-white border border-black border-opacity-10 rounded-lg hover:border-primary-cus cursor-pointer">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="col-span-1">
                                    <div className="relative w-fit h-full rounded-lg">
                                        <Image
                                            src="/images/blog_1.jpg"
                                            alt="blog"
                                            className="w-fit h-full object-fill rounded-lg"
                                            width={480}
                                            height={208}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-1 py-2 px-1">
                                    <div className="flex flex-col gap-2 justify-between">
                                        <label className="text-primary-cus line-clamp-2 text-xl font-semibold">Làm sao để trẻ tăng cân toàn diện</label>
                                        <p className="text-opacity-80 line-clamp-4">
                                            Vấn đề cân nặng của con trẻ luôn là mối quan tâm hàng đầu của các bậc cha mẹ. Nhưng chắc hẳn nhiều cha mẹ vẫn chưa biết nên chọn loại sữa tăng cân cho trẻ như thế nào và làm sao để trẻ có thể phát triển một cách toàn diện nhất.
                                        </p>
                                        <div className="flex flex-row gap-1 text-primary-cus text-lg">
                                            <span>Người đăng: </span>
                                            <span>Admin</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="col-span-1 bg-white border border-black border-opacity-10 rounded-lg hover:border-primary-cus cursor-pointer">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="col-span-1">
                                    <div className="relative w-fit h-full rounded-lg">
                                        <Image
                                            src="/images/blog_1.jpg"
                                            alt="blog"
                                            className="w-fit h-full object-fill rounded-lg"
                                            width={480}
                                            height={208}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-1 py-2 px-1">
                                    <div className="flex flex-col gap-2 justify-between">
                                        <label className="text-primary-cus line-clamp-2 text-xl font-semibold">Làm sao để trẻ tăng cân toàn diện</label>
                                        <p className="text-opacity-80 line-clamp-4">
                                            Vấn đề cân nặng của con trẻ luôn là mối quan tâm hàng đầu của các bậc cha mẹ. Nhưng chắc hẳn nhiều cha mẹ vẫn chưa biết nên chọn loại sữa tăng cân cho trẻ như thế nào và làm sao để trẻ có thể phát triển một cách toàn diện nhất.
                                        </p>
                                        <div className="flex flex-row gap-1 text-primary-cus text-lg">
                                            <span>Người đăng: </span>
                                            <span>Admin</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default QuickBlog