import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers, network } from "hardhat";
import deployed_addresses_sepolia from "../../ignition/deployments/chain-11155111/deployed_addresses.json";

const QueueHandlerModule = buildModule("QueueHandlerModule", (m) => {
  console.log("network.name:", network.name);

  let sponsorshipQueueAddress = ethers.ZeroAddress;
  if (network.name == "sepolia") {
    sponsorshipQueueAddress = deployed_addresses_sepolia["SponsorshipQueueModule#SponsorshipQueue"];
  } else if (network.name == "mainnet") {
    // TODO: ./ignition/deployments/chain-1/deployed_addresses.json
  }
  console.log("sponsorshipQueueAddress:", sponsorshipQueueAddress);

  let distributionQueueAddress = ethers.ZeroAddress;
  if (network.name == "sepolia") {
    distributionQueueAddress = deployed_addresses_sepolia["DistributionQueueModule#DistributionQueue"];
  } else if (network.name == "mainnet") {
    // TODO: ./ignition/deployments/chain-1/deployed_addresses.json
  }
  console.log("distributionQueueAddress:", distributionQueueAddress);

  let distributionVerifierAddress = ethers.ZeroAddress;
  if (network.name == "sepolia") {
    distributionVerifierAddress = deployed_addresses_sepolia["DistributionVerifierModule#DistributionVerifier"];
  } else if (network.name == "mainnet") {
    // TODO: ./ignition/deployments/chain-1/deployed_addresses.json
  }
  console.log("distributionVerifierAddress:", distributionVerifierAddress);
  
  const queueHandler = m.contract("QueueHandler", [
    sponsorshipQueueAddress,
    distributionQueueAddress,
    distributionVerifierAddress
  ]);

  return { queueHandler };
});

export default QueueHandlerModule;
