import GameTokenWidget, { GameTokenWidgetProps } from "@/components/GameTokenWidget";
import GameWidget, { GameWidgetProps } from "@/components/GameWidget";
import ListWidget from "@/components/ListWidget";
import SplitWidget from "@/components/SplitWidget";
import { useMetaMask } from "@/components/hooks/useMetaMask";
import { useSwitchNetwork } from "@/components/hooks/useSwitchNetwork";
import BasicButton from "@/components/utils/BasicButton";
import { getGame, getMyGames, getNFTData, listGame, redeem, splitGame } from "@/components/utils/utils";
import { useEffect, useState } from "react";



type GameResponse = { tokens: { id: number, balance: number, supply: number; address: string; }[], nfts: number[]; };
export default function Profile() {
    const [gameTokens, setGameTokens] = useState<GameTokenWidgetProps[]>([]);
    const [games, setGames] = useState<GameWidgetProps[]>([]);
    const [id, setId] = useState<number>(-1);
    const [showListModal, setShowListModal] = useState<boolean>(false);
    const [showSplitModal, setShowSplitModal] = useState<boolean>(false);
    const { contractAddress } = useSwitchNetwork();
    const { wallet } = useMetaMask();
    useEffect(() => {
        if (wallet && wallet.accounts.length > 0) {
            console.log(":)")
            getMyGames(wallet.accounts[0], contractAddress).then((games: any) => {
                console.log(games);
                getStartingData(games);
            });
        }
        console.log(":(")
    }, [wallet]);
    const getStartingData = async (games: GameResponse) => {
        const g: GameWidgetProps[] = [];
        for (const nft of games.nfts) {
            const data = await getGame(nft, contractAddress);
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
            const data = await getGame(id, contractAddress);
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
        await splitGame(id, supply, name, symbol, contractAddress);
        window.location.reload();
    };
    const sendList = async (price: number, sellToken: string) => {
        if (id === -1) return;
        await listGame(false, 0, id, price, sellToken, contractAddress);
        window.location.reload();
    };
    return (
        <div className="flex flex-col items-center justify-start h-screen p-4 w-screen" style={{ height: '90vh' }}>
            {/* Games Owned Section */}
            <div className="w-full h-1/2 bg-gray-800 overflow-auto p-4 rounded-lg mx-6">
                <>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-white">Games Owned</p>
                        <input
                            type="text"
                            placeholder="Search Games..."
                            className="rounded-full border-2 border-gray-300 bg-white p-2"
                        />
                    </div>
                    {games.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-4">
                            {games.map((game) => (
                                <div key={game.num} className="flex flex-col items-center gap-2">
                                    <GameWidget {...game} />
                                    <div className="flex gap-2">
                                        <BasicButton onClick={() => split(game.num)} text="Split" />
                                        <BasicButton onClick={() => list(game.num)} text="List" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-white text-center">You {`don't`} own any games...</p>
                    )}
                </>
            </div>
            <br />
            {/* Game Tokens Owned Section */}
            <div className="w-full h-1/2 bg-gray-800 overflow-auto p-4 rounded-lg mx-6 mb-6">
                <>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-white">Game Tokens Owned</p>
                        <input
                            type="text"
                            placeholder="Search Tokens..."
                            className="rounded-full border-2 border-gray-300 bg-white p-2"
                        />
                    </div>
                    {gameTokens.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-4">
                            {gameTokens.map((token) => (
                                <div key={token.num} className="flex flex-col items-center gap-2">
                                    <GameTokenWidget {...token} />
                                    {token.balance === token.supply && (
                                        <BasicButton onClick={() => redeem(token.num, token.address, contractAddress)} text="Redeem" />
                                    )}
                                </div>
                            ))}
                        </div>) : (
                        <p className="text-white text-center">You {`don't`} own any game tokens...</p>
                    )}
                </>
            </div>
            {showSplitModal && <SplitWidget onClose={close} submit={sendSplit} />}
            {showListModal && <ListWidget onClose={close} submit={sendList} />}
        </div>
    );
}
