// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import { ProtocolVersion } from "./utils/ProtocolVersion.sol";

struct Sponsorship {
    uint256 estimatedCost;
    uint256 timestamp;
    address sponsor;
}

/// @notice A queue of sponsorships for the Ξlimu DAO's education sponsorship program (https://sponsors.elimu.ai)
contract SponsorshipQueue is ProtocolVersion {
    address public owner;
    uint256 public estimatedCost;
    address public queueHandler;
    mapping(uint24 => Sponsorship) public queue;
    uint24 public queueNumberFront = 1;
    uint24 public queueNumberNext = 1;

    event OwnerUpdated(address);
    event EstimatedCostUpdated(uint256);
    event QueueHandlerUpdated(address);
    event SponsorshipAdded(uint24 queueNumber, address indexed sponsor);

    error InvalidLanguageCode();

    constructor(uint256 estimatedCost_) {
        owner = msg.sender;
        estimatedCost = estimatedCost_;
    }

    function updateOwner(address owner_) public {
        require(msg.sender == owner, "Only the current owner can set a new owner");
        owner = owner_;
        emit OwnerUpdated(owner_);
    }

    function updateEstimatedCost(uint256 estimatedCost_) public {
        require(msg.sender == owner, "Only the owner can set the `estimatedCost`");
        estimatedCost = estimatedCost_;
        emit EstimatedCostUpdated(estimatedCost_);
    }

    function updateQueueHandler(address queueHandler_) public {
        require(msg.sender == owner, "Only the owner can set the `queueHandler` address");
        queueHandler = queueHandler_;
        emit QueueHandlerUpdated(queueHandler_);
    }

    function addSponsorship() public payable {
        require(msg.value == estimatedCost, "Must send exactly the estimated cost");
        Sponsorship memory sponsorship = Sponsorship(
            estimatedCost,
            block.timestamp,
            msg.sender
        );
        enqueue(sponsorship);
        emit SponsorshipAdded(queueNumberFront - 1, msg.sender);
    }

    function enqueue(Sponsorship memory sponsorship) private {
        queue[queueNumberNext] = sponsorship;
        queueNumberNext += 1;
    }

    function dequeue() public returns (Sponsorship memory) {
        require(msg.sender == queueHandler, "Only the queue handler can remove from the queue");
        require(getLength() > 0, "Queue is empty");
        Sponsorship memory sponsorship = queue[queueNumberFront];
        delete queue[queueNumberFront];
        queueNumberFront += 1;
        return sponsorship;
    }

    function getLength() public view returns (uint256) {
        return queueNumberNext - queueNumberFront;
    }

    function payDistributor(address distributor, Sponsorship memory sponsorship) public {
        require(msg.sender == queueHandler, "Only the queue handler can process payouts");
        payable(distributor).transfer(sponsorship.estimatedCost);
    }
}
