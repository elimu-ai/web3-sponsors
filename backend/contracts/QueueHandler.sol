// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { IRoles } from "@elimu-ai/dao-contracts/IRoles.sol";
import { Sponsorship, SponsorshipQueue } from "./SponsorshipQueue.sol";
import { Distribution, DistributionQueue } from "./DistributionQueue.sol";
import { IDistributionVerifier } from "./interface/DistributionVerifier.sol";

/// @notice Handles pairing of sponsorships with distributions
contract QueueHandler {
    address public owner;
    IRoles public roles;
    SponsorshipQueue public immutable sponsorshipQueue;
    DistributionQueue public immutable distributionQueue;
    IDistributionVerifier public distributionVerifier;

    event OwnerUpdated(address);
    event RolesUpdated(address);
    event DistributionVerifierUpdated(address);

    constructor(address roles_, address sponsorshipQueue_, address distributionQueue_, address distributionVerifier_) {
        owner = msg.sender;
        roles = IRoles(roles_);
        sponsorshipQueue = SponsorshipQueue(sponsorshipQueue_);
        distributionQueue = DistributionQueue(distributionQueue_);
        distributionVerifier = IDistributionVerifier(distributionVerifier_);
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

    function updateDistributionVerifier(address distributionVerifier_) public {
        require(msg.sender == owner, "Only the owner can set the `distributionVerifier` address");
        distributionVerifier = IDistributionVerifier(distributionVerifier_);
        emit DistributionVerifierUpdated(distributionVerifier_);
    }

    /// @notice Pair the next distribution (if approved) with the next sponsorship
    function processQueuePair() public {
        require(roles.isDaoOperator(msg.sender), "Only DAO operators can process queue pairing");

        // Before proceeding, verify that the queue of distributions is not empty
        require(distributionQueue.getLength() > 0, "The distribution queue cannot be empty");

        // Check if the next distribution in the queue has been approved/rejected yet
        uint24 distributionQueueNumber = distributionQueue.queueNumberFront();
        bool isDistributionApproved = distributionVerifier.isDistributionApproved(distributionQueueNumber);
        bool isRejected = distributionVerifier.isDistributionRejected(distributionQueueNumber);
        require(isDistributionApproved || isRejected, "The distribution must first be approved/rejected");

        // Before proceeding, verify that the queue of sponsorships is not empty
        require(sponsorshipQueue.getLength() > 0, "The sponsorship queue cannot be empty");

        // Remove the distribution from the queue
        Distribution memory distribution = distributionQueue.dequeue();

        if (isDistributionApproved) {
            // Remove the sponsorship from the queue
            Sponsorship memory sponsorship = sponsorshipQueue.dequeue();

            // Transfer ETH from the sponsorship to the distributor
            sponsorshipQueue.payDistributor(distribution.distributor, sponsorship);
        }
    }
}
