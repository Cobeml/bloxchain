import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.4.0",
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
      accounts: ["59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"]
    },
    lineaTestnet: {
      url: "https://linea-goerli.blockpi.network/v1/rpc/public",
      chainId: parseInt("0xe704", 16),
      accounts: ["59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"]
    },
    baseSepoliaTestnet: {
      url: "https://rpc.notadegen.com/base/sepolia",
      chainId: parseInt("0x14a34", 16),
      accounts: ["59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"]
    },
    inEVM: {
      url: "https://inevm-rpc.caldera.dev",
      chainId: parseInt("0x6ca", 16),
      accounts: ["59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"]
    },
    xdcApothemNetwork: {
      url: "https://apothem.xdcrpc.com",
      chainId: parseInt("0x33", 16),
      accounts: ["59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"]
    },
    fhenixFrontier: {
      url: "https://api.testnet.fhenix.zone:7747/",
      chainId: parseInt("0xa455", 16),
      accounts: ["59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"]
    },
    incoGentryTestnet: {
      url: "https://testnet.inco.org",
      chainId: parseInt("0x2382", 16),
      accounts: ["59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"]
    },
  }
};

export default config;
