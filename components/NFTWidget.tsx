import { NFT, NFTInternal } from "./utils/crypto";


type NFTWidgetProps = {
    nfts: NFT;
    real: boolean;
    showEditWindow: (data: { [key: string]: any; }) => any;
};
export default function NFTWidget({ nfts, real, showEditWindow }: NFTWidgetProps) {
    return (
        <div className="relative flex flex-row gap-2">
            {Array.from(nfts.nfts).map(([value, my_nfts], index) => (
                <div
                    key={index}
                    className="nft-item relative w-24 aspect-square rounded-lg border border-gray-400 bg-gray-600 hover:brightness-90 active:brightness-75"
                    onClick={() => showEditWindow({ ...nfts.data.get(value), __name: value })}
                >
                    <div className="value">{value}</div>
                    <div className="nft-preview-container absolute bottom-full left-0 hidden flex-col items-center">
                        {my_nfts.map((nft, i) => (
                            <div key={i} className="nft-preview w-24 h-24 aspect-square rounded-lg bg-gray-500 mb-2">
                                {/* Display nft content here */}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}