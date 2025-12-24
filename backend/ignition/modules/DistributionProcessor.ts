import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers, network } from "hardhat";
import deployed_addresses_sepolia from "../deployments/chain-11155111/deployed_addresses.json";

const DistributionProcessorModule = buildModule("DistributionProcessorModule", (m) => {
  console.log("network.name:", network.name);

  let distributionQueueAddress = ethers.ZeroAddress;
  if (network.name == "sepolia") {
    distributionQueueAddress = deployed_addresses_sepolia["DistributionQueueModule#DistributionQueue"];
  } else if (network.name == "mainnet") {
    // TODO: ./ignition/deployments/chain-1/deployed_addresses.json
  }
  console.log("distributionQueueAddress:", distributionQueueAddress);
  
  const distributionProcessor = m.contract("DistributionProcessor", [
    distributionQueueAddress
  ]);

  return { distributionProcessor };
});

export default DistributionProcessorModule;
