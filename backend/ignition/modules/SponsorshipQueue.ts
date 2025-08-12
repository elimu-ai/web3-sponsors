import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers, network } from "hardhat";

const SponsorshipQueueModule = buildModule("SponsorshipQueueModule", (m) => {
  console.log("network.name:", network.name);

  const estimatedCost = m.getParameter("estimatedCost", ethers.parseUnits("0.0001"));

  let languagesAddress = m.getParameter("languagesAddress", ethers.ZeroAddress);
  if (network.name == "sepolia") {
    // https://github.com/elimu-ai/web3-smart-contracts/blob/main/dao-contracts/ignition/deployments/chain-11155111/deployed_addresses.json
    languagesAddress = m.getParameter("languagesAddress", "0x9A3033D2e237376a09d7e19A7479622F8Ae38557");
  } else if (network.name == "mainnet") {
    // https://github.com/elimu-ai/web3-smart-contracts/blob/main/dao-contracts/ignition/deployments/chain-1/deployed_addresses.json
    languagesAddress = m.getParameter("languagesAddress", "0x addr mainnet");
  }
  console.log("languagesAddress:", languagesAddress);

  const sponsorshipQueue = m.contract("SponsorshipQueue", [estimatedCost, languagesAddress]);

  return { sponsorshipQueue };
});

export default SponsorshipQueueModule;
