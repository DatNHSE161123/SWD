const SettingSecurity = () => {
    return (
        <div className="relative p-8 flex flex-col gap-5 h-[570px]">
            <div className="text-gray-600 text-2xl md:text-3xl font-semibold">Bảo mật</div>
            <div className="border border-black border-opacity-10" />
            <div className="flex flex-row justify-between items-center text-lg md:text-xl">
                <div className="font-semibold text-gray-600">
                    Thay đổi mật khẩu
                </div>
                <button className="text-primary-blue-cus cursor-pointer hover:underline" type="button">
                    Chỉnh sửa
                </button>
            </div>
            <div className="flex flex-row justify-between items-center text-lg md:text-xl">
                <div className="font-semibold text-gray-600">
                    Thay đổi email
                </div>
                <button className="text-primary-blue-cus cursor-pointer hover:underline">
                    Chỉnh sửa
                </button>
            </div>
        </div>
    )
}

export default SettingSecurity