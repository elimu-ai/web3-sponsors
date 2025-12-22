# Web3 Sponsors 🫶🏽

Interfaces for interacting with the Ξlimu DAO's education sponsorship program (https://sponsors.elimu.ai)

If you want to integrate your own smart contracts with Ξlimu DAO's education sponsorship program, install this library:

```shell
npm install @elimu-ai/web3-sponsors
```

## Add Sponsorship 💜

If you want your smart contract to *add a new sponsorship* to our queue of sponsorships, start by importing its interface:

Then, instantiate the smart contract(s) you want to interact with:

```solidity
import { ISponsorshipQueue } from "@elimu-ai/web3-sponsors/ISponsorshipQueue.sol";

contract MyContract {
    ISponsorshipQueue public immutable sponsorshipQueue;

    constructor() {
        sponsorshipQueue = ISponsorshipQueue("0x7e2551180F8d45D0fB4787c86934096fCF05B0fc");
    }

    function myFunction() {
        sponsorshipQueue.addSponsorship();
    }
}
```

Next, add logic to your smart contract for checking if it holds enough ETH to pay for one sponsorship:

```diff
function myFunction() {
+    require(address(this).balance > sponsorshipQueue.estimatedCost(), "Not enough ETH");
    sponsorshipQueue.addSponsorship();
}
```

For a sample implementation, see [`CommunityFund.sol`](https://github.com/elimu-ai/web3-sponsors/tree/main/backend/contracts/sample/CommunityFund.sol).

> [!WARNING]
> The `estimatedCost` parameter set in the SponsorshipQueue smart contract can be adjusted by the Ξlimu DAO, so make sure to implement your code in a way that can handle this.

## Add Distribution 🛵💨

Coming soon...

---

The mission of elimu.ai is to build innovative learning software that empowers out-of-school children to teach themselves basic reading📖, writing✍🏽 and math🔢 **within 6 months**.

To learn more about the Ξlimu DAO, see https://github.com/elimu-ai/web3-wiki
