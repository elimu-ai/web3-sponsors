import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const SponsorshipQueueModule = buildModule("SponsorshipQueueModule", (m) => {
  const estimatedCost = m.getParameter("estimatedCost", ethers.parseUnits("0.002"));

  const sponsorshipQueue = m.contract("SponsorshipQueue", [estimatedCost]);

  return { sponsorshipQueue };
});

export default SponsorshipQueueModule;
