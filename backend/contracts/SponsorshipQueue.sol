// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

struct Sponsorship {
    uint256 estimatedCost;
    uint256 timestamp;
    address sponsor;
}

contract SponsorshipQueue {
    address public owner;
    uint256 public estimatedCost;
    Sponsorship[] public queue;

    event OwnerUpdated(address owner);
    event EstimatedCostUpdated(uint256 estimatedCost);
    event SponsorshipAdded(Sponsorship sponsorship);

    error OnlyOwner();

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert OnlyOwner();
        }
        _;
    }

    constructor(uint256 _estimatedCost) {
        owner = msg.sender;
        estimatedCost = _estimatedCost;
    }

    function updateOwner(address _owner) public onlyOwner() {
        owner = _owner;
        emit OwnerUpdated(_owner);
    }

    function updateEstimatedCost(uint256 _estimatedCost) public onlyOwner {
        estimatedCost = _estimatedCost;
        emit EstimatedCostUpdated(_estimatedCost);
    }

    function addSponsorship() public payable {
        payable(address(this)).send(msg.value);
        Sponsorship memory sponsorship = Sponsorship(
            msg.value,
            block.timestamp,
            msg.sender
        );
        queue.push(sponsorship);
        emit SponsorshipAdded(sponsorship);
    }

    function getQueueCount() public view returns (uint256) {
        return queue.length;
    }
}
