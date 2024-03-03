import { BrowserProvider } from 'ethers';
import config from './config.json';
import { isSupportedNetwork } from './isSupportedNetwork';
import { useState } from 'react';
import { useMetaMask } from './useMetaMask';
import { GameAddressLocalhost, GamePkeyLocalhost } from '../utils/GameABI';


export const useSwitchNetwork = () => {
    const [contractAddress, setContractAddress] = useState<string>(GameAddressLocalhost);
    const [privKey, setPrivKey] = useState<string>(GamePkeyLocalhost); // yes, this is insecure, in prod we will use next.js server side calling to sign the transaction and send it back
    console.log(contractAddress);
    const switchNetwork = async (dapp: { chainId: string, chainInfo: typeof config["0x13881"]; }) => {
        if (!isSupportedNetwork(dapp.chainId)) {
            throw new Error('Unsupported network');
        }
        try {
            await window.ethereum!.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: dapp.chainId }],
            });
            console.log("Switched to ", dapp.chainId);
            setContractAddress(dapp.chainInfo.contractAddress);
            setPrivKey(dapp.chainInfo.privKey);
        } catch (error) {
            try {
                await window.ethereum?.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: dapp.chainId,
                            ...(dapp.chainInfo?.blockExplorer
                                ? {
                                    blockExplorerUrls: [dapp.chainInfo?.blockExplorer],
                                }
                                : {}),
                            chainName: dapp.chainInfo?.name,
                            nativeCurrency: {
                                decimals: 18,
                                name: dapp.chainInfo?.name,
                                symbol: dapp.chainInfo?.symbol,
                            },
                            rpcUrls: [dapp.chainInfo?.rpcUrl],
                        },
                    ],
                });
                setContractAddress(dapp.chainInfo.contractAddress);
                setPrivKey(dapp.chainInfo.privKey);
            } catch (error: any) {
                // user rejects the request to "add chain" or param values are wrong, maybe you didn't use hex above for `chainId`?
                console.error(`wallet_addEthereumChain Error: ${error.message}`);
            }
            // handle other "switch" errors
        }
    };

    return { switchNetwork, contractAddress, privKey };
};