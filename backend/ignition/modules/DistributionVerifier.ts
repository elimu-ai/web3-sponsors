import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers, network } from "hardhat";

const DistributionVerifierModule = buildModule("DistributionVerifierModule", (m) => {
  console.log("network.name:", network.name);

  let rolesAddress = ethers.ZeroAddress;
  if (network.name == "sepolia") {
    // https://github.com/elimu-ai/web3-smart-contracts/blob/main/dao-contracts/ignition/deployments/sepolia_v1-0-5/deployed_addresses.json
    rolesAddress = "0xB4e1235568b40C03E9cA9F2B333FA68Ed59C73F7";
  } else if (network.name == "mainnet") {
    // https://github.com/elimu-ai/web3-smart-contracts/blob/main/dao-contracts/ignition/deployments/chain-1/deployed_addresses.json
    rolesAddress = "0x51baBDc198d6dC4A8D1144c02748D7E084f770Db";
  }
  console.log("rolesAddress:", rolesAddress);
  
  const distributionQueue = m.contract("DistributionVerifier", [rolesAddress]);

  return { distributionQueue };
});

export default DistributionVerifierModule;
