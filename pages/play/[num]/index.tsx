import { LeaderboardWidget } from "@/components/LeaderboardWidget";
import NFTWidget from "@/components/NFTWidget";
import TokenWidget from "@/components/TokenWidget";
import UserWidget from "@/components/UserWidget";
import { useMetaMask } from "@/components/hooks/useMetaMask";
import { useSwitchNetwork } from "@/components/hooks/useSwitchNetwork";
import BasicButton from "@/components/utils/BasicButton";
import { NFT, NFTInternal, Token, TokenInternal, User } from "@/components/utils/crypto";
import { saucify } from "@/components/utils/scripts";
import { getGame, getNFTMetadata, getOwnedNFTs, getTokenBalance, getTokenMetadata, getUserData, mintNFT, transferNFTToOwner, transferTokenToOwner, transferTokenToUser, updateLeaderboard, updateUserNFT, updateUserStats, viewLeaderboard } from "@/components/utils/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type GameResponse = [string, string, string, string[], string[]];
export default function Game() {
    const router = useRouter();
    const { wallet } = useMetaMask();
    const [owner, setOwner] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [user, setUser] = useState<User>();
    const [nfts, setNfts] = useState<NFT>();
    const [tokens, setTokens] = useState<Token>();
    const [gameNum, setGameNum] = useState<number>(-1);
    const [leaderboard, setLeaderboard] = useState<{ address: string, score: number; }[]>([]);
    const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
    const { contractAddress, privKey } = useSwitchNetwork();
    useEffect(() => {
        if (router && router.isReady && wallet && wallet.accounts.length > 0) {
            const num = Number(router.query.num);
            setGameNum(num);
            getGame(num, contractAddress).then((game: any) => {
                const owner = game[0];
                const name = game[1];
                let code = game[2];
                const nfts = game[3];
                const tokens = game[4];
                setOwner(owner);
                setName(name);
                code = saucify(code);
                setCode(code);
                setup(tokens, nfts, num).then(() => console.log("setup")); // add state management here
                // now the goal is to successfully inject that stuff into the app
                // then the goal is to allow the app to modify the on chain activities through communication
            });
            viewLeaderboard(num, contractAddress).then((leaderboard: { winners: string[], data: number[]; }) => {
                const l: { address: string, score: number; }[] = [];
                for (let i = 0; i < leaderboard.winners.length; i++) {
                    l.push({ address: leaderboard.winners[i], score: leaderboard.data[i] });
                }
                setLeaderboard(l);
            });
        }
    }, [router, router.isReady, wallet]);
    useEffect(() => {
        window.addEventListener("message", handleFrameMessage);
        return () => {
            // clean up
            window.removeEventListener("message", handleFrameMessage);
        };
    }, [nfts, tokens, wallet, user, gameNum]);
    const setup = async (tokens: string, nfts: string, num: number) => {
        const token = new Token(num, wallet.accounts[0], true);
        for (const t of tokens) {
            const b = await getTokenBalance(wallet.accounts[0], t);
            const data = await getTokenMetadata(t);
            const internal = new TokenInternal(t, b, data.name, data.description, data.symbol);
            token.tokens.set(data.name, internal);
        }
        const user = new User(wallet.accounts[0]);
        const uData = await getUserData(wallet.accounts[0], num, contractAddress);
        user.data = uData;

        const nft = new NFT(num, wallet.accounts[0], true);
        for (const address of nfts) {
            const data = await getOwnedNFTs(wallet.accounts[0], address);
            const metadata = await getNFTMetadata(address);
            const l: NFTInternal[] = [];
            for (const k in data) {
                const internal = new NFTInternal(Number(k), address, data[Number(k)]);
                l.push(internal);
            }
            nft.nfts.set(metadata.name, l);
            nft.addresses.set(metadata.name, address);
        }
        setUser(user);
        setNfts(nft);
        setTokens(token);
        sendItems(user, nft, token);
        //console.log({ user, nft, token });
    };
    const sendItems = (user: User, nfts: NFT, tokens: Token) => {
        const iframe = document.getElementById("game") as HTMLIFrameElement;
        if (iframe) {
            const message = {
                __type: "data",
                __real: false,
                nfts: {
                    exists: Boolean(nfts),
                    nfts: Array.from(nfts?.nfts || new Map()),
                    data: Array.from(nfts?.data || new Map()),
                },
                tokens: {
                    exists: Boolean(nfts),
                    tokens: Array.from(tokens?.tokens || new Map()),
                },
                user: {
                    exists: Boolean(user),
                    data: user?.data
                }
            };
            iframe.contentWindow?.postMessage(message);
        }
    };
    const handleFrameMessage = async (event: any) => {
        const { type } = event.data;
        switch (type) {
            case "__size": {
                const { dimensions } = event.data;
                console.log(dimensions);
                const iframe = document.querySelector('iframe')!; // Adjust selector as needed
                iframe.style.width = `${dimensions.width + 30}px`;
                iframe.style.height = `${dimensions.height + 30}px`;
                break;
            }
            case "__handshake": {
                const iframe = document.getElementById("game") as HTMLIFrameElement;
                if (iframe) {
                    const message = {
                        __type: "data",
                        __real: false,
                        nfts: {
                            exists: Boolean(nfts),
                            nfts: Array.from(nfts?.nfts || new Map()),
                            data: Array.from(nfts?.data || new Map()),
                        },
                        tokens: {
                            exists: Boolean(nfts),
                            tokens: Array.from(tokens?.tokens || new Map()),
                        },
                        user: {
                            exists: Boolean(user),
                            data: user?.data
                        }
                    };
                    iframe.contentWindow?.postMessage(message);
                }
                break;
            }
            case "__tokenToUser": {
                const { args, key } = event.data;
                let status: boolean = false;
                try {
                    await transferTokenToUser(args.tokenAddress, wallet.accounts[0], args.amount, privKey);
                    status = true;
                } catch (e) {
                    console.error(e);
                    status = false;
                } finally {
                    const iframe = document.getElementById("game")! as HTMLIFrameElement;
                    iframe.contentWindow?.postMessage({ data: { key, success: status } });
                }
                break;
            }
            case "__tokenFromUser": {
                const { args, key } = event.data;
                let status: boolean = false;
                try {
                    await transferTokenToOwner(args.tokenAddress, args.amount, privKey);
                    status = true;
                } catch (e) {
                    console.error(e);
                    status = false;
                } finally {
                    const iframe = document.getElementById("game")! as HTMLIFrameElement;
                    iframe.contentWindow?.postMessage({ data: { key, success: status } });
                }
                break;
            }
            case "__mintNFT": {
                const { args, key } = event.data;
                let status: boolean = false;
                try {
                    await mintNFT(wallet.accounts[0], args.nftAddress, privKey);
                    status = true;
                } catch (e) {
                    console.error(e);
                    status = false;
                } finally {
                    const iframe = document.getElementById("game")! as HTMLIFrameElement;
                    iframe.contentWindow?.postMessage({ data: { key, success: status } });
                }
                break;
            }
            case "__takeNFT": {
                const { args, key } = event.data;
                let status: boolean = false;
                try {
                    await transferNFTToOwner(wallet.accounts[0], args.id, privKey, args.nftAddress);
                    status = true;
                } catch (e) {
                    console.error(e);
                    status = false;
                } finally {
                    const iframe = document.getElementById("game")! as HTMLIFrameElement;
                    iframe.contentWindow?.postMessage({ data: { key, success: status } });
                }
                break;
            }
            case "__updateUserStats": {
                const { args, key } = event.data;
                let status: boolean = false;
                try {
                    await updateUserStats(wallet.accounts[0], gameNum, args.keys, args.values, contractAddress, privKey);
                    status = true;
                } catch (e) {
                    console.error(e);
                    status = false;
                } finally {
                    const iframe = document.getElementById("game")! as HTMLIFrameElement;
                    iframe.contentWindow?.postMessage({ data: { key, success: status } });
                }
                break;
            }
            case "__updateUserNFT": {
                const { args, key } = event.data;
                let status: boolean = false;
                try {
                    await updateUserNFT(args.id, args.keys, args.values, args.nftAddress, privKey);
                    status = true;
                } catch (e) {
                    console.error(e);
                    status = false;
                } finally {
                    const iframe = document.getElementById("game")! as HTMLIFrameElement;
                    iframe.contentWindow?.postMessage({ data: { key, success: status } });
                }
                break;
            }
            case "__updateLeaderboard": {
                const { args, key } = event.data;
                let status: boolean = false;
                try {
                    await updateLeaderboard(gameNum, wallet.accounts[0], args.data, contractAddress, privKey);
                    status = true;
                } catch (e) {
                    console.error(e);
                    status = false;
                } finally {
                    const iframe = document.getElementById("game")! as HTMLIFrameElement;
                    iframe.contentWindow?.postMessage({ data: { key, success: status } });
                }
                break;
            }
            case "__chargeUser": {
                const { args, key } = event.data;
                let status: boolean = false;
                try {

                } catch (e) {
                    console.error(e);
                    status = false;
                } finally {
                    const iframe = document.getElementById("game")! as HTMLIFrameElement;
                    iframe.contentWindow?.postMessage({ data: { key, success: status } });
                }
                break;
            }
        }
    };
    return (
        <div className="flex flex-col justify-center items-center gap-2 text-center h-full w-full">
            <div className="flex w-full flex-grow h-full justify-center items-center"> {/* Wrapper div with column layout and full screen height */}
                <div className="flex-grow w-full h-full justify-center items-center"> {/* Container for iframe that will grow to take available space */}
                    <iframe id="game" srcDoc={code} frameBorder={0} className="w-screen h-screen"></iframe> {/* Full width and height within its container */}
                </div>
                <div className="w-full"> {/* Container for the buttons to sit at the bottom */}
                    <div className="absolute bottom-0 left-0 w-full flex flex-row justify-between">
                        {/* {nfts && <NFTWidget nfts={nfts} real={false} showEditWindow={showEditWindowNFT} />}
                        {user && <UserWidget user={user} real={false} showEditWindow={showEditWindowUser} />}
                        {/* <BasicButton onClick={loadIntoGame} text="Load Assets" /> */}
                        {/* {tokens && <TokenWidget tokens={tokens} real={false} showEditWindow={showEditWindowToken} />} */}
                    </div>
                </div>
                <div className="absolute bottom-0 flex flex-row justify-center items-center w-[50%] gap-2">
                    <BasicButton text="Show Leaderboard" onClick={() => setShowLeaderboard(true)} />
                    <BasicButton text="Visit Shop" onClick={() => window.location.href = `/play/${gameNum}/shop`} />
                </div>
            </div>
            {showLeaderboard &&
                <div className="absolute flex flex-col justify-center items-center gap-2 bg-gray-600 rounded-lg p-4" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <LeaderboardWidget leaderboard={leaderboard} />
                    <BasicButton onClick={() => setShowLeaderboard(false)} text="Close" />
                </div>
            }
        </div>
    );
}