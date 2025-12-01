import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers, network } from "hardhat";

const DistributionQueueModule = buildModule("DistributionQueueModule", (m) => {
  console.log("network.name:", network.name);

  let languagesAddress = ethers.ZeroAddress;
  if (network.name == "sepolia") {
    // https://github.com/elimu-ai/web3-smart-contracts/blob/main/dao-contracts/ignition/deployments/chain-11155111/deployed_addresses.json
    languagesAddress = "0x9A3033D2e237376a09d7e19A7479622F8Ae38557";
  } else if (network.name == "mainnet") {
    // https://github.com/elimu-ai/web3-smart-contracts/blob/main/dao-contracts/ignition/deployments/chain-1/deployed_addresses.json
    languagesAddress = "0xa9f1bD888112659Cd78803dbE2C8B3daedf0Eb1F";
  }
  console.log("languagesAddress:", languagesAddress);
  
  const distributionQueue = m.contract("DistributionQueue", [languagesAddress]);

  return { distributionQueue };
});

export default DistributionQueueModule;
