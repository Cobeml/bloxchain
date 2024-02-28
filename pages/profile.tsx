import GameTokenWidget, { GameTokenWidgetProps } from "@/components/GameTokenWidget";
import GameWidget, { GameWidgetProps } from "@/components/GameWidget";
import ListWidget from "@/components/ListWidget";
import SplitWidget from "@/components/SplitWidget";
import { useMetaMask } from "@/components/hooks/useMetaMask";
import BasicButton from "@/components/utils/BasicButton";
import { GameAddressLocalhost } from "@/components/utils/GameABI";
import { getGame, getMyGames, getNFTData, listGame, redeem, splitGame } from "@/components/utils/utils";
import { useEffect, useState } from "react";



type GameResponse = { tokens: { id: number, balance: number, supply: number; address: string; }[], nfts: number[]; };
export default function Profile() {
    const [gameTokens, setGameTokens] = useState<GameTokenWidgetProps[]>([]);
    const [games, setGames] = useState<GameWidgetProps[]>([]);
    const [id, setId] = useState<number>(-1);
    const [showListModal, setShowListModal] = useState<boolean>(false);
    const [showSplitModal, setShowSplitModal] = useState<boolean>(false);
    const { wallet } = useMetaMask();
    useEffect(() => {
        if (wallet && wallet.accounts.length > 0) {
            getMyGames(wallet.accounts[0], GameAddressLocalhost).then((games: any) => {
                getStartingData(games);
            });
        }
    }, [wallet]);
    const getStartingData = async (games: GameResponse) => {
        const g: GameWidgetProps[] = [];
        for (const nft of games.nfts) {
            const data = await getGame(nft, GameAddressLocalhost);
            g.push({
                name: data.name,
                description: data.description,
                imgSrc: data.imgSrc,
                num: nft,
            });
        }
        setGames(g);
        const gg: GameTokenWidgetProps[] = [];
        for (const { id, balance, supply, address } of games.tokens) {
            const data = await getGame(id, GameAddressLocalhost);
            gg.push({
                name: data.name,
                description: data.desciption,
                imgSrc: data.imgSrc,
                balance,
                supply,
                address,
                num: id,
            });
        }
        setGameTokens(gg);
    };
    const split = (id: number) => {
        setId(id);
        setShowSplitModal(true);
    };

    const list = (id: number) => {
        setId(id);
        setShowListModal(true);
    };
    const close = () => {
        setShowListModal(false);
        setShowSplitModal(false);
        setId(-1);
    };
    const sendSplit = async (supply: number, name: string, symbol: string) => {
        if (id === -1) return;
        console.log({ id, supply, name, symbol });
        await splitGame(id, supply, name, symbol, GameAddressLocalhost);
        window.location.reload();
    };
    const sendList = async (price: number, sellToken: string) => {
        if (id === -1) return;
        await listGame(false, 0, id, price, sellToken, GameAddressLocalhost);
        window.location.reload();
    };
    return (
        <div className="flex flex-col justify-center items-center">
            {
                games.length === 0 ?
                    <p>{`You don't own any games...`}</p>
                    :
                    <>
                        <p>Games Owned</p>
                        {games.map((game) => {
                            return (
                                <div key={game.num} className="flex flex-col justify-center items-center gap-2">
                                    <GameWidget {...game} />
                                    <div className="flex flex-row justify-center items-center gap-2">
                                        <BasicButton onClick={() => split(game.num)} text="Split" />
                                        <BasicButton onClick={() => list(game.num)} text="List" />
                                    </div>
                                </div>
                            );

                        })}
                    </>
            }
            {gameTokens.length === 0 ?
                <p>{`You don't own any game tokens...`}</p>
                :
                <>
                    <p>Game Tokens Owned</p>
                    {gameTokens.map((token) => {
                        return (
                            <div key={token.num} className="flex flex-col justify-center items-center gap-2">
                                <GameTokenWidget key={token.num} {...token} />
                                <div className="flex flex-row justify-center items-center gap-2">
                                    {token.balance === token.supply && <BasicButton onClick={() => redeem(token.num, token.address, GameAddressLocalhost)} text="Redeem" />}
                                </div>
                            </div>
                        );
                    })}
                </>
            }
            {showSplitModal && <SplitWidget onClose={close} submit={sendSplit} />}
            {showListModal && <ListWidget onClose={close} submit={sendList} />}
        </div>
    );
}
