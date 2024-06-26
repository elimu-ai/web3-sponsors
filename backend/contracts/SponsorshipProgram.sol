// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * A system for sponsoring the education of one individual child.
 */
contract SponsorshipProgram {
    address public owner;
    uint256 public sponsorshipCost;

    event SponsorshipCostUpdated(uint256 amount);

    error OnlyOwner();

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert OnlyOwner();
        }
        _;
    }

    constructor(uint256 _sponsorshipCost) {
        owner = msg.sender;
        sponsorshipCost = _sponsorshipCost;
    }

    function updateSponsorshipCost(uint256 amount) public onlyOwner {
        sponsorshipCost = amount;
        emit SponsorshipCostUpdated(amount);
    }
}
