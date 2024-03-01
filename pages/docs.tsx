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
const sections: string[] = ["What is it?", "Welcome!", "Project Structure", "Leaderboard", "Shop"];

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
              case "What is it?": {
                return (
                  <ul>
                    <li>Bloxchain is a new platform to develop blockchain games</li>
                    <li>It allows you to seamlessly connect your game code to your on chain assets - without writing any contract logic</li>
                    <li>Define the interface of your contract - {`Your nft and token 
                metadata, the data you want to associate with your user`}</li>
                    <li>Write game code in any language - anything that can be compiled down to wasm and included in a script tag</li>
                    <li>Easily interact with your {`player's`} on chain assets through our API</li>
                    <li>Easily charge players to play</li>
                    <li>Also connect your game to an already existing market through
                      listing it on our platform</li>
                    <li>Sell your game to other players or split it into tokens that
                      can be traded on the market</li>
                    <li>Holders of game tokens join a DAO for the game</li>
                    <li>Profits from the game are distributed among the DAO</li>
                    <li>Dao members can vote on updates to the game</li>
                    <li>Also connect your game to our in-game shop {"(where players can buy and list in game assets)"} and leaderboard, again without writing any contract logic</li>
                    <li>All of this is built so far - try it!</li>
                  </ul>
                );
              }
              case "Welcome!": {
                return (
                  <ul>
                    <li>Welcome to Bloxchain!</li>
                    <li>Bloxchain allows you to develop blockchain web games without
                      writing any contract code</li>
                    <li>Using WASM, you can write your code in any language!</li>
                    <li>{`You'll communicate with our API from within your game to 
                interact with the player's on chain data`}</li>
                    <li>{"Let's get started!"}</li>
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
                            {
                              `function setup() { 
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
                              `function setup() { 
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
                              }`
                            }
                          </code>
                        </pre>
                      </li>
                      <li>All nfts must include name, description, and abbr</li>
                      <li>The data part is a set of arbitrary key value pairs that are associated with your nft</li>
                      <li>Only uint datatypes are supported as values</li>
                      <li>All tokens must include name, description, abbr, and
                        supply</li>
                      <li>The user is a set of arbitrary key and value pairs that will be associated with each user</li>
                      <li>Again, the values must be uints and the keys must be
                        strings</li>
                    </ul>
                    <h1 className="text-3xl">Communication</h1>
                    <ul>
                      <li>{`The current player's data will be piped in through three 
                objects available in the global scope`}</li>
                      <li>These objects are Token, NFT, and User</li>
                      <li>Their type descriptions are below</li>
                      <pre>
                        <code>
                          {
                            `class NFTInternal { 
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
                              // game creator gets tokens by token name, gets token balance and datas constructor(address, amount, name, description, abbr) { 
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
                            }`
                          }
                        </code>
                      </pre>
                      <li>They are then made available through these three
                        variables</li>
                      <pre>
                        <code>
                          {
                            `let tokens: Token; 
                            let nfts: NFT; 
                            let user: User;`
                          }
                        </code>
                      </pre>
                      <li>These objects will be undefined at first but will be loaded in evenrually</li>
                      <li>You have this function to await the first definition of the objects</li>
                      <li>
                        <pre>
                          <code>
                            {
                              `async function awaitObjectDefinition(timeout) { 
                                return new Promise((resolve, reject) => { 
                                  let timeout; 
                                  const interval = setInterval(() => { 
                                    if (user && nfts && tokens) { 
                                      clearInterval(interval); 
                                      clearTimeout(timeout); 
                                      resolve(); 
                                    } 
                                  }, 1000 / 60); 
                                  timeout = setTimeout(() => { 
                                    clearInterval(interval); 
                                    reject("Timeout waiting for response"); 
                                  }, timeout || 200 * 1000); 
                                }) 
                              }`
                            }
                          </code>
                        </pre>
                      </li>
                      <li>To manually reload these objects and get the most recent user data call this function</li>
                      <pre>
                        <code>
                          {
                            `async function requestItemsUpdate(): Promise<void>;`
                          }
                        </code>
                      </pre>
                      <li>This function will return when the most recent on chain data
                        is available</li>
                      <li>The aforementioned objects will be updated to their most
                        recent value</li>
                      <li>Why is data not automatically updated within your game</li>
                      <li>To minimize bandwidth used - sometimes you might not need the most recent user data - for example when you are simply updating records</li>
                      <li>You have many options to modify user data</li>
                      <li>Be warned though, some of them will prompt the user to
                        approve a transaction, which could interfere with gameplay</li>
                      <li>{`If you are making a fast paced game, my advice would be to perform all transactions that the user needs to sign before the game starts`}</li> <li>However, functions that do not change user token or nft
                        balances can be called at any time with no interruptions for the user</li> </ul>
                    <h1 className="text-3xl">Communication Methods</h1>
                    <ul>
                      <li>The game communicates with the app through event
                        listeners</li>
                      <li>You will call this function</li>
                      <pre>
                        <code>
                          {
                            `async function sendTransactionToFrontendAndWait(type: string, key: string, args: {[key: string]: any}): Promise<boolean> { `
                          }
                        </code>
                      </pre>
                      <li>You will use the <code> {`{type: string}`} </code> property
                        to indicate what type of transaction to send </li>
                      <li>Every communication must include a <code>{`{key: 
                any}`}</code> This is so that we can determine when the transaction is complete </li> <li>The function will return a boolean representing whether the
                        transaction was successful or not</li>
                      <li>The args object holds values specific to each
                        transaction</li>
                      <li>The types of transactions are as follows</li>
                      <li><code>{`"__tokenToUser"`}</code></li>
                      <li><code>{`"args = {tokenAddress: string, amount: 
                number}"`}</code></li>
                      <li>With tokenAddress being the address of the token you want to send the user and amount being the amount {"(duh)"}</li>
                      <li><code>{`"__tokenFromUser"`}</code></li>
                      <li><code>{`"args = {tokenAddress: string, amount: 
                number}"`}</code></li>
                      <li>These variables mean the same as above, except the value is
                        being debited from the users account and sent to the main contract account</li>
                      <li>This action will propt the user to sign a transaction</li>
                      <li>What if I want the token to be sent to my account as payment? Be patient, {`there's`} another method for that</li>
                      <li><code>{`"__mintNFT"`}</code></li>
                      <li><code>{`"args = {nftAddress: string, key: 
                string}"`}</code></li>
                      <li>Mints an NFT to the first account of the wallet. The
                        <code>nftAddress</code> is the address of the NFT to mint, and <code>key</code> is a unique identifier for the transaction.</li>
                      <li><code>{`"__takeNFT"`}</code></li>
                      <li><code>{`"args = {id: number, nftAddress: string, key: 
                string}"`}</code></li>
                      <li>Transfers an NFT from the {`user's`} account to the game
                        {`owner's`} account. The <code>id</code> is the identifier of the NFT, <code>nftAddress</code> specifies the {`NFT's`} address, and <code>key</code> is a unique identifier for the transaction.</li>
                      <li><code>{`"__updateUserStats"`}</code></li>
                      <li><code>{`"args = {keys: string[], values: number[], key: 
                string}"`}</code></li>
                      <li>Updates statistics for the {`user's`} account.
                        <code>keys</code> are the statistic names to update, <code>values</code> are the new values for each statistic, and <code>key</code> is a unique identifier for the transaction.</li>
                      <li><code>{`"__updateUserNFT"`}</code></li>
                      <li><code>{`"args = {id: number, keys: string[], values: 
                string[], nftAddress: string, key: string}"`}</code></li>
                      <li>Updates attributes or metadata of a {`user's`} NFT.
                        <code>id</code> is the {`NFT's`} identifier, <code>keys</code> are the attributes to update, <code>values</code> are the new values for each attribute, <code>nftAddress</code> specifies the {`NFT's`} address, and <code>key</code> is a unique identifier for the transaction.</li>
                      <li><code>{`"__updateLeaderboard"`}</code></li>
                      <li><code>{`"args = {data: number}"`}</code></li>
                      <li>Updates the {`game's`} leaderboard. <code>data</code>
                        contains the new value that could be added to the leaderboard</li> <li>The leaderboard contract will automatically test
                        <code>data</code> against the other datavalues in the leaderboard and will update it with the users address if necessary </li>
                      <li><code>{`"__chargeUser"`}</code></li>
                      <li><code>{`"args = {tokenAddress: string, amount: number, key: 
                string}"`}</code></li>
                      <li>Debits a specified amount of tokens from the {`user's`}
                        account. <code>tokenAddress</code> is the address of the token to debit, <code>amount</code> is the amount to debit, and <code>key</code> is a unique identifier for the transaction.</li>
                      <li>The tokens will be delivered to you, the owner, or
                        distributed among the holders of game tokens {`(if the game is split)`}</li> </ul>
                  </>
                );
              }
              case "Leaderboard": {
                return (
                  <ul>
                    <li>A leaderboard is automatically created with every game</li>
                    <li>It is your job as the game programmer to decide how to populate the leaderboard</li>
                  </ul>
                );
              }
              case "Shop": {
                <ul>
                  <li>A shop is automatically created with every game</li>
                  <li>You, as the game owner, can list items for free - they will be debited from the contract account instead of from yours</li>
                  <li>Listing items requires manually going to the shop page of your game and clicking the list items button</li>
                  <li>Payment can be sent to the contract account, or distributed
                    amongst the game DAO</li>
                  <li>You can allow users to list their own items in the shop</li>
                  <li>Payment tokens will always be delivered to the user that listed them</li>
                </ul>;
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