import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 31337
    },
    arbitrumSepolia: {
      url: 'https://sepolia-rollup.arbitrum.io/rpc',
      chainId: parseInt("0x66eee", 16),
      accounts: ["1013bc81f42776bc452b302702fff266d168af17fb2fa8afcc9d78e4d19b82b3"]
    },
    lineaTestnet: {
      url: "https://linea-goerli.blockpi.network/v1/rpc/public",
      chainId: parseInt("0xe704", 16),
      accounts: ["1013bc81f42776bc452b302702fff266d168af17fb2fa8afcc9d78e4d19b82b3"]
    },
    baseSepoliaTestnet: {
      url: "https://rpc.notadegen.com/base/sepolia",
      chainId: parseInt("0x14a34", 16),
      accounts: ["1013bc81f42776bc452b302702fff266d168af17fb2fa8afcc9d78e4d19b82b3"]
    },
    inEVM: {
      url: "https://inevm-rpc.caldera.dev",
      chainId: parseInt("0x6ca", 16),
      accounts: ["1013bc81f42776bc452b302702fff266d168af17fb2fa8afcc9d78e4d19b82b3"]
    },
    xdcApothemNetwork: {
      url: "https://rpc.apothem.network",
      chainId: parseInt("0x33", 16),
      accounts: ["1013bc81f42776bc452b302702fff266d168af17fb2fa8afcc9d78e4d19b82b3"]
    },
    fhenixFrontier: {
      url: "https://api.testnet.fhenix.zone:7747/",
      chainId: parseInt("0xa455", 16),
      accounts: ["1013bc81f42776bc452b302702fff266d168af17fb2fa8afcc9d78e4d19b82b3"]
    },
    incoGentryTestnet: {
      url: "https://testnet.inco.org",
      chainId: parseInt("0x2382", 16),
      accounts: ["1013bc81f42776bc452b302702fff266d168af17fb2fa8afcc9d78e4d19b82b3"]
    },
  }
};

export default config;
