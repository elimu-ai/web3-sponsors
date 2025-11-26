import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require("dotenv").config();

const privateKeys = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.30",
    settings: {
      optimizer: {
        enabled: true
      }
    }
  },
  gasReporter: {
    enabled: true,
    outputFile: "hardhat-gas-report.md"
  },
  networks: {
    sepolia: { // Chain ID 11155111
      url: "https://0xrpc.io/sep",
      accounts: privateKeys
    },
    mainnet: { // Chain ID 1
      url: "https://0xrpc.io/eth",
      accounts: privateKeys
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  sourcify: {
    enabled: true
  }
};

export default config;
