
import DevButton from '@/components/DevButton';
import { GameABI, GameAddressLocalhost } from '@/components/utils/GameABI';
import Loader from '@/components/Loader';
import { ball, communication, count, post, setup } from '@/components/utils/examples';
import { useMetaMask } from '@/components/hooks/useMetaMask';
import { publishGame, saveGame, viewSavedGame, viewSavedGameNames } from '@/components/utils/utils';
import Editor, { useMonaco } from '@monaco-editor/react';
import { use, useEffect, useState } from 'react';
import { uploadFile } from '@/components/utils/aws';
// other ways to do this
// host user html file in iframe
const defaultCode = `

<html>
    <head>
        <script id="setup">
            // function is evaluated when game is uploaded. 
            // Not evaluated in each play
            // Not saved on chain
            function setup() {
                return {
                    nfts: [
                        /*
                        {
                            name: // collection name
                            description: // collection description
                            abbr: // token abbreviation
                            data: // template of data you want stored on each nft ex. {health: 100, damage: 200}...
                        }
                        */
                    ],
                    tokens: [
                        /*  
                        {
                            name: // token name
                            description: // token description
                            abbr: // token abbreviation
                            supply: // token max supply
                        }
                        */ 
                    ],
                    user: {}
                        /*  
                        {
                            key, int pairs of data
                        }
                        */
                    
                }
            }
        </script>
    </head>
    <body>
        <p> Hello World </p>
        <script>
            // your code here
        </script>
    </body>
</html>

`;

// need hooks to update contract address when user changes networks
// useContractAddress... 
// implement metamask sdk example function useSwitchNetwork.tsx
export default function Build() {
    const [editorCode, setEditorCode] = useState<string>(defaultCode);
    // const { sdk, connected, connecting, provider, chainId } = useSDK();
    const monaco = useMonaco();
    const [loadingFiles, setLoadingFiles] = useState<boolean>(true);
    const [filenames, setFilenames] = useState<string[]>([]);
    const [selectedFilename, setSelectedFilename] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const { wallet } = useMetaMask();
    const [file, setFile] = useState<File | null>(null);
    const [viewMode, setViewMode] = useState('files');
    // useEffect(() => {
    //     // console.log(signer, address);
    //     // if (signer && address && provider) {
    //     //     const contract = new ethers.Contract(GameAddressLocalhost, GameABI, signer);
    //     //     contract.saveGame("test", "console.log('hello world'").then((tx) => {
    //     //         tx.wait().then((receipt: any) => {
    //     //             console.log(receipt);
    //     //         });
    //     //     });
    //     // }
    //     console.log(wallet);
    //     if (wallet && window.ethereum) {
    //         console.log("hi");
    //         const provider = new ethers.BrowserProvider(window.ethereum);
    //         provider.getSigner().then((signer: any) => {
    //             const contract = new ethers.Contract(GameAddressLocalhost, GameABI, signer);
    //             // console.log(contract);
    //             // contract call
    //             // contract.saveGame("test", "console.log('hello world')").then((tx: any) => {
    //             //     console.log(tx);
    //             //     tx.wait().then((receipt: any) => {
    //             //         console.log(receipt);
    //             //     });
    //             // });
    //             /* 
    //             view function
    //             contract.viewSavedGame("test").then((result: any) => {
    //                 console.log(result);
    //              }); 
    //             */
    //         });

    //     }
    // }, [wallet]);
    useEffect(() => {
        if (wallet && wallet.accounts.length > 0) {
            viewSavedGameNames(GameAddressLocalhost).then((names: string[]) => {
                setFilenames(names.concat(["Unnamed Game"]));
                setSelectedFilename("Unnamed Game");
                setLoadingFiles(false);
            }).catch((e) => console.error(e));
        }
    }, [wallet]);
    useEffect(() => {
        const handleSave = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 's') {
                // Prevent the default save dialog
                event.preventDefault();

                // Assuming `editorCode` holds your current editor's code
                const editorCode = monaco?.editor.getModels()[0].getValue();

                // Save the code to localStorage
                sessionStorage.setItem('code', editorCode || '');
                alert('Code saved!');
            }
        };
        window.addEventListener('keydown', handleSave);

        return () => {
            window.removeEventListener('keydown', handleSave);
        };
    }, [monaco]);
    const updateCode = (value: string | undefined, event: any) => {
        setEditorCode(value || "");
    };
    const loadFileData = async (name: string) => {
        if (wallet && wallet.accounts.length > 0) {
            const code = await viewSavedGame(name, GameAddressLocalhost);
            setEditorCode(code || defaultCode);
            setSelectedFilename(name);
        }
    };
    const save = async () => {
        if (!selectedFilename) {

        } else {
            let success;
            try {
                await saveGame(selectedFilename, editorCode, GameAddressLocalhost);
                success = true;
            } catch (e) {
                console.error(e);
            }
            if (success) alert("Game saved!");
        }
        console.log("attempted to save ", selectedFilename);
    };
    const saveAndTest = () => {
        sessionStorage.setItem('code', editorCode);
        window.location.href = "/play/test";
    };
    const newProject = () => {
        if (!filenames.includes("Unnamed Game")) {
            setFilenames(filenames.concat(["Unnamed Game"]));
        }
        setSelectedFilename("Unnamed Game");
        setEditorCode(defaultCode);
    };
    const loadExample = (n: number) => {
        if (n == 1) {
            setEditorCode(count);
        } else if (n == 2) {
            setEditorCode(ball);
        } else if (n == 3) {
            setEditorCode(setup);
        } else if (n == 4) {
            setEditorCode(post);
        } else if (n == 5) {
            setEditorCode(communication);
        }
    };
    const updateCurrentName = (event: React.ChangeEvent<HTMLInputElement>, old: string) => {
        setSelectedFilename(event.target.value);
        const newFilenames = filenames.map((name: string) => {
            if (name == old) {
                return event.target.value;
            } else {
                return name;
            }
        });
        setFilenames(newFilenames);
    };
    const publish = async () => {
        let imgSrc = "";
        if (file) {
            const url = await uploadFile(file);
            if (url) imgSrc = url;
        }
        await publishGame(selectedFilename, editorCode, GameAddressLocalhost, description, imgSrc);
    };
    return (
        /* <div className="relative flex w-full h-screen">
            <div className="w-1/6 bg-gray-800 text-white overflow-auto">
                {
                    viewMode === "files" ? (
                        <>
                            <h2 className="text-lg font-semibold p-4">Files</h2>
                            {loadingFiles ?
                                <Loader height="h-16" width="w-16" />
                                :
                                <div className="flex flex-col p-4 gap-2">
                                    {filenames.length === 0 ?
                                        <p>No files found</p>
                                        :
                                        filenames.map((name: string, i: number) => {
                                            return (
                                                <div key={i} onClick={() => loadFileData(name)} className={`cursor-pointer p-2 rounded-md hover:bg-gray-700`}>
                                                    {name}
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            }
                            <DevButton onClick={() => setViewMode("actions")} text="Actions" />
                        </>
                    ) : (
                        <>
                            <h2 className="text-lg font-semibold p-4">Actions</h2>
                            <div className="flex flex-col p-4 gap-2">
                                <DevButton onClick={saveAndTest} text="Test Locally" />
                                <DevButton onClick={save} text="Save on Chain" />
                                <DevButton onClick={() => window.location.href = "/docs"} text="Docs" />
                                <DevButton onClick={publish} text="Publish on Chain" />
                            </div>
                            <DevButton onClick={() => setViewMode("files")} text="Files" />
                        </>
                    )
                }
            </div>

            /* Code Editor */
        /*
        <div className="flex-grow">
            <Editor
                height="100%"
                defaultLanguage="html"
                defaultValue={defaultCode}
                value={editorCode}
                theme="vs-dark"
                onChange={updateCode}
            />
        </div>
    </div> */

        <div className="relative flex flex-row w-full h-screen">
            <div className="w-1/6 bg-gray-700 p-4 text-white overflow-auto">
                <h2 className="text-lg font-semibold">Files</h2>
                {loadingFiles ?
                    <Loader height="h-16" width="w-16" />
                    :
                    <div className="flex flex-col justify-center items-center gap-2">
                        {filenames.length === 0 ?
                            <p>No files found</p>
                            :
                            <>
                                {filenames.map((name: string, i: number) => {
                                    if (name == selectedFilename) {
                                        return (
                                            <input
                                                placeholder={name}
                                                key={i}
                                                className={`bg-green-400 focus:outline-none p-2 rounded-md w-full text-center hover:cursor-text hover:brightness-90 active:brightness-75`}
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateCurrentName(event, name)}
                                            />
                                        );
                                    } else {
                                        return (
                                            <div key={i} onClick={() => loadFileData(name)} className={`bg-gray-400 p-2 rounded-md w-full text-center hover:cursor-pointer hover:brightness-90 active:brightness-75`}>
                                                {name}
                                            </div>
                                        );
                                    }
                                })}
                                <DevButton onClick={newProject} text="Create new project" />
                            </>
                        }
                    </div>
                }
            </div>
            <div className="w-1/4 bg-gray-700 p-4 text-white overflow-auto text-center flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Info</h2>
                <div className="flex flex-row justify-center items-center gap-2">
                    <DevButton onClick={saveAndTest} text="Test Locally" />
                    <DevButton onClick={save} text="Save on Chain" />
                </div>
                <div className="flex flex-row justify-center items-center gap-2">
                    <DevButton onClick={() => window.location.href = "/docs"} text="Docs" />
                </div>
                <div className="flex flex-col justify-center items-center w-full gap-2">
                    <p>Load Examples</p>
                    <div className="flex flex-row justify-center items-center gap-2">
                        <DevButton onClick={() => loadExample(1)} text="1" />
                        <DevButton onClick={() => loadExample(2)} text="2" />
                        <DevButton onClick={() => loadExample(3)} text="3" />
                        <DevButton onClick={() => loadExample(4)} text="4" />
                        <DevButton onClick={() => loadExample(5)} text="5" />
                    </div>
                </div>
                <p className="mt-2">
                    Press Ctrl+S to save temporarily
                </p>
                <div className="flex flex-col justify-center items-center gap-2">
                    <textarea
                        className="focus:outline-none bg-black resize-none"
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value)}
                    />
                    <input
                        type="file"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFile(event.target.files ? event.target.files[0] : null)}
                    />
                    <DevButton onClick={publish} text="Publish on Chain" />
                </div>
            </div>
            <div className="flex-grow">
                <Editor
                    height="100%"
                    defaultLanguage="html"
                    defaultValue={defaultCode}
                    value={editorCode}
                    theme="vs-dark"
                    onChange={updateCode}
                />
            </div>
        </div>
    );
};