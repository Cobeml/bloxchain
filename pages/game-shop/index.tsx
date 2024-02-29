import GameListingWidget, { GameListingWidgetProps } from "@/components/GameListingWidget";
import { GameAddressLocalhost } from "@/components/utils/GameABI";
import { buyGame, getGame, viewListedGames } from "@/components/utils/utils";
import { useEffect, useState } from "react";


export default function GameShop() {
    const [listings, setListings] = useState<GameListingWidgetProps[]>([]);
    useEffect(() => {
        viewListedGames(GameAddressLocalhost).then((listings) => {
            setup(listings);
        });
    }, []);
    const setup = async (listings: any[]) => {
        const ls: GameListingWidgetProps[] = [];
        for (const listing of listings) {
            const id = Number(listing[0]);
            const isToken = listing[1];
            const amount = listing[2];
            const gameId = listing[3];
            const price = listing[4];
            const tokenAddress = listing[5];
            const sellToken = listing[6];
            const seller = listing[7];
            const gameData = await getGame(gameId, GameAddressLocalhost);
            const l: GameListingWidgetProps = {
                id,
                isToken,
                amount,
                price,
                tokenAddress,
                sellToken,
                seller,
                gameId,
                description: gameData.desciption,
                name: gameData.name,
                imgSrc: gameData.imgSrc
            };
            ls.push(l);
        }
        setListings(ls);
    };
    const buy = async (id: number, price: number, sellToken: string) => {
        await buyGame(id, price, sellToken, GameAddressLocalhost);
    };
    return (
        <div className="flex flex-col items-center justify-start h-screen p-4 w-screen" style={{ height: '90vh' }}>
            <div className="w-full flex-grow bg-gray-800 overflow-auto p-4 rounded-lg mx-6 mb-6">
                <>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-white">Games Listings</p>
                        <input
                            type="text"
                            placeholder="Search Listings..."
                            className="rounded-full border-2 border-gray-300 bg-white p-2"
                        />
                    </div>
                    <div className="flex flex-row justify-center items-center w-full">
                        {listings.length == 0 ?
                            <div className="text-white"> No game listings for sale </div>
                            :
                            <div className="grid grid-cols-4 place-items-center items-center gap-4">
                                {listings.map((listing, i: number) => <GameListingWidget buy={() => buy(listing.id, listing.price, listing.sellToken)} key={i} {...listing} />)}
                            </div>
                        }
                    </div>
                </>
            </div>
        </div>
    );
}