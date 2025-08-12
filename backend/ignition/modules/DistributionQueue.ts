import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers, network } from "hardhat";

const DistributionQueueModule = buildModule("DistributionQueueModule", (m) => {
  console.log("network.name:", network.name);
  
  const attestationHandler = m.getParameter("attestationHandler", ethers.ZeroAddress);

  const distributionQueue = m.contract("DistributionQueue", [attestationHandler]);

  return { distributionQueue };
});

export default DistributionQueueModule;
