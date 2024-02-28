import { useState } from "react";

function Sidebar({ sections, onSectionChange }: { sections: string[], onSectionChange: (section: string) => void; }) {
  return (
    <div className="w-64 h-full overflow-auto bg-gray-800 text-white">
      <div className="p-5">
        <h2 className="text-xl font-bold">Documentation</h2>
        <ul className="mt-4">
          {sections.map((section) => (
            <li key={section} className="mt-2 hover:bg-gray-700 p-4">
              <button
                onClick={() => onSectionChange(section)}
                className="text-left w-full"
              >
                {section}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
const sections: string[] = ["Welcome!", "Project Structure", "Leaderboard", "Shop"];

export default function Docs() {
  const [currentSection, setCurrentSection] = useState<string>(sections[0]);
  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };
  return (
    <div className="flex w-full h-screen bg-gray-700">
      <Sidebar sections={sections} onSectionChange={handleSectionChange} />
      <div className=" p-8 flex flex-col w-full gap-2 text-xl text-white overflow-auto">
        <h1 className="text-5xl">{currentSection}</h1>
        <hr></hr>
        {
          (function (currentSection: string) {
            switch (currentSection) {
              case "Welcome!": {
                return (
                  <ul>
                    <li>Welcome to Bloxchain!</li>
                    <li>Bloxchain allows you to develop blockchain web games without writing any contract code</li>
                    <li>Using WASM, you can write your code in any language!</li>
                    <li>{`You'll communicate with our API from within your game to interact with the player's on chain data`}</li>
                  </ul>
                );
              }
              case "Project Structure": {
                return (
                  <>
                    <h1 className="text-3xl">Setup</h1>
                    <ul>
                      <li>The setup function is called when your code is published to the blockchain</li>
                      <li>
                        <pre>
                          <code>
                            {`
function setup() {
  return {
    nfts: [
      // enter your nft data here
    ],
    tokens: [
      // enter your token data here
    ],
    user: {
      // enter your keys for your players' profiles here \n
    }
  }
}`
                            }
                          </code>
                        </pre>
                      </li>
                      <li>It returns the structure of your on chain assets</li>
                      <li>For example</li>
                      <li>
                        <pre>
                          <code>
                            {
                              `
function setup() {
  return {
    nfts: [
      {
        name: 'Chicken',
        description: "cluck cluck",
        abbr: "CHICK",
        data: {
            health: 20,
            damage: 40,
            charisma: 60
        }
      }
    ],
    tokens: [
      {
        name: "Gold",
        abbr: "GOLD",
        description: "ooh shiny...",
        supply: 1000,
      },
    ],
    user: {
      level: 0,
      damage: 20,
      exp: 1000,
    }
  }
}
                            `
                            }
                          </code>
                        </pre>
                      </li>
                      <li>All nfts must include name, description, and abbr</li>
                      <li>The data part is a set of arbitrary key value pairs that are associated with your nft</li>
                      <li>Only uint datatypes are supported as values</li>
                      <li>All tokens must include name, description, abbr, and supply</li>
                      <li>The user is a set of arbitrary key and value pairs that will be associated with each user</li>
                      <li>Again, the values must be uints and the keys must be strings</li>
                    </ul>
                    <h1 className="text-3xl">Communication</h1>
                    <ul>
                      <li>{`The current player's data will be piped in through three objects available in the global scope`}</li>
                      <li>These objects are Token, NFT, and User</li>
                      <li>Their type descriptions are below</li>
                      <pre>
                        <code>
                          {
                            `
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
                            `
                          }
                        </code>
                      </pre>
                      <li>They are then made available through these three variables</li>
                      <pre>
                        <code>
                          {
                            `
let tokens: Token;
let nfts: NFT;
let user: User;
                          `
                          }
                        </code>
                      </pre>
                      <li>These objects will be undefined at first but will be loaded in evenrually</li>
                      <li>To manually reload these objects and get the most recent user data call this function</li>
                      <pre>
                        <code>
                          {
                            `
async function requestItemsUpdate(): Promise<void>;
                            `
                          }
                        </code>
                      </pre>
                      <li>This function will return when the most recent on chain data is available </li>
                      <li>You have many options to modify user data</li>
                      <li>Be warned though, some of them will prompt the user to approve a transaction, which could interfere with gameplay</li>
                      <li>{`If you are making a fast paced game, my advice would be to perform all transactions that the user needs to sign before the game starts`}</li>
                      <li>However, functions that do not change user token or nft balances can be called at any time with no interruptions for the user</li>
                    </ul>
                    <h1 className="text-3xl">Communication Methods</h1>
                    <ul>
                      explain how game can communicate with the app to manage user data
                    </ul>
                  </>
                );
              }
              case "Leaderboard": {

              }
              case "Shop": {

              }
              default: {
                return (
                  <></>
                );
              }
            }
          })(currentSection)
        }
      </div>
    </div >
  );
}