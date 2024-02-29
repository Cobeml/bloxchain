import React from "react";

export default function DevButton({ onClick, text }: { onClick: () => any, text: string; }) {
    return (
        <button
            onClick={onClick}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded"
        >
            {text}
        </button>
    );
}