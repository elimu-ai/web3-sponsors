import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("SponsorshipQueue", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [firstAccount, otherAccount] = await hre.ethers.getSigners();

    const estimatedCost = hre.ethers.parseUnits("0.02");

    const SponsorshipQueue = await hre.ethers.getContractFactory("SponsorshipQueue");
    const sponsorshipQueue = await SponsorshipQueue.deploy(estimatedCost);

    return { sponsorshipQueue, firstAccount, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right estimated cost", async function () {
      const { sponsorshipQueue } = await loadFixture(deployFixture);

      const expectedValue = hre.ethers.parseUnits("0.02");
      console.log("expectedValue:", expectedValue);
      expect(await sponsorshipQueue.estimatedCost()).to.equal(expectedValue);
    });

    it("Should set the right owner", async function () {
      const { sponsorshipQueue, firstAccount } = await loadFixture(deployFixture);

      expect(await sponsorshipQueue.owner()).to.equal(firstAccount.address);
    });
  });

  describe("EstimatedCost", function () {
    it("Should emit an event on update", async function () {
      const { sponsorshipQueue } = await loadFixture(deployFixture);

      const newEstimatedCost = hre.ethers.parseUnits("0.03");
      console.log("newEstimatedCost:", newEstimatedCost);
      await expect(sponsorshipQueue.updateEstimatedCost(newEstimatedCost))
        .to.emit(sponsorshipQueue, "EstimatedCostUpdated")
        .withArgs(newEstimatedCost);
    });
  });

  describe("Sponsorships", function () {
    it("Should emit an event on addSponsorship", async function () {
      const { sponsorshipQueue, firstAccount } = await loadFixture(deployFixture);

      const firstAccountBalance = await hre.ethers.provider.getBalance(firstAccount.address);
      console.log("firstAccountBalance:", firstAccountBalance);

      await expect(sponsorshipQueue.addSponsorship({ value: hre.ethers.parseUnits("0.02") }))
        .to.emit(sponsorshipQueue, "SponsorshipAdded");
    });

    it("Should increase contract balance on addSponsorship", async function () {
      const { sponsorshipQueue, firstAccount } = await loadFixture(deployFixture);

      const firstAccountBalance = await hre.ethers.provider.getBalance(firstAccount.address);
      console.log("firstAccountBalance:", firstAccountBalance);

      console.log("sponsorshipQueue.target:", sponsorshipQueue.target);

      await sponsorshipQueue.addSponsorship({ value: hre.ethers.parseUnits("0.02") });
      const contractBalance = await hre.ethers.provider.getBalance(sponsorshipQueue.target);
      console.log("contractBalance:", contractBalance);
      expect(contractBalance).to.equal(hre.ethers.parseUnits("0.02"));
    });

    it("Should increase queue count on addSponsorship", async function () {
      const { sponsorshipQueue } = await loadFixture(deployFixture);

      const queueCountBefore = await sponsorshipQueue.getQueueCount();
      console.log("queueCountBefore:", queueCountBefore);
      expect(queueCountBefore).to.equal(0);

      await sponsorshipQueue.addSponsorship({ value: hre.ethers.parseUnits("0.02") });
      
      const queueCountAfter = await sponsorshipQueue.getQueueCount();
      console.log("queueCountAfter:", queueCountAfter);
      expect(queueCountAfter).to.equal(1);
    });
  });
});
