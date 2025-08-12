import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const SponsorshipQueueModule = buildModule("SponsorshipQueueModule", (m) => {
  console.log("hre.network.name:", hre.network.name);

  const estimatedCost = m.getParameter("estimatedCost", ethers.parseUnits("0.02"));

  let languagesAddress = ethers.ZeroAddress;
  if (hre.network.name == "sepolia") {
    // https://github.com/elimu-ai/web3-smart-contracts/blob/main/dao-contracts/ignition/deployments/chain-11155111/deployed_addresses.json
    languagesAddress = "0x9A3033D2e237376a09d7e19A7479622F8Ae38557";
  } else if (hre.network.name == "mainnet") {
    // https://github.com/elimu-ai/web3-smart-contracts/blob/main/dao-contracts/ignition/deployments/chain-1/deployed_addresses.json
    languagesAddress = "0x addr mainnet";
  }
  console.log("languagesAddress:", languagesAddress);

  const sponsorshipQueue = m.contract("SponsorshipQueue", [estimatedCost, languagesAddress]);

  return { sponsorshipQueue };
});

export default SponsorshipQueueModule;
