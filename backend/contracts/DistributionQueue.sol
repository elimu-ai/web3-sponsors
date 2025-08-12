// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

struct Distribution {
    uint256 timestamp;
    address distributor;
}

/// @notice A queue of distributions for the Ξlimu DAO's education program (see https://sponsors.elimu.ai)
contract DistributionQueue {
    address owner;
    Distribution[] queue;

    event OwnerUpdated(address owner);
    event DistributionAdded(Distribution distribution);

    error OnlyOwner();

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert OnlyOwner();
        }
        _;
    }

    function updateOwner(address _owner) public onlyOwner() {
        owner = _owner;
        emit OwnerUpdated(_owner);
    }

    function addDistribution() public {
        Distribution memory distribution = Distribution(
            block.timestamp,
            msg.sender
        );
        queue.push(distribution);
        emit DistributionAdded(distribution);
    }

    function getQueueCount() public view returns (uint256) {
        return queue.length;
    }
}
