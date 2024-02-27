import { GameAddressLocalhost } from "./GameABI";
import { getOwner, mintNFT, transferNFTToOwner } from "./utils";



// put all the users nfts into this. 
export class NFTInternal {
    id: number;
    address: string;
    data: { [key: string]: any; };
    constructor(id: number, address: string, data: { [key: string]: any; }) {
        // a nft in a collection
        this.id = id;
        this.address = address;
        this.data = data;
    }
    async transferFrom(wallet: string, contractAddress: string): Promise<boolean> {
        try {
            await transferNFTToOwner(wallet, this.id, contractAddress, this.address);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}


export class NFT {
    // user gets nfts by collection name
    nfts: Map<string, NFTInternal[]>;
    data: Map<string, any>;
    addresses: Map<string, string>;
    userAddress: string;
    gameIndex: number;
    constructor(gameIndex: number, address: string, real: boolean) {
        // a map of collection name to collection nfts
        this.gameIndex = gameIndex;
        this.userAddress = address;
        this.nfts = new Map<string, NFTInternal[]>();
        this.data = new Map<string, any>();
        this.addresses = new Map<string, string>();
    }
    get(name: string): NFTInternal[] | undefined {
        return this.nfts.get(name);
    }
    all(): [string, NFTInternal[]][] {
        return Array.from(this.nfts);
    }
    async mint(name: string, ownerPkey: string): Promise<boolean> {
        try {
            const address: string = this.addresses.get(name)!;
            await mintNFT(this.userAddress, address, ownerPkey);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}

// put all the users tokens in this
export class TokenInternal {
    address: string;
    amount: number;
    name: string;
    description: string;
    abbr: string;
    // game creator gets tokens by token name, gets token balance and datas
    constructor(address: string, amount: number, name: string, description: string, abbr: string) {
        this.address = address;
        this.amount = amount;
        this.name = name;
        this.description = description;
        this.abbr = abbr;
    }
    // take tokens from user
    async transferFrom(wallet: string, contractAddress: string): Promise<boolean> {
        return false;
    }
    // give user tokens
    async transferTo(wallet: string): Promise<boolean> {
        return false;
    }
}
export class Token {
    tokens: Map<string, TokenInternal>;
    constructor(gameIndex: number, address: string, real: boolean) {
        if (real) {

        }
        this.tokens = new Map<string, TokenInternal>();
    }
    get(name: string): TokenInternal | undefined {
        return this.tokens.get(name);
    }
    all(): [string, TokenInternal][] {
        return Array.from(this.tokens);
    }
}

export class User {
    data: { [key: string]: number; };
    constructor() {
        this.data = {};
    }
}