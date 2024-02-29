import React from "react";

interface DevButtonProps {
    onClick: () => void;
    text: string;
    className?: string; // Optional className prop for custom styling
}

const DevButton: React.FC<DevButtonProps> = ({ onClick, text, className }) => {
    const buttonClassName = `text-transparent bg-clip-text font-bold py-2 px-4 border border-purple-500 hover:border-pink-500 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 ${className}`;
    return (
        <button
            onClick={onClick}
            className={buttonClassName}
        >
            {text}
        </button>
    );
};

export default DevButton;