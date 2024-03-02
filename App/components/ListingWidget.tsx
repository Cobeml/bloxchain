export type ShopListingProps = {
    listing: {
        item: string;
        isNFT: boolean;
        nftId: number;
        tokenAmount: number;
        chargeToken: string;
        price: number;
        listingId: number;
    };
    onBuy: () => void;
};

export function ListingWidget({ listing, onBuy }: ShopListingProps) {
    return (
        <div className="border border-gray-200 rounded-lg p-4 shadow-lg m-2">
            <h2 className="text-xl font-bold">{listing.item}</h2>
            <p className="text-gray-700">{listing.isNFT ? `NFT ID: ${listing.nftId}` : 'Standard Item'}</p>
            <p className="text-gray-700">Token Amount: {listing.tokenAmount}</p>
            <p className="text-gray-700">Charge Token: {listing.chargeToken}</p>
            <p className="text-gray-700">Price: {listing.price}</p>
            <p className="text-gray-700">Listing ID: {listing.listingId}</p>
            <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={onBuy}
            >
                Buy Now
            </button>
        </div>
    );
};