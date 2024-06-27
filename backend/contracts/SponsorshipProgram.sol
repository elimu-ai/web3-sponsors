// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * Education sponsorship program, for delivering education to out-of-school children.
 */
contract SponsorshipProgram {
    address public owner;
    uint256 public estimatedCost;

    event OwnerUpdated(address owner);
    event EstimatedCostUpdated(uint256 estimatedCost);

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
}
