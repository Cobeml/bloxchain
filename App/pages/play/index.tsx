import { useMetaMask } from "@/components/hooks/useMetaMask";
import { useSwitchNetwork } from "@/components/hooks/useSwitchNetwork";
import { getAllGames } from "@/components/utils/utils";
import { useEffect, useState } from "react";

export default function Play() {
    const { wallet } = useMetaMask();
    const [games, setGames] = useState<{ name: string, num: number; }[]>([]);
    const { contractAddress } = useSwitchNetwork();
    useEffect(() => {
        if (wallet && wallet.accounts.length > 0) {
            getAllGames(contractAddress).then((games) => {
                const names = games[0];
                const nums = games[1];
                let g: { name: string, num: number; }[] = [];
                for (let i = 0; i < names.length; i++) {
                    g.push({ name: names[i], num: nums[i] });
                }
                setGames(g);
                console.log(g);
            });
        }
    }, [wallet]);
    return (
        <div className="flex flex-col items-center justify-start h-screen p-4 w-screen" style={{ height: '90vh' }}>
            <div className="w-full flex-grow bg-gray-800 overflow-auto p-4 rounded-lg mx-6 mb-6">
                <>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-white">Games to Play</p>
                        <input
                            type="text"
                            placeholder="Search Games..."
                            className="rounded-full border-2 border-gray-300 bg-white p-2"
                        />
                    </div>
                    <div className="flex flex-row justify-center items-center w-full">
                        {games.length == 0 ?
                            <div className="text-white"> No games created yet </div>
                            :
                            <div className="flex flex-col justify-center items-center">
                                {games.map(({ name, num }, i: number) => {
                                    return (
                                        <button
                                            className="border border-black p-4 bg-gray-400"
                                            key={i}
                                            onClick={() => window.location.href = `/play/${num}`}
                                        >
                                            {name}
                                        </button>
                                    );
                                })}
                            </div>
                        }
                    </div>
                </>
            </div>
        </div>
    );
}