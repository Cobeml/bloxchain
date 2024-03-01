import { useSwitchNetwork } from "./hooks/useSwitchNetwork";
import config from "./hooks/config.json";
import { useState } from "react";

export default function SwitchNetworkWidget() {
    const { switchNetwork } = useSwitchNetwork();
    const [selectedNetwork, setSelectedNetwork] = useState('');

    const handleNetworkChange = async (event: any) => {
        const chainId = event.target.value as keyof typeof config;
        setSelectedNetwork(chainId);

        if (chainId && config[chainId]) {
            await switchNetwork({
                chainId,
                chainInfo: config[chainId] as any
            });
            console.log("switched!");
        }
    };

    return (
        <select value={selectedNetwork} onChange={handleNetworkChange} className="text-black">
            {Object.entries(config).map(([chainId, { name }]) => (
                <option key={chainId} value={chainId}>{name}</option>
            ))}
        </select>
    );
}