import Wrapper from "@/components/Wrapper";
import { MetaMaskContextProvider } from "@/components/hooks/useMetaMask";
import "@/styles/globals.css";
import { MetaMaskProvider } from "@metamask/sdk-react";
import type { AppProps } from "next/app";


// think about using a useChainData hook to get functions to send transactions and get data on different chains
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MetaMaskContextProvider>
        <MetaMaskProvider
          debug={false}
          sdkOptions={{
            dappMetadata: {
              name: "Blox",
              url: "http://localhost:3000"
            }
          }}
        >
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
        </MetaMaskProvider>
      </MetaMaskContextProvider>
    </>
  );
}
