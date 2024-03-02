import { mintNFT, transferNFTToOwner } from "./utils";



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
    address: string;
    constructor(address: string) {
        this.data = {};
        this.address = address;
    }
}