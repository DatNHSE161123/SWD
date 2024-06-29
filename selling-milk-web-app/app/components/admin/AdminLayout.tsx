"use client"

import { adminOptions } from "@/utils/constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavAdmin from "./NavAdmin";
import AdminOverview from "./AdminOverview";
import AdminLogout from "./AdminLogout";

export interface LayoutProps {
    children: React.ReactNode
}

const AdminLayout: React.FC<LayoutProps> = ({
    children
}) => {
    const [selectedOption, setSelectedOption] = useState<number>(1)
    const router = useRouter()

    useEffect(() => {
        switch (router.pathname) {
            case '/admin/user-management':
                setSelectedOption(1);
                break;
            case '/admin/product-management':
                setSelectedOption(2);
                break;
            case '/admin/transaction-management':
                setSelectedOption(3);
                break;
            case '/admin/report-management':
                setSelectedOption(4);
                break;
            case '/admin/blog-management':
                setSelectedOption(5);
                break;
            default:
                setSelectedOption(0);
                break;
        }
    }, [router.pathname]);

    const handleOptionSelect = (id: number) => {
        setSelectedOption(id)
        switch (id) {
            case 1:
                router.push('/admin/user-management');
                break;
            case 2:
                router.push('/admin/product-management');
                break;
            case 3:
                router.push('/admin/transaction-management');
                break;
            case 4:
                router.push('/admin/report-management');
                break;
            case 5:
                router.push('/admin/blog-management');
                break;
        }
    };

    return (
        <div className="relative bg-[#F7F7F7]">
            <NavAdmin />
            <div className="
                    relative 
                    gap-5
                    pt-5 
                    flex
                    flex-col
                    lg:grid 
                    lg:grid-cols-5 
                "
            >
                <div className="
                        lg:col-span-1 
                        lg:min-h-screen 
                        lg:max-h-full 
                        lg:flex 
                        lg:flex-col 
                        lg:gap-5 
                    "
                >
                    <AdminOverview
                        options={adminOptions}
                        selectedOption={selectedOption}
                        onOptionSelect={handleOptionSelect}
                    />
                    <AdminLogout />
                </div>
                <div className="
                        lg:col-span-4 
                        min-h-screen 
                        max-h-full 
                        flex 
                        flex-col 
                        gap-5 
                        border 
                        border-black 
                        border-opacity-10 
                        bg-white rounded-xl
                    "
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout