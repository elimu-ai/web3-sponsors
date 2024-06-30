import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("DistributionQueue", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [firstAccount, otherAccount] = await hre.ethers.getSigners();

    const attestationHandler = hre.ethers.ZeroAddress;

    const DistributionQueue = await hre.ethers.getContractFactory("DistributionQueue");
    const distributionQueue = await DistributionQueue.deploy(attestationHandler);

    return { distributionQueue, firstAccount, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { distributionQueue, firstAccount } = await loadFixture(deployFixture);

      expect(await distributionQueue.owner()).to.equal(firstAccount.address);
    });

    it("Should set the right attestation handler", async function () {
      const { distributionQueue } = await loadFixture(deployFixture);

      expect(await distributionQueue.attestationHandler()).to.equal(hre.ethers.ZeroAddress);
    });
  });

  describe("AttestationHandler", function () {
    it("Should emit an event on update attestation handler", async function () {
      const { distributionQueue, otherAccount } = await loadFixture(deployFixture);

      const attestationHandler = otherAccount.address;
      console.log("attestationHandler:", attestationHandler);
      await expect(distributionQueue.updateAttestationHandler(attestationHandler))
        .to.emit(distributionQueue, "AttestationHandlerUpdated");
    });
  });

  describe("Distributions", function () {
    it("Should emit an event on addDistribution", async function () {
      const { distributionQueue } = await loadFixture(deployFixture);

      await expect(distributionQueue.addDistribution())
        .to.emit(distributionQueue, "DistributionAdded");
    });

    it("Should increase queue count on addDistribution", async function () {
      const { distributionQueue } = await loadFixture(deployFixture);

      const queueCountBefore = await distributionQueue.getQueueCount();
      console.log("queueCountBefore:", queueCountBefore);
      expect(queueCountBefore).to.equal(0);

      await distributionQueue.addDistribution();
      
      const queueCountAfter = await distributionQueue.getQueueCount();
      console.log("queueCountAfter:", queueCountAfter);
      expect(queueCountAfter).to.equal(1);
    });
  });
});
