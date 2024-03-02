import { useState } from "react";

export type GameTokenWidgetProps = {
    name: string;
    description: string;
    imgSrc: string;
    balance: number;
    supply: number;
    num: number;
    address: string;
};
export default function GameTokenWidget({ name, description, imgSrc, balance, supply, num }: GameTokenWidgetProps) {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div className="relative hover:cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => window.location.href = `/play/${num}`}
        >
            <div className="flex items-center space-x-4 bg-white shadow-lg p-4 rounded-lg">
                <img src={imgSrc} alt={`Token for ${name}`} className="w-16 h-16 rounded-full object-cover" />
                <div>
                    <p className="text-lg font-bold">{name} #{num}</p>
                    {!isHovered && (
                        <>
                            <p className="text-sm">Balance: {balance}</p>
                            <p className="text-sm">Supply: {supply}</p>
                        </>
                    )}
                </div>
            </div>
            {isHovered && (
                <div className="absolute inset-0 bg-black bg-opacity-75 flex justify-center items-center rounded-lg p-4">
                    <p className="text-white text-center">{description}</p>
                </div>
            )}
        </div>
    );
}