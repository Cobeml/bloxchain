import BasicButton from "@/components/utils/BasicButton";
import NFTWidget from "@/components/NFTWidget";
import TokenWidget from "@/components/TokenWidget";
import UserWidget from "@/components/UserWidget";
import { NFT, NFTInternal, Token, TokenInternal, User } from "@/components/utils/crypto";
import { sauce, saucify, sizer } from "@/components/utils/scripts";
import { useEffect, useState } from "react";
// for game, creators can only debit their own tokens in the game
// any other tokens debited count as a charge and are distributed amongst the owners of the game
export default function PlayTest() {
    const [code, setCode] = useState<string>('');
    const [nfts, setNfts] = useState<NFT>();
    const [tokens, setTokens] = useState<Token>();
    const [user, setUser] = useState<User>();
    const [editWindowUser, setEditWindowUser] = useState<boolean>(false);
    const [editWindowNFT, setEditWindowNFT] = useState<boolean>(false);
    const [editWindowToken, setEditWindowToken] = useState<boolean>(false);
    const [dataToEdit, setDataToEdit] = useState<{ [key: string]: any; }>({});
    useEffect(() => {
        let code = sessionStorage.getItem("code");
        if (!code) {

        } else {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = code;
            const setupScript = tempDiv.querySelector("script#setup");
            if (setupScript) {
                const scriptCode = setupScript.innerHTML;
                const c = `
                    (function () {
                        let r;
                        try {
                            ${scriptCode}
                            r = setup()
                        } catch (e) {
                            console.error(e);
                        }
                        return r;
                    })();
                `;
                const result = eval(c);
                const nfts = new NFT(0, "", false);
                for (const nft of result.nfts) {
                    nfts.nfts.set(nft.name, []);
                    nfts.data.set(nft.name, nft.data);
                }
                const tokens = new Token(0, "", false);
                for (const token of result.tokens) {
                    const t = new TokenInternal("", 1000, token.name, token.description, token.abbr);
                    tokens.tokens.set(token.name, t);
                }
                const user = new User();
                user.data = result.user;
                console.log({ user, tokens, nfts, result });
                setUser(user);
                setTokens(tokens);
                setNfts(nfts);
            }
            code = saucify(code);
            console.log(code);
            setCode(code || "");
        }
        window.addEventListener("message", handleFrameMessage);
        return () => {
            // clean up
            window.removeEventListener("message", handleFrameMessage);
        };
    }, []);
    useEffect(() => {
        // here I want to pass the data into the iframe
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
    }, [nfts, tokens, user]);
    const handleFrameMessage = (event: any) => {
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
        }
    };
    const loadIntoGame = () => {
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
    const requestTransaction = () => {

    };
    const showEditWindowUser = (data: { [key: string]: number; }) => {
        setDataToEdit(data);
        setEditWindowUser(true);
    };
    const showEditWindowNFT = (data: { [key: string]: number; }) => {
        setDataToEdit(data);
        setEditWindowNFT(true);
    };
    const confirmDataEditUser = (key: string, value: number) => {
        if (user) {
            const u = new User();
            u.data = user.data;
            u.data[key] = value;
            setUser(u);
            const newDataToEdit = { ...dataToEdit };
            newDataToEdit[key] = value;
            setDataToEdit(newDataToEdit);
        }
    };
    const createNewNFT = (data: { [key: string]: any; }) => {
        if (nfts) {
            const newNFT = new NFT(0, "", false);
            newNFT.data = nfts.data;
            newNFT.nfts = nfts.nfts;
            const internal = new NFTInternal(0, "", {});
            for (const key in data) {
                if (key !== "__name") {
                    internal.data[key] = data[key];
                }
            }
            newNFT.nfts.get(data.__name)?.push(internal);
            setNfts(newNFT);
        }
    };
    const showEditWindowToken = (name: string, value: number) => {
        setDataToEdit({ __name: name, value });
        setEditWindowToken(true);
    };
    const changeTokenValue = (name: string, value: number) => {
        if (tokens) {
            const newToken = new Token(0, "", false);
            newToken.tokens = tokens.tokens;

            const token = newToken.tokens.get(name);
            if (token) {
                token.amount = value;
            }
            setTokens(newToken);
        }
    };
    return (
        <>
            <div className="w-auto h-auto bg-blue-600" style={{ height: "inherit" }}>
                <iframe id="game" srcDoc={code} frameBorder={0}></iframe>
            </div>
            <div className="absolute bottom-0 left-0 w-full flex flex-row justify-between">
                {nfts && <NFTWidget nfts={nfts} real={false} showEditWindow={showEditWindowNFT} />}
                {user && <UserWidget user={user} real={false} showEditWindow={showEditWindowUser} />}
                <BasicButton onClick={loadIntoGame} text="Load Assets" />
                {tokens && <TokenWidget tokens={tokens} real={false} showEditWindow={showEditWindowToken} />}
            </div>
            <div className="absolute">
                {/* show leaderboard here, show player nfts, show player tokens, show player data */}
            </div>
            {editWindowUser &&
                <div className="absolute flex flex-col justify-center items-center p-4 rounded-lg bg-white border border-black" style={{ top: '50%', left: '50%', transform: "translate(-50%, -50%)" }}>
                    {Object.entries(dataToEdit).map(([key, value]: [string, number], i: number) => {
                        return (
                            <div key={i} className="flex flex-row items-center gap-2">
                                <p>{key}</p>
                                <p>{value}</p>
                                <input
                                    onChange={(event) => confirmDataEditUser(key, Number(event.target.value))}
                                    type="number"
                                    value={value}
                                />
                            </div>
                        );
                    })}
                    <BasicButton onClick={() => setEditWindowUser(false)} text="Close" />
                </div>
            }
            {editWindowNFT &&
                <div className="absolute flex flex-col justify-center items-center p-4 rounded-lg bg-white border border-black" style={{ top: '50%', left: '50%', transform: "translate(-50%, -50%)" }}>
                    {Object.entries(dataToEdit).map(([key, value]: [string, number], i: number) => {
                        if (key == "__name") return <></>;
                        return (
                            <div key={i} className="flex flex-row items-center gap-2">
                                <p>{key}</p>
                                <p>{value}</p>
                                <input
                                    onChange={(event) => {
                                        const newDataToEdit = { ...dataToEdit };
                                        newDataToEdit[key] = Number(event.target.value);
                                        setDataToEdit(newDataToEdit);
                                    }}
                                    type="number"
                                    value={value}
                                />
                            </div>
                        );
                    })}
                    <div className="flex flex-row justify-center items-center gap-2">
                        <BasicButton onClick={() => createNewNFT(dataToEdit)} text="Create" />
                        <BasicButton onClick={() => setEditWindowNFT(false)} text="Close" />
                    </div>
                </div>
            }
            {editWindowToken &&
                <div className="absolute flex flex-col justify-center items-center p-4 rounded-lg bg-white border border-black" style={{ top: '50%', left: '50%', transform: "translate(-50%, -50%)" }}>
                    <div className="flex flex-row items-center gap-2">
                        <p>{dataToEdit.__name}</p>
                        <p>{dataToEdit.value}</p>
                        <input
                            onChange={(event) => {
                                const newDataToEdit = { ...dataToEdit };
                                newDataToEdit.value = Number(event.target.value);
                                setDataToEdit(newDataToEdit);
                                changeTokenValue(newDataToEdit.__name, newDataToEdit.value);
                            }}
                            type="number"
                            value={dataToEdit.value}
                        />
                    </div>
                    <BasicButton onClick={() => setEditWindowToken(false)} text="Close" />
                </div>
            }
        </>
    );
}