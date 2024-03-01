import Wrapper from "@/components/Wrapper";
import { MetaMaskContextProvider } from "@/components/hooks/useMetaMask";
import "@/styles/globals.css";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";
import type { AppProps } from "next/app";


// think about using a useChainData hook to get functions to send transactions and get data on different chains
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MetaMaskContextProvider>
        <MetaMaskUIProvider
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
        </MetaMaskUIProvider>
      </MetaMaskContextProvider>
    </>
  );
}
