import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers, network } from "hardhat";

const DistributionVerifierModule = buildModule("DistributionVerifierModule", (m) => {
  console.log("network.name:", network.name);

  let rolesAddress = ethers.ZeroAddress;
  if (network.name == "sepolia") {
    // https://github.com/elimu-ai/web3-smart-contracts/blob/main/dao-contracts/ignition/deployments/chain-11155111/deployed_addresses.json
    rolesAddress = "0x3c32D6016928A83522F8836c80116b7F2b978268";
  } else if (network.name == "mainnet") {
    // https://github.com/elimu-ai/web3-smart-contracts/blob/main/dao-contracts/ignition/deployments/chain-1/deployed_addresses.json
    rolesAddress = "0x addr mainnet";
  }
  console.log("rolesAddress:", rolesAddress);
  
  const distributionQueue = m.contract("DistributionVerifier", [rolesAddress]);

  return { distributionQueue };
});

export default DistributionVerifierModule;
