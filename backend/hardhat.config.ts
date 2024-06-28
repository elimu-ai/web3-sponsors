import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require("dotenv").config();

const WALLET_KEY = process.env.WALLET_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24"
  },
  gasReporter: {
    enabled: true
  },
  networks: {
    base_sepolia: { // Chain ID 84532
      url: "https://sepolia.base.org",
      accounts: [process.env.WALLET_KEY as string]
    },
    base_mainnet: { // Chain ID 8453
      url: "https://mainnet.base.org",
      accounts: [process.env.WALLET_KEY as string]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "base_sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org"
        }
      },
      {
        network: "base_mainnet",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      }
    ]
  },
  sourcify: {
    enabled: true
  }
};

export default config;
