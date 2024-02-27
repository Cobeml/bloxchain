


export const sauce = `
<script id="sauce">
async function sendTransactionToFrontendAndWait(type, key, args) {
    // key should be unique, otherwise undefined behavior !!
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject("Timeout waiting for response"), 200 * 1000); // timeout in 200 seconds
        function lookForResponse(event) {
            const { data } = event;
            if (data && data.key === key) {
                window.removeEventListener("message", lookForResponse);
                clearTimeout(timeout);
                resolve(data.success);
            }
        }
        window.addEventListener("message", lookForResponse);
        window.parent.postMessage({type, args, key})
    });
}
async function requestItemsUpdate() {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject("Timeout waiting for response"), 200 * 1000) // timeout after 200 seconds
        function lookForData(event) {
            const { data } = event;
            if (data.type === "data") {
                window.removeEventListener("message", lookForData);
                clearTimeout(timeout)
                resolve()
            }
        }
        window.addEventListener("message", lookForData);
        window.parent.postMessage({ type:"__handshake" });
    });
}
// put all the users nfts into this. 
class NFTInternal {
    constructor(id, address, data) {
        // a nft in a collection
        this.id = id;
        this.address = address;
        this.data = data;
    }
}

class NFT {
    constructor(gameIndex, address, real) {
        // a map of collection name to collection nfts
        this.nfts = new Map();
        this.data = new Map();
        if (real) {

        }
    }
    get(name) {
        return this.nfts.get(name);
    }
    all() {
        return Array.from(this.nfts);
    }
}

// put all the users tokens in this
class TokenInternal {
    // game creator gets tokens by token name, gets token balance and datas
    constructor(address, amount, name, description, abbr) {
        this.address = address;
        this.amount = amount;
        this.name = name;
        this.description = description;
        this.abbr = abbr;
    }
}
class Token {
    constructor(gameIndex, address, real) {
        if (real) {

        }
        this.tokens = new Map();
    }
    get(name) {
        return this.tokens.get(name);
    }
    all() {
        return Array.from(this.tokens);
    }
}

class User {
    constructor() {
        this.data = {};
    }
}
let user;
let nfts;
let tokens;
window.addEventListener("message", function (event) {
    const { data } = event;
    console.log(data);
    switch (data.__type) {
        case "data": {
            if (data.__real) {

            } else {
                if (data.nfts.exists) {
                    console.log(data.nfts);
                    nfts = new NFT(0, "", false);
                    for (const [name, value] of data.nfts.data) {
                        nfts.data.set(name, value);
                    }
                    for (const [name, value] of data.nfts.nfts) {
                        // will likely need to do new NFTInternal()
                        const internal = [];
                        for (const val of value) {
                            const n = new NFTInternal(val.id, val.address, val.data);
                            internal.push(n);
                        }
                        nfts.nfts.set(name, internal);
                    }
                }
                if (data.tokens.exists) {
                    tokens = new Token(0, "", false);
                    for (const [name, value] of data.tokens.tokens) {
                        const token = new TokenInternal(value.address, value.amount, value.name, value.description, value.abbr);
                        tokens.tokens.set(name, token);
                    }
                    console.log(data.tokens);
                }
                if (data.user.exists) {
                    user = new User();
                    user.data = data.user.data;
                    console.log(data.user);
                }
            }
            break;
        }
        default: {
            //console.log("unexpected type: " + data.__type);
            break;
        }
    }
});
window.parent.postMessage({ type:"__handshake" }); // send handshake message to tell parent to send data back
</script>
`;

export const sizer = `
<script>
// this script sizes the iframe. Do not change it
window.onload = () => {
    const dimensions = { width: document.body.scrollWidth, height: document.body.scrollHeight };
    window.parent.postMessage({ dimensions, type: "__size" }); // Adjust target origin as needed for security
};
</script>
`
    ;

export function saucify(code: string) {
    if (!code) return "";
    const headIndex = code.indexOf("</head>");
    const bodyIndex = code.indexOf("</body>");
    const newCode = [
        code.slice(0, headIndex),
        sauce,
        code.slice(headIndex, bodyIndex),
        sizer,
        code.slice(bodyIndex)
    ];
    return newCode.join("");
}