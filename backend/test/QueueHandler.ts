import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("QueueHandler", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [account1, account2, account3] = await hre.ethers.getSigners();

    const ElimuToken = await hre.ethers.getContractFactory("DummyERC20");
    const elimuToken = await ElimuToken.deploy("elimu.ai", "ELIMU");

    const GElimuToken = await hre.ethers.getContractFactory("DummyERC20");
    const gElimuToken = await GElimuToken.deploy("Governance elimu.ai", "gELIMU");

    const Roles = await hre.ethers.getContractFactory("DummyRoles");
    const roles = await Roles.deploy(elimuToken.getAddress(), gElimuToken.getAddress());

    const Languages = await hre.ethers.getContractFactory("DummyLanguages");
    const languages = await Languages.deploy();
    await languages.addSupportedLanguage("HIN");

    const SponsorshipQueue = await hre.ethers.getContractFactory("SponsorshipQueue");
    const estimatedCost = hre.ethers.parseUnits("0.02");
    const sponsorshipQueue = await SponsorshipQueue.deploy(estimatedCost, await languages.getAddress());

    const DistributionQueue = await hre.ethers.getContractFactory("DistributionQueue");
    const distributionQueue = await DistributionQueue.deploy(await languages.getAddress());

    const DistributionVerifier = await hre.ethers.getContractFactory("DistributionVerifier");
    const distributionVerifier = await DistributionVerifier.deploy(await roles.getAddress());

    const QueueHandler = await hre.ethers.getContractFactory("QueueHandler");
    const queueHandler = await QueueHandler.deploy(
      await roles.getAddress(),
      await sponsorshipQueue.getAddress(),
      await distributionQueue.getAddress(),
      await distributionVerifier.getAddress()
    );

    return { queueHandler, roles, distributionVerifier, account1, account2, account3 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { queueHandler, account1 } = await loadFixture(deployFixture);

      expect(await queueHandler.owner()).to.equal(account1.address);
    });

    it("Should set the right Roles contract", async function () {
      const { queueHandler, roles } = await loadFixture(deployFixture);

      expect(await queueHandler.roles()).to.equal(await roles.getAddress());
    });

    it("Should set the right DistributionVerifier contract", async function () {
      const { queueHandler, distributionVerifier } = await loadFixture(deployFixture);

      expect(await queueHandler.distributionVerifier()).to.equal(await distributionVerifier.getAddress());
    });
  });

  describe("Update owner address", function () {
    it("Should change the right owner", async function () {
      const { queueHandler, account1, account2 } = await loadFixture(deployFixture);

      expect(await queueHandler.owner()).to.equal(account1.address);
      await queueHandler.updateOwner(account2.address);
      expect(await queueHandler.owner()).to.equal(account2.address);
    });
  });

  describe("Update Roles contract", function () {
    it("Should change the Roles contract", async function () {
      const { queueHandler, roles } = await loadFixture(deployFixture);

      expect(await queueHandler.roles()).to.equal(await roles.getAddress());
      await queueHandler.updateRoles(ethers.ZeroAddress);
      expect(await queueHandler.roles()).to.equal(ethers.ZeroAddress);
    });
  });

  describe("Update DistributionVerifier contract", function () {
    it("Should change the DistributionVerifier contract", async function () {
      const { queueHandler, distributionVerifier } = await loadFixture(deployFixture);

      expect(await queueHandler.distributionVerifier()).to.equal(await distributionVerifier.getAddress());
      await queueHandler.updateDistributionVerifier(ethers.ZeroAddress);
      expect(await queueHandler.distributionVerifier()).to.equal(ethers.ZeroAddress);
    });
  });

  describe("Process Queue Pair", function () {
    it("Transaction should be rejected if distribution queue is empty", async function () {
      const { queueHandler } = await loadFixture(deployFixture);

      await expect(queueHandler.processQueuePair()).to.be.rejected;
    });
  });
});
