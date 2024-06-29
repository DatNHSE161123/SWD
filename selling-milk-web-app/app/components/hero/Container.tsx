export interface LayoutProps {
    children: React.ReactNode
}
const Container: React.FC<LayoutProps> = ({
    children
}) => {
    return (
        <div
            className="
                max-w-[2520px]
                py-2
                lg:px-60
                md:px-40
                sm:px-20
                px-0
                transition-all
                duration-500
            "
        >
            {children}
        </div>
    )
}

export default Container