// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import { ISponsorshipQueue } from "../interface/ISponsorshipQueue.sol";

contract CommunityFund {
    ISponsorshipQueue public immutable sponsorshipQueue;

    event Received(address, uint256);

    error InsufficientFunds(uint256);

    constructor(address sponsorshipQueue_) {
        sponsorshipQueue = ISponsorshipQueue(sponsorshipQueue_);
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    function fundSponsorship() public {
        if (address(this).balance < sponsorshipQueue.estimatedCost()) {
            revert InsufficientFunds(address(this).balance);
        }
        sponsorshipQueue.addSponsorship();
    }
}
