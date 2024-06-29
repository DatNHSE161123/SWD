const CartOverview = () => {
    return (
        <section className="grid grid-cols-12 gap-2 bg-white border border-black border-opacity-10 text-gray-500 py-3 px-8 rounded-sm shadow-sm">
            <div className="col-span-5">
                Sản Phẩm
            </div>
            <div className="col-span-2 text-center">
                Đơn Giá
            </div>
            <div className="col-span-2 text-center">
                Số Lượng
            </div>
            <div className="col-span-2 text-center">
                Số Tiền
            </div>
            <div className="col-span-1 text-center">
                Thao Tác
            </div>
        </section>
    )
}

export default CartOverview