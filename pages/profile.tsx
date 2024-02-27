import { useMetaMask } from "@/components/hooks/useMetaMask";
import BasicButton from "@/components/utils/BasicButton";
import { GameAddressLocalhost } from "@/components/utils/GameABI";
import { getMyGames } from "@/components/utils/utils";
import { useEffect, useState } from "react";


export default function Profile() {
    const [gamesOwned, setGamesOwned] = useState<{ tokens: { id: number, balance: number, supply: number; }[], nfts: number[]; }>();
    const { wallet } = useMetaMask();
    useEffect(() => {
        if (wallet && wallet.accounts.length > 0) {
            getMyGames(wallet.accounts[0], GameAddressLocalhost).then((games: any) => {
                setGamesOwned(games);
            });
        }
    }, [wallet]);
    const split = (id: number) => {

    };
    return (
        <div className="flex flex-col justify-center items-center">
            <p>Profile</p>
            <p>Games Owned</p>
            {gamesOwned?.nfts.map((id: number) => <GameWidget key={id} id={id} split={split} />)}
            <p>Game Tokens Owned</p>
            {gamesOwned?.tokens.map((token) => <GameTokenWidget key={token.id} token={token} />)}
        </div>
    );
}

function GameWidget({ id, split }: { id: number; split: (id: number) => void; }) {
    return (
        <div className="flex flex-col justify-center items-center" onClick={() => window.location.href = `/play/${id}`}>
            <p>{id}</p>
            <BasicButton onClick={() => split(id)} text="Split" />
        </div>
    );
}

function GameTokenWidget({ token }: { token: { id: number, balance: number, supply: number; }; }) {
    return (
        <div className="flex flex-col justify-center items-center" onClick={() => window.location.href = `/play/${token.id}`}>
            <p>{token.id}</p>
            <p>{`${token.balance} / ${token.supply}`}</p>
        </div>
    );
}