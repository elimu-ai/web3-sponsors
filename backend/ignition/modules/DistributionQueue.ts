import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers, network } from "hardhat";

const DistributionQueueModule = buildModule("DistributionQueueModule", (m) => {
  console.log("network.name:", network.name);
  
  const distributionQueue = m.contract("DistributionQueue");

  return { distributionQueue };
});

export default DistributionQueueModule;
