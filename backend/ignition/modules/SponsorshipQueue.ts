import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers, network } from "hardhat";

const SponsorshipQueueModule = buildModule("SponsorshipQueueModule", (m) => {
  console.log("network.name:", network.name);

  const estimatedCost = ethers.parseUnits("0.0002");

  const sponsorshipQueue = m.contract("SponsorshipQueue", [estimatedCost]);

  return { sponsorshipQueue };
});

export default SponsorshipQueueModule;
