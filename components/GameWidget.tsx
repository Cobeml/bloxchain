import { useState } from "react";
import BasicButton from "./utils/BasicButton";

export type GameWidgetProps = {
    name: string;
    description: string;
    imgSrc: string;
    num: number;
};
export default function GameWidget({ name, description, imgSrc, num }: GameWidgetProps) {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div
            className="relative inline-block hover:cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => window.location.href = `/play/${num}`}
        >
            <img src={imgSrc} alt={name} className="w-64 h-40 object-cover rounded-lg shadow-lg" />
            {isHovered && (
                <div className="absolute inset-0 bg-black bg-opacity-75 flex justify-center items-center rounded-lg p-4">
                    <div className="text-white text-center">
                        <p className="font-bold text-xl mb-2">{name}</p>
                        <p>{description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}