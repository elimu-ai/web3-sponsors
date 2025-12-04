// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import { IRoles } from "@elimu-ai/dao-contracts/IRoles.sol";
import { Sponsorship, SponsorshipQueue } from "./SponsorshipQueue.sol";
import { Distribution, DistributionQueue } from "./DistributionQueue.sol";
import { IDistributionVerifier } from "./interface/IDistributionVerifier.sol";
import { ProtocolVersion } from "./ProtocolVersion.sol";

/// @notice Handles pairing of sponsorships with distributions
contract QueueHandler is ProtocolVersion {
    address public owner;
    IRoles public roles;
    SponsorshipQueue public immutable sponsorshipQueue;
    DistributionQueue public immutable distributionQueue;
    IDistributionVerifier public distributionVerifier;

    event OwnerUpdated(address);
    event RolesUpdated(address);
    event DistributionVerifierUpdated(address);
    event QueuePairProcessed(Distribution, Sponsorship);

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

        // Verify that the queue of distributions is not empty
        require(distributionQueue.getLength() > 0, "The distribution queue cannot be empty");

        // Get the next distribution in the queue
        uint24 distributionQueueNumber = distributionQueue.queueNumberFront();

        // Verify that the distribution has been approved
        require(distributionVerifier.isDistributionApproved(distributionQueueNumber), "Only approved distributions can be processed");

        // Verify that the queue of sponsorships is not empty
        require(sponsorshipQueue.getLength() > 0, "The sponsorship queue cannot be empty");

        // Remove the distribution from the queue
        Distribution memory distribution = distributionQueue.dequeue();

        // Remove the sponsorship from the queue
        Sponsorship memory sponsorship = sponsorshipQueue.dequeue();

        // Transfer ETH from the sponsorship to the distributor
        sponsorshipQueue.payDistributor(distribution.distributor, sponsorship);

        // Emit event
        emit QueuePairProcessed(distribution, sponsorship);
    }

    /// @notice Remove rejected distribution from the queue
    function removeRejectedDistribution() public {
        // Verify that the queue of distributions is not empty
        require(distributionQueue.getLength() > 0, "The distribution queue cannot be empty");

        // Verify that the next distribution in the queue has been rejected
        uint24 distributionQueueNumber = distributionQueue.queueNumberFront();
        bool isDistributionRejected = distributionVerifier.isDistributionRejected(distributionQueueNumber);
        require(isDistributionRejected, "Only rejected distributions can be removed from the queue");

        // Remove the distribution from the queue
        distributionQueue.dequeue();
    }
}
