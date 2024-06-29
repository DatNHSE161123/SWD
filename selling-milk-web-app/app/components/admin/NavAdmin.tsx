import Image from "next/image"
import Link from "next/link"

const NavAdmin = () => {
    return (
        <div className="relative w-full h-20 flex items-center justify-center bg-white shadow-sm">
            <Link href="/admin/admin-home">
                <section className="flex items-center">
                    <Image
                        height={80}
                        src="/images/logo_1.png"
                        alt="logo"
                        className="object-contain w-20 h-20"
                        width={80}
                    />
                    <h1 className="uppercase text-xl font-semibold text-[#343B63]">
                        VBM SPORTS
                    </h1>
                </section>
            </Link>
        </div>
    )
}

export default NavAdmin