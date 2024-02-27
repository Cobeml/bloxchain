import { GameAddressLocalhost } from "@/components/utils/GameABI";
import { useMetaMask } from "@/components/hooks/useMetaMask";
import { getAllGames } from "@/components/utils/utils";
import { useEffect, useState } from "react";

export default function Play() {
    const { wallet } = useMetaMask();
    const [games, setGames] = useState<{ name: string, num: number; }[]>([]);
    useEffect(() => {
        if (wallet && wallet.accounts.length > 0) {
            getAllGames(GameAddressLocalhost).then((games) => {
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
        <div className="flex flex-row justify-center items-center w-full">
            {games.length == 0 ?
                <div> No games created yet </div>
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
    );
}