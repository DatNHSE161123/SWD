"use client"

import Container from "../hero/Container";
import MainNav from "./MainNav";
import SubNav from "./SubNav";

interface NavbarProps {
    style?: boolean | true
}

const Navbar: React.FC<NavbarProps> = ({
    style
}) => {
    return (
        <div className={`relative w-full z-[9999] ${style ? "mb-28" : ""}`}>
            <div className={`bg-gradient-to-t from-orange-1 to-orange-2 w-full ${style ? "fixed" : ""} top-0`}>
                <Container>
                    <div className="flex flex-col gap-1">
                        <SubNav />
                        <MainNav />
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Navbar