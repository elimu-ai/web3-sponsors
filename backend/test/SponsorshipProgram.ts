import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("SponsorshipProgram", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const sponsorshipCost = hre.ethers.parseUnits("0.02");

    const SponsorshipProgram = await hre.ethers.getContractFactory("SponsorshipProgram");
    const sponsorshipProgram = await SponsorshipProgram.deploy(sponsorshipCost);

    return { sponsorshipProgram, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right sponshorship cost", async function () {
      const { sponsorshipProgram } = await loadFixture(deployFixture);

      const expectedValue = hre.ethers.parseUnits("0.02");
      console.log("expectedValue:", expectedValue);
      expect(await sponsorshipProgram.sponsorshipCost()).to.equal(expectedValue);
    });

    it("Should set the right owner", async function () {
      const { sponsorshipProgram, owner } = await loadFixture(deployFixture);

      expect(await sponsorshipProgram.owner()).to.equal(owner.address);
    });
  });
});
