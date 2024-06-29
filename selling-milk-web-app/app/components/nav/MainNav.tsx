"use client"

import { FaSearch } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { GlobalContext } from "@/contexts";
import { useUnauthorizeModal } from "@/hooks/useUnauthorize";
import { toast } from "react-toastify";

const MainNav = () => {
    const { user } = useContext(GlobalContext) || {}
    const unauthorizeModal = useUnauthorizeModal()

    return (
        <section className="flex flex-row gap-5 items-center">
            <div className="flex-shrink-0 relative">
                <Link href="/">
                    <Image
                        src="/images/logo_1.png"
                        alt="logo"
                        height={100}
                        width={100}
                        className="object-cover w-20 h-20"
                    />
                </Link>
            </div>
            <div className="flex flex-row bg-white rounded-sm text-lg w-full h-12 items-center">
                <input
                    placeholder="Nhập tìm kiếm sản phẩm"
                    className="py-2 px-4 text-gray-600 w-full focus:outline-none border-none hover:border-none focus:ring-0"
                />
                <div className="bg-primary-cus w-16 h-10 mr-1 flex items-center justify-center cursor-pointer">
                    <FaSearch size={25} color="white" />
                </div>
            </div>
            {!user ? (
                <button className="flex flex-shrink-0 items-center justify-center cursor-pointer" onClick={() => unauthorizeModal.onOpen()}>
                    <IoCartOutline size={40} color="white" />
                </button>
            ) : user.role === "admin" ? (
                <button className="flex flex-shrink-0 items-center justify-center cursor-pointer" onClick={() => toast.error("Admin don't allow user Cart", { position: "top-right" })}>
                    <IoCartOutline size={40} color="white" />
                </button>
            ) : (
                <Link className="flex flex-shrink-0 items-center justify-center cursor-pointer" href="/cart">
                    <IoCartOutline size={40} color="white" />
                </Link>
            )}
        </section>
    )
}

export default MainNav