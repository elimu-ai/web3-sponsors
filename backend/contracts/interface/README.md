# Web3 Sponsors 🫶🏽

Interfaces for interacting with the Ξlimu DAO's education sponsorship program (https://sponsors.elimu.ai)

If you want to integrate your own smart contracts with Ξlimu DAO's education sponsorship program, install this library:

```shell
npm install @elimu-ai/sponsors
```

## Add Sponsorship 💜

If you want your smart contract to *add a new sponsorship* to our queue of sponsorships, start by importing its interface. Then, instantiate the smart contract address you want to interact with.

```solidity
import { ISponsorshipQueue } from "@elimu-ai/sponsors/ISponsorshipQueue.sol";

contract MyContract {
    ISponsorshipQueue public immutable sponsorshipQueue;

    constructor(address sponsorshipQueue_) {
        sponsorshipQueue = ISponsorshipQueue(sponsorshipQueue_);
    }

    function myFunction() {
        uint256 cost = sponsorshipQueue.estimatedCost();
        sponsorshipQueue.addSponsorship{value: cost}();
    }
}
```

Next, add logic to your smart contract for checking if it holds enough ETH to pay for one sponsorship:

```diff
function myFunction() {
    uint256 cost = sponsorshipQueue.estimatedCost();
+    require(address(this).balance >= cost, "Not enough ETH");
    sponsorshipQueue.addSponsorship{value: cost}();
}
```

For a sample implementation, see [`CommunityFund.sol`](https://github.com/elimu-ai/web3-sponsors/tree/main/backend/contracts/sample/CommunityFund.sol).

> [!WARNING]
> The `estimatedCost` parameter set in the SponsorshipQueue smart contract can be adjusted by the Ξlimu DAO, so make sure to implement your code in a way that can handle this.

## Add Distribution 🛵💨

If you want your smart contract to *add a new distribution* to our queue of distributions, add the following:

```solidity
import { IDistributionQueue } from "@elimu-ai/sponsors/IDistributionQueue.sol";

contract MyContract {
    IDistributionQueue public immutable distributionQueue;

    constructor(address distributionQueue_) {
        distributionQueue = IDistributionQueue(distributionQueue_);
    }

    function myFunction(string calldata languageCode, string calldata androidId) public {
        distributionQueue.addDistribution(languageCode, androidId);
    }
}
```

For a sample implementation, see [`DistributionImporter.sol`](https://github.com/elimu-ai/web3-sponsors/tree/main/backend/contracts/sample/DistributionImporter.sol).

---

The mission of elimu.ai is to build innovative learning software that empowers out-of-school children to teach themselves basic reading📖, writing✍🏽 and math🔢 **within 6 months**.

To learn more about the Ξlimu DAO, see https://github.com/elimu-ai/web3-wiki
