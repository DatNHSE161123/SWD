"use client"

import React, { useEffect, useState } from "react";
import Layout from "@/app/layout";
import { settingOptions } from "@/utils/constants";
import { useRouter } from "next/router";
import SettingOverview from "./SettingOverview"
import Container from "../../hero/Container";

export interface LayoutProps {
    children: React.ReactNode
}

const SettingLayout: React.FC<LayoutProps> = ({
    children
}) => {
    const [selectedOption, setSelectedOption] = useState<number>(1);

    const router = useRouter()

    useEffect(() => {
        switch (router.pathname) {
            case '/user/setting-profile':
                setSelectedOption(1);
                break;
            case '/user/setting-security':
                setSelectedOption(2);
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
                router.push('/user/setting-profile');
                break;
            case 2:
                router.push('/user/setting-security');
                break;
        }
    };

    return (
        <Layout>
            <Container>
                <div className="relative py-5">
                    <div className="
                            flex
                            flex-col
                            lg:grid 
                            lg:grid-cols-8 
                            lg:h-fit 
                            gap-5
                        "
                    >
                        <div className="
                                h-full 
                                rounded-xl 
                                lg:col-span-2
                                bg-white 
                                lg:block
                            "
                        >
                            <SettingOverview
                                options={settingOptions}
                                selectedOption={selectedOption}
                                onOptionSelect={handleOptionSelect}
                            />
                        </div>
                        <div className="lg:col-span-6 h-fit bg-white rounded-xl">
                            {children}
                        </div>
                    </div>
                </div>
            </Container>
        </Layout>
    )
}

export default SettingLayout;
