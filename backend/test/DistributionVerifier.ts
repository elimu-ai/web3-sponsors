import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("DistributionVerifier", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [firstAccount, otherAccount] = await hre.ethers.getSigners();

    const ElimuToken = await hre.ethers.getContractFactory("DummyERC20");
    const elimuToken = await ElimuToken.deploy("elimu.ai", "ELIMU");

    const GElimuToken = await hre.ethers.getContractFactory("DummyERC20");
    const gElimuToken = await GElimuToken.deploy("Governance elimu.ai", "gELIMU");

    const Roles = await hre.ethers.getContractFactory("DummyRoles");
    const roles = await Roles.deploy(elimuToken.getAddress(), gElimuToken.getAddress());

    const DistributionVerifier = await hre.ethers.getContractFactory("DistributionVerifier");
    const distributionVerifier = await DistributionVerifier.deploy(await roles.getAddress());

    return { distributionVerifier, firstAccount, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { distributionVerifier, firstAccount } = await loadFixture(deployFixture);

      expect(await distributionVerifier.owner()).to.equal(firstAccount.address);
    });
  });

  
});
