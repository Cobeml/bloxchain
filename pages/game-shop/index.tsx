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
        <div className="grid grid-cols-4 place-items-center items-center gap-4">
            {listings.map((listing, i: number) => <GameListingWidget buy={() => buy(listing.id, listing.price, listing.sellToken)} key={i} {...listing} />)}
        </div>
    );
}