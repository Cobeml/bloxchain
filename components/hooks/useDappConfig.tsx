
import config from './config.json';
import { isSupportedNetwork } from './isSupportedNetwork';

export const useDappConfig = () => {
    const chainId: any = "0x13381";
    // strongly typed or fallback to linea if not a valid chain
    const chainInfo = isSupportedNetwork(chainId)
        ? config[chainId]
        : config['0xe704'];

    return { dapp: { chainId, chainInfo } };
};