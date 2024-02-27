import { ListItemWidget, ShopListingFormValues } from "@/components/ListItemWidget";
import { ListingWidget } from "@/components/ListingWidget";
import { useMetaMask } from "@/components/hooks/useMetaMask";
import BasicButton from "@/components/utils/BasicButton";
import { GameAddressLocalhost, GamePkeyLocalhost } from "@/components/utils/GameABI";
import { ShopListing, buyItem, getGameTokenNFTAddresses, listItem, listItemOwner, viewShop } from "@/components/utils/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Shop() {
    const { wallet } = useMetaMask();
    const router = useRouter();
    const [listings, setListings] = useState<ShopListing[]>([]);
    const [userListable, setUserListable] = useState(false);
    const [showListing, setShowListing] = useState<boolean>(false);
    const [gameNum, setGameNum] = useState<number>(-1);
    const [owner, setOwner] = useState<string>("");
    const [nftAddresses, setNftAddresses] = useState<string[]>([]);
    const [tokenAddresses, setTokenAddresses] = useState<string[]>([]);
    useEffect(() => {
        if (router && router.isReady && wallet && wallet.accounts.length > 0) {
            const num = Number(router.query.num);
            viewShop(num, GameAddressLocalhost).then((result: any) => {
                setListings(result.listings);
                // allow the user to list if userListable is true or if they are the owner;
                setUserListable(result.userListable || result.owner.toLowerCase() === wallet.accounts[0].toLowerCase());
                setOwner(result.owner);
                setGameNum(num);
            });
            getAddresses(num);
        }
    }, [wallet, router, router.isReady]);
    const getAddresses = async (num: number) => {
        const { tokens, nfts } = await getGameTokenNFTAddresses(num, GameAddressLocalhost);
        console.log({ tokens, nfts });
        setTokenAddresses(tokens);
        setNftAddresses(nfts);
    };
    const buy = async (listingId: number) => {
        try {
            await buyItem(gameNum, listingId, GameAddressLocalhost);
            setListings((listings => listings.filter((listing: ShopListing) => listing.listingId !== listingId)));
        } catch (e) {
            console.error(e);
        }
    };
    const list = async (values: ShopListingFormValues) => {
        const f = wallet.accounts[0].toLowerCase() === owner.toLowerCase() ? listItemOwner : listItem;
        try {
            await f(
                gameNum, values.item, values.isNFT, values.nftId, values.tokenAmount,
                values.chargeToken, values.price, GameAddressLocalhost, GamePkeyLocalhost
            );
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex flex-row justify-center items-center gap-2">
                <p>Game Shop</p>
                {userListable &&
                    <BasicButton onClick={() => setShowListing(true)} text="List an Item" />
                }
            </div>
            <div className="grid grid-cols-4">
                {listings.map((listing: ShopListing) => <ListingWidget listing={listing} onBuy={buy} />)}
            </div>
            {showListing &&
                <div className="absolute w-auto h-auto bg-gray-400 p-4 rounded-lg flex flex-col justify-center items-center gap-2" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <ListItemWidget list={list} tokenAddresses={tokenAddresses} nftAddresses={nftAddresses} />
                    <BasicButton onClick={() => setShowListing(false)} text="Close" />
                </div>
            }
        </div>
    );
}