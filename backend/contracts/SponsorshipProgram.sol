// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * Education sponsorship program, for delivering education to out-of-school children.
 */
contract SponsorshipProgram {
    address public owner;
    uint256 public estimatedCost;

    event EstimatedCostUpdated(uint256 amount);

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

    function updateEstimatedCost(uint256 amount) public onlyOwner {
        estimatedCost = amount;
        emit EstimatedCostUpdated(amount);
    }
}
