import { useState } from "react";
import { User } from "./utils/crypto";

type UserWidgetProps = {
    user: User;
    real: boolean;
    showEditWindow: (data: { [key: string]: number; }) => void;
};
export default function UserWidget({ user, real, showEditWindow }: UserWidgetProps) {
    return (
        <div
            className="user-item relative w-24 aspect-square flex flex-row justify-center items-center gap-2 bg-gray-600 border-gray-400 rounded-lg border hover:brightness-90 active:brightness-75"
            onClick={() => showEditWindow(user.data)}
        >
            <div className="user-preview-container absolute w-24 bottom-full rounded-lg border border-gray-400 bg-gray-600 hidden mb-2">
                {Object.entries(user.data).map(([key, value]: [string, number], i: number) => {
                    return (
                        <div key={i} className="flex flex-row justify-center items-center gap-2">
                            <p>{key}</p>
                            <p>{value}</p>
                        </div>
                    );
                })}
            </div>
            <p>User</p>
            {!real && <p>Click to edit</p>}
        </div>
    );
}