import { ethers, Contract, Wallet, BrowserProvider } from "ethers";
import { GameABI, GameShopABI, LeaderboardABI, ShopABI, UserABI, nftABI, ownableAbi, tokenABI } from "./GameABI";



export async function viewSavedGame(name: string, address: string): Promise<string> {
    try {
        if (window.ethereum) {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new Contract(address, GameABI, signer);
            const result = await contract.viewSavedGame(name);
            return result;
        } else {
            return "";
        }
    } catch (e) {
        console.error(e);
        return "";
    }
}

export async function viewSavedGameNames(address: string): Promise<string[]> {
    try {
        if (window.ethereum) {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new Contract(address, GameABI, signer);
            const result = await contract.viewSavedGameNames();
            return result;
        } else {
            return [];
        }
    } catch (e) {
        console.error(e);
        return [];
    }
}

export async function saveGame(name: string, code: string, address: string): Promise<void> {
    try {
        if (window.ethereum) {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new Contract(address, GameABI, signer);
            const tx = await contract.saveGame(name, code);
            const receipt = await tx.wait();
            console.log(receipt);
        }
    } catch (e) {
        console.error(e);
    }
}

type TokenTemplate = {
    name: string;
    description: string;
    symbol: string;
    supply: string;
};
type NFTTemplate = {
    name: string;
    symbol: string;
    keys: string[];
    values: string[];
};
type User = {
    keys: string[];
    values: string[];
};
export async function publishGame(name: string, code: string, address: string, description: string, imgSrc: string): Promise<void> {
    console.log(`Publishing ${name}`);
    if (!window.ethereum) return;
    try {
        const tokens: TokenTemplate[] = [];
        const nfts: NFTTemplate[] = [];
        let user: User = {
            keys: [],
            values: []
        };
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
            if (result.tokens) {
                for (const token of result.tokens) {
                    const t: TokenTemplate = {
                        name: token.name,
                        description: token.description,
                        symbol: token.abbr,
                        supply: token.supply
                    };
                    tokens.push(t);
                }
            }
            if (result.nfts) {
                for (const nft of result.nfts) {
                    const n: NFTTemplate = {
                        name: nft.name,
                        symbol: nft.abbr,
                        keys: [],
                        values: [],
                    };
                    for (const key in nft.data) {
                        n.keys.push(key);
                        n.values.push(nft.data[key]);
                    }
                    nfts.push(n);
                }
            }
            if (result.user) {
                for (const key in result.user) {
                    user.keys.push(key);
                    user.values.push(result.user[key]);
                }
            }
        }
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(address, GameABI, signer);
        const tx = await contract.createGame({ name, code, description, imgSrc }, tokens, nfts, user);
        const receipt = await tx.wait();
        console.log(receipt);
    } catch (e) {
        console.error(e);
    }

}

export async function getAllGames(address: string): Promise<any[]> {
    try {
        if (!window.ethereum) return [];
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(address, GameABI, signer);
        const tx = await contract.viewGames();
        return tx;
    } catch (e) {
        console.error(e);
        return [];
    }
}

export async function getGame(num: number, address: string): Promise<any> {
    try {
        if (!window.ethereum) return;
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(address, GameABI, signer);
        const tx = await contract.viewGame(num);
        return tx;
    } catch (e) {
        console.error(e);
    }
}
export async function getGameTokenNFTAddresses(game: number, contractAddress: string): Promise<{ tokens: string[], nfts: string[]; }> {
    if (!window.ethereum) return { tokens: [], nfts: [] };
    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(contractAddress, GameABI, provider);
    const tokensPromise = contract.viewGameTokens(game);
    const nftsPromise = contract.viewGameNFTs(game);
    const [tokens, nfts] = await Promise.all([tokensPromise, nftsPromise]);
    return { tokens, nfts };
}
export async function transferTokenToUser(tokenContractAddress: string, wallet: string, amount: number, ownerPkey: string) {
    if (!window.ethereum) return;
    const provider = new BrowserProvider(window.ethereum);
    const signer = new Wallet(ownerPkey, provider);
    const tokenContract = new Contract(tokenContractAddress, tokenABI, signer);
    await tokenContract.transfer(wallet, amount);
}
export async function transferTokenToOwner(tokenContractAddress: string, amount: number, contractAddress: string) {
    if (!window.ethereum) return;
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const tokenContract = new Contract(tokenContractAddress, tokenABI, signer);
    const owner = await getOwner(contractAddress);
    await tokenContract.transfer(owner, amount);
}
export async function getTokenBalance(userAddress: string, contractAddress: string): Promise<number> {
    if (!window.ethereum) return 0;
    const provider = new BrowserProvider(window.ethereum);
    const tokenContract = new Contract(contractAddress, tokenABI, provider);
    const balance = await tokenContract.balanceOf(userAddress);
    return Number(balance);
}
export async function getTokenMetadata(contractAddress: string): Promise<{ name: string, symbol: string, description: string; }> {
    if (!window.ethereum) return { name: "", symbol: "", description: "" };
    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(contractAddress, tokenABI, provider);
    const namePromise = contract.name();
    const symbolPromise = contract.symbol();
    const descriptionPromise = contract.symbol();
    const [name, symbol, description] = await Promise.all([namePromise, symbolPromise, descriptionPromise]);
    return {
        name,
        symbol,
        description
    };
}
export async function getNFTMetadata(contractAddress: string): Promise<{ name: string, symbol: string; }> {
    if (!window.ethereum) return { name: "", symbol: "" };
    const provider = new BrowserProvider(window.ethereum);
    const nftContract = new Contract(contractAddress, nftABI, provider);
    const namePromise = nftContract.name();
    const symbolPromise = nftContract.symbol();
    const [name, symbol] = await Promise.all([namePromise, symbolPromise]);
    return {
        name,
        symbol,
    };
}
export async function updateUserNFT(id: number, keys: string[], values: number[], nftContractAddress: string, ownerPkey: string) {
    if (!window.ethereum) return;
    const provider = new BrowserProvider(window.ethereum);
    const signer = new Wallet(ownerPkey, provider);
    const nftContract = new Contract(nftContractAddress, nftABI, signer);
    await nftContract.updateMetadata(id, keys, values);
}
// might have to make this one signed by owner as well;
export async function mintNFT(to: string, contractAddress: string, ownerPkey: string): Promise<void> {
    if (!window.ethereum) return;
    const provider = new BrowserProvider(window.ethereum);
    const signer = new Wallet(ownerPkey, provider);
    const nftContract = new Contract(contractAddress, nftABI, signer);
    await nftContract.mint(to);
}
export async function transferNFTToOwner(from: string, id: number, contractAddress: string, nftContractAddress: string): Promise<void> {
    if (!window.ethereum) return;
    const owner = await getOwner(contractAddress);
    const provider = new BrowserProvider(window.ethereum);
    const nftContract = new Contract(nftContractAddress, nftABI, provider);
    await nftContract.transferFrom(from, owner, id);
}
export async function getOwnedNFTs(userAddress: string, contractAddress: string): Promise<{ [key: number]: { [key: string]: number; }; }> {
    if (!window.ethereum) return {};
    const provider = new BrowserProvider(window.ethereum);
    const nftContract = new Contract(contractAddress, nftABI, provider);
    console.log({ userAddress });
    const balance = await nftContract.balanceOf(userAddress);
    const nfts: { [key: number]: { [key: string]: number; }; } = {};
    for (let i = 0; i < Number(balance); i++) {
        const tokenId = await nftContract.tokenOfOwnerByIndex(userAddress, i);
        const d = await getNFTData(tokenId, contractAddress);
        nfts[tokenId] = d;
    }
    return nfts;
}
export async function getNFTData(id: number, nftContractAddress: string): Promise<{ [key: string]: number; }> {
    if (!window.ethereum) return {};
    const provider = new BrowserProvider(window.ethereum);
    const nftContract = new Contract(nftContractAddress, nftABI, provider);
    const data = await nftContract.getKeysAndValues(id);
    const keys: string[] = data[0];
    const values: number[] = data[1];
    const nft: { [key: string]: number; } = {};
    for (let i = 0; i < keys.length; i++) {
        nft[keys[i]] = values[i];
    }
    return nft;
}
// pass in the address of the Game contract
export async function getUserData(userAddress: string, game: number, contractAddress: string): Promise<{ [key: string]: number; }> {
    if (!window.ethereum) return {};
    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(contractAddress, GameABI, provider);
    const userContractAddress: string = await contract.userManager();
    const userContract = new Contract(userContractAddress, UserABI, provider);
    const data = await userContract.getUserData(game, userAddress);
    const keys: string[] = data[0];
    const values: number[] = data[1];
    const user: { [key: string]: number; } = {};
    for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = values[i];
    }
    return user;
}

export async function updateUserStats(userAddress: string, game: number, keys: string[], values: number[], contractAddress: string, ownerPkey: string) {
    if (!window.ethereum) return;
    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(contractAddress, GameABI, provider);
    const userContractAddress: string = await contract.userManager();
    const signer = new Wallet(ownerPkey, provider);
    const userContract = new Contract(userContractAddress, UserABI, signer);
    await userContract.updateUserData(game, userAddress, keys, values);
}
export async function getMyGames(userAddress: string, contractAddress: string): Promise<{ tokens: { id: number, balance: number, supply: number; }[], nfts: number[]; }> {
    if (!window.ethereum) return { tokens: [], nfts: [] };
    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(contractAddress, GameABI, provider);
    const gameShopAddress = await contract.gameShop();
    const gameShopContract = new Contract(gameShopAddress, GameShopABI, provider);
    const gameTokens = await gameShopContract.viewActiveGameTokens();
    const tokens: { id: number, balance: number, supply: number; address: number; }[] = [];
    for (const token of gameTokens) {
        const tokenContract = new Contract(token, tokenABI, provider);
        const balance = Number(await tokenContract.balanceOf(userAddress));
        if (balance > 0) {
            const supply = Number(await tokenContract.supply());
            const gameId = Number(await gameShopContract.getGameForToken(token));
            tokens.push({
                id: gameId,
                balance,
                supply,
                address: token,
            });
        }
    }
    const nfts: number[] = [];
    const nftContract = new Contract(contractAddress, nftABI, provider);
    const balance = await nftContract.balanceOf(userAddress);
    for (let i = 0; i < Number(balance); i++) {
        const tokenId = await nftContract.tokenOfOwnerByIndex(userAddress, i);
        nfts.push(Number(tokenId));
    }
    const gameContract = await gameShopContract.gameContract();
    console.log({ gameContract });
    return { tokens, nfts };
}

// could hardcode owner
export async function getOwner(contractAddress: string): Promise<string> {
    if (!window.ethereum) return "";
    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(contractAddress, ownableAbi, provider);
    const owner = await contract.owner();
    return owner;
}
export async function viewLeaderboard(game: number, contractAddress: string): Promise<{ winners: string[], data: number[]; }> {
    if (!window.ethereum) return { winners: [], data: [] };
    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(contractAddress, GameABI, provider);
    const leaderboardAddress = await contract.leaderboard();
    const leaderboard = new Contract(leaderboardAddress, LeaderboardABI, provider);
    const data = await leaderboard.viewLeaderboard(game);
    return {
        winners: data[0],
        data: data[2],
    };
}

export async function updateLeaderboard(game: number, to: string, data: number, contractAddress: string, ownerPkey: string): Promise<void> {
    if (!window.ethereum) return;
    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(contractAddress, GameABI, provider);
    const leaderboardAddress = await contract.leaderboard();
    const signer = new Wallet(ownerPkey, provider);
    const leaderboard = new Contract(leaderboardAddress, LeaderboardABI, signer);
    await leaderboard.updateLeaderboard(game, to, data);
}

export type ShopListing = {
    item: string;
    isNFT: boolean;
    nftId: number;
    tokenAmount: number;
    chargeToken: string;
    price: number;
    listingId: number;
};
export async function viewShop(game: number, contractAddress: string): Promise<{ listings: ShopListing[], userListable: false; owner: string; }> {
    if (!window.ethereum) return { listings: [], userListable: false, owner: "" };
    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(contractAddress, GameABI, provider);
    const shopAddress = await contract.shop();
    const shop = new Contract(shopAddress, ShopABI, provider);
    const data = await shop.viewShop(game);
    return {
        listings: data[0],
        userListable: data[1],
        owner: data[3],
    };
}
export async function listItemOwner(game: number, item: string, isNFT: boolean, nftId: number, tokenAmount: number, chargeToken: string, price: number, contractAddress: string, ownerPkey: string): Promise<void> {
    if (!window.ethereum) return;
    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(contractAddress, GameABI, provider);
    const shopAddress = await contract.shop();
    const signer = new Wallet(ownerPkey, provider);
    const shop = new Contract(shopAddress, ShopABI, signer);
    shop.listItem(game, item, isNFT, nftId, tokenAmount, chargeToken, price);
}
export async function listItem(game: number, item: string, isNFT: boolean, nftId: number, tokenAmount: number, chargeToken: string, price: number, contractAddress: string): Promise<void> {
    if (!window.ethereum) return;
    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(contractAddress, GameABI, provider);
    const shopAddress = await contract.shop();
    const signer = await provider.getSigner();
    if (isNFT) {
        const nftContract = new Contract(item, nftABI, signer);
        const tx = await nftContract.approve(shopAddress, nftId);
        const receipt = await tx.wait();
        console.log(receipt);
    } else {
        const tokenContract = new Contract(item, tokenABI, signer);
        const tx = await tokenContract.approve(shopAddress, tokenAmount);
        const receipt = await tx.wait();
        console.log(receipt);
    }
    const shop = new Contract(shopAddress, ShopABI, signer);
    const tx = await shop.listItem(game, item, isNFT, nftId, tokenAmount, chargeToken, price);
    const receipt = await tx.wait();
    console.log(receipt);
}
// and this 
export async function buyItem(game: number, listingId: number, chargeToken: string, price: number, contractAddress: string): Promise<void> {
    if (!window.ethereum) return;
    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(contractAddress, GameABI, provider);
    const shopAddress = await contract.shop();
    const signer = await provider.getSigner();
    const tokenContract = new Contract(chargeToken, tokenABI, signer);
    let tx = await tokenContract.approve(shopAddress, price);
    await tx.wait();
    const shop = new Contract(shopAddress, ShopABI, signer);
    tx = await shop.buyItem(game, listingId);
    await tx.wait();
}

export async function splitGame(game: number, supply: number, name: string, symbol: string, contractAddress: string) {
    if (!window.ethereum) return;
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, GameABI, signer);
    const gameShopAddress = await contract.gameShop();
    let tx = await contract.approve(gameShopAddress, game);
    let receipt = await tx.wait();
    console.log(receipt);
    const gameShopContract = new Contract(gameShopAddress, GameShopABI, signer);
    tx = await gameShopContract.split(game, supply, name, symbol);
    receipt = await tx.wait();
    console.log(receipt);
}

export async function listGame(isToken: boolean, amount: number, gameId: number, price: number, sellToken: string, contractAddress: string) {
    if (!window.ethereum) return;
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, GameABI, signer);
    const gameShopAddress = await contract.gameShop();
    let tx = await contract.approve(gameShopAddress, gameId);
    let receipt = await tx.wait();
    console.log(receipt);
    const gameShopContract = new Contract(gameShopAddress, GameShopABI, signer);
    tx = await gameShopContract.list(isToken, amount, gameId, price, sellToken);
    receipt = await tx.wait();
    console.log(receipt);
}
export async function buyGame(id: number, price: number, sellToken: string, contractAddress: string) {
    if (!window.ethereum) return;
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, GameABI, signer);
    const token = new Contract(sellToken, tokenABI, signer);
    const gameShopAddress = await contract.gameShop();
    const gameShopContract = new Contract(gameShopAddress, GameShopABI, signer);
    let tx = await token.approve(gameShopAddress, price);
    let receipt = tx.wait();
    console.log(receipt);
    tx = await gameShopContract.buy(id);
    receipt = await tx.wait();
}
export async function viewListedGames(contractAddress: string): Promise<any[]> {
    if (!window.ethereum) return [];
    const provider = new BrowserProvider(window.ethereum);
    const contract = new Contract(contractAddress, GameABI, provider);
    const gameShopAddress = await contract.gameShop();
    const gameShopContract = new Contract(gameShopAddress, GameShopABI, provider);
    const count = await gameShopContract.count();
    const listings: any[] = [];
    for (let i = 0; i < Number(count); i++) {
        const listing = await gameShopContract.listings(i);
        listings.push(listing);
    }
    return listings;
}
export async function redeem(game: number, tokenAddress: string, contractAddress: string) {
    console.log({ tokenAddress });
    if (!window.ethereum) return;
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, GameABI, signer);
    const token = new Contract(tokenAddress, tokenABI, signer);
    const gameShopAddress = await contract.gameShop();
    const gameShopContract = new Contract(gameShopAddress, GameShopABI, signer);
    console.log({ gameShopAddress });
    let tx = await token.approve(gameShopAddress, 100000000);
    let receipt = tx.wait();
    console.log(receipt);
    tx = await gameShopContract.redeem(game);
    receipt = await tx.wait();
    console.log(receipt);
}
export function chargeUser(amount: number, tokenAddress: string, ownerPkey: string, contractAddress: string) {

}
export function shorten(s: string): string {
    return `${s.substring(0, 2)}...${s.substring(s.length - 2, s.length)}`;
}