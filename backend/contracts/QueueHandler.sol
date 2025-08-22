// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { IRoles } from "@elimu-ai/dao-contracts/IRoles.sol";
import { Sponsorship, SponsorshipQueue } from "./SponsorshipQueue.sol";
import { Distribution, DistributionQueue } from "./DistributionQueue.sol";
import { DistributionVerifier } from "./DistributionVerifier.sol";

/// @notice Handles pairing of sponsorships with distributions
contract QueueHandler {
    address public owner;
    IRoles public roles;
    SponsorshipQueue public sponsorshipQueue;
    DistributionQueue public distributionQueue;
    DistributionVerifier public distributionVerifier;

    event OwnerUpdated(address owner);
    event RolesUpdated(address roles);

    constructor(address roles_, address sponsorshipQueue_, address distributionQueue_, address distributionVerifier_) {
        owner = msg.sender;
        roles = IRoles(roles_);
        sponsorshipQueue = SponsorshipQueue(sponsorshipQueue_);
        distributionQueue = DistributionQueue(distributionQueue_);
        distributionVerifier = DistributionVerifier(distributionVerifier_);
    }

    function updateOwner(address owner_) public {
        require(msg.sender == owner, "Only the current owner can set a new owner");
        owner = owner_;
        emit OwnerUpdated(owner_);
    }

    function updateRoles(address roles_) public {
        require(msg.sender == owner, "Only the owner can set the `roles` address");
        roles = IRoles(roles_);
        emit RolesUpdated(roles_);
    }

    function processSponsorship() public {
        require(roles.isDaoOperator(msg.sender), "Only DAO operators can process sponsorships");

        // Check if the next distribution in the queue has been approved/rejected yet
        uint24 distributionQueueNumber = distributionQueue.queueNumberFirst();
        bool isApproved = distributionVerifier.isDistributionApproved(distributionQueueNumber);
        bool isRejected = distributionVerifier.isDistributionRejected(distributionQueueNumber);
        require(isApproved || isRejected, "The distribution must first be approved/rejected");

        // Remove the distribution from the queue
        Distribution memory distribution = distributionQueue.dequeue();

        if (isApproved) {
            // Remove the sponsorship from the queue
            Sponsorship memory sponsorship = sponsorshipQueue.dequeue();

            // Transfer ETH to the distributor
            sponsorshipQueue.payDistributor(distribution.distributor, sponsorship);
        }
    }
}
