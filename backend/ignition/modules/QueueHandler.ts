import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers, network } from "hardhat";
import deployed_addresses from "../../ignition/deployments/chain-11155111/deployed_addresses.json";

const QueueHandlerModule = buildModule("QueueHandlerModule", (m) => {
  console.log("network.name:", network.name);

  let rolesAddress = ethers.ZeroAddress;
  if (network.name == "sepolia") {
    // https://github.com/elimu-ai/web3-smart-contracts/blob/main/dao-contracts/ignition/deployments/chain-11155111/deployed_addresses.json
    rolesAddress = "0x3c32D6016928A83522F8836c80116b7F2b978268";
  } else if (network.name == "mainnet") {
    // https://github.com/elimu-ai/web3-smart-contracts/blob/main/dao-contracts/ignition/deployments/chain-1/deployed_addresses.json
    rolesAddress = "0x addr mainnet";
  }
  console.log("rolesAddress:", rolesAddress);

  let sponsorshipQueueAddress = ethers.ZeroAddress;
  if (network.name == "sepolia") {
    sponsorshipQueueAddress = deployed_addresses["SponsorshipQueueModule#SponsorshipQueue"];
  } else if (network.name == "mainnet") {
    // TODO: ./ignition/deployments/chain-1/deployed_addresses.json
  }
  console.log("sponsorshipQueueAddress:", sponsorshipQueueAddress);

  let distributionQueueAddress = ethers.ZeroAddress;
  if (network.name == "sepolia") {
    distributionQueueAddress = deployed_addresses["DistributionQueueModule#DistributionQueue"];
  } else if (network.name == "mainnet") {
    // TODO: ./ignition/deployments/chain-1/deployed_addresses.json
  }
  console.log("distributionQueueAddress:", distributionQueueAddress);

  let distributionVerifierAddress = ethers.ZeroAddress;
  if (network.name == "sepolia") {
    distributionVerifierAddress = deployed_addresses["DistributionVerifierModule#DistributionVerifier"];
  } else if (network.name == "mainnet") {
    // TODO: ./ignition/deployments/chain-1/deployed_addresses.json
  }
  console.log("distributionVerifierAddress:", distributionVerifierAddress);
  
  const queueHandler = m.contract("QueueHandler", [
    rolesAddress,
    sponsorshipQueueAddress,
    distributionQueueAddress,
    distributionVerifierAddress
  ]);

  return { queueHandler };
});

export default QueueHandlerModule;
