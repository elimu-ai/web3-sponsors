import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const DistributionQueueModule = buildModule("DistributionQueueModule", (m) => {
  console.log("hre.network.name:", hre.network.name);
  
  const attestationHandler = m.getParameter("attestationHandler", ethers.ZeroAddress);

  const distributionQueue = m.contract("DistributionQueue", [attestationHandler]);

  return { distributionQueue };
});

export default DistributionQueueModule;
