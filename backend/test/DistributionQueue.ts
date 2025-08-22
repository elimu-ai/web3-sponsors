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

    const Languages = await hre.ethers.getContractFactory("DummyLanguages");
    const languages = await Languages.deploy();
    await languages.addSupportedLanguage("HIN");

    const DistributionQueue = await hre.ethers.getContractFactory("DistributionQueue");
    const distributionQueue = await DistributionQueue.deploy(await languages.getAddress());

    return { distributionQueue, firstAccount, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { distributionQueue, firstAccount } = await loadFixture(deployFixture);

      expect(await distributionQueue.owner()).to.equal(firstAccount.address);
    });
  });

  describe("Distributions", function () {
    it ("Should revert with an error if invalid language code", async function () {
      const { distributionQueue } = await loadFixture(deployFixture);

      await expect(distributionQueue.addDistribution("SWA", "fbc880caac090c43"))
        .to.be.revertedWithCustomError(distributionQueue, "InvalidLanguageCode");
    });

    it("Should emit an event on addDistribution", async function () {
      const { distributionQueue } = await loadFixture(deployFixture);

      await expect(distributionQueue.addDistribution("HIN", "fbc880caac090c43"))
        .to.emit(distributionQueue, "DistributionAdded");
    });

    it("Should increase queue count on addDistribution", async function () {
      const { distributionQueue } = await loadFixture(deployFixture);

      const queueLengthBefore = await distributionQueue.getLength();
      console.log("queueLengthBefore:", queueLengthBefore);
      expect(queueLengthBefore).to.equal(0);

      await distributionQueue.addDistribution("HIN", "fbc880caac090c43");
      
      const queueLengthAfter = await distributionQueue.getLength();
      console.log("queueLengthAfter:", queueLengthAfter);
      expect(queueLengthAfter).to.equal(1);
    });
  });
});
