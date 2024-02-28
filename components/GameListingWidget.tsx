import { describe } from "node:test";
import GameTokenWidget from "./GameTokenWidget";
import GameWidget from "./GameWidget";
import { shorten } from "./utils/utils";
import BasicButton from "./utils/BasicButton";


export type GameListingWidgetProps = {
    id: number;
    isToken: boolean;
    amount: number;
    gameId: number;
    price: number;
    tokenAddress: string;
    sellToken: string;
    seller: string;
    name: string;
    description: string;
    imgSrc: string;
};

export default function GameListingWidget({ id, isToken, amount, gameId, price, tokenAddress, sellToken, seller, name, description, imgSrc, buy }: GameListingWidgetProps & { buy: () => void; }) {
    return (
        <div className="flex flex-col justify-center items-center gap-2">
            {isToken ?
                <GameTokenWidget name={name} description={description} imgSrc={imgSrc} balance={amount} supply={amount} num={gameId} address="" />
                :
                <GameWidget name={name} description={description} imgSrc={imgSrc} num={gameId} />
            }
            <p>{`Buy for ${price} ${shorten(sellToken)}`}</p>
            <p>{`Sold by ${shorten(seller)}`}</p>
            <BasicButton onClick={buy} text="Buy" />
        </div>
    );
}