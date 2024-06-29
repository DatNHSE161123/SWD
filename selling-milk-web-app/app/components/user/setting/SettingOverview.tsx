import { OptionsOverviewProps } from "@/types";
import Image from "next/image";

const SettingOverview: React.FC<OptionsOverviewProps> = ({
    options,
    onOptionSelect,
    selectedOption
}) => {
    return (
        <div className="
                flex 
                lg:flex-col 
                lg:justify-normal 
                lg:p-4
                px-6 
                justify-between
                flex-row 
                py-4 
                gap-5
            "
        >
            <div className="text-gray-500 text-xl md:block hidden mb-10">
                <div className="flex flex-row gap-2 items-center">
                    <div className="flex-shrink-0 relative w-20 h-20 rounded-full">
                        <Image 
                            src="/images/avatar_1.jpg"
                            alt="avatar"
                            className="w-20 h-20 rounded-full"
                            width={80}
                            height={80}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-black font-semibold">
                            NGUYEN THI A
                        </div>
                    </div>
                </div>
            </div>
            {options.map((option) => (
                <button
                    key={option.id}
                    className={`flex flex-row space-x-2 font-semibold items-center cursor-pointer hover:text-primary-cus ${selectedOption === option.id ? 'text-primary-cus font-semibold' : ''}`}
                    onClick={() => onOptionSelect(option.id)}
                >
                    <option.icon size={25} />
                    <span className="text-xl text-left sm:block hidden">{option.label}</span>
                </button>
            ))}
        </div>
    )
}

export default SettingOverview