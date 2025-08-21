// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { IRoles } from "@elimu-ai/dao-contracts/IRoles.sol";

/// @notice Handles approval/rejection of distributions added to `DistributionQueue.sol`
contract DistributionVerifier {
    address public owner;
    IRoles public roles;
    mapping(uint24 => uint8) approvalCount;
    mapping(uint24 => uint8) rejectionCount;

    event OwnerUpdated(address owner);
    event RolesUpdated(address roles);
    event DistributionApproved(uint24 queueIndex, address operator);
    event DistributionRejected(uint24 queueIndex, address operator);

    constructor(address roles_) {
        owner = msg.sender;
        roles = IRoles(roles_);
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

    function verifyDistribution(uint24 queueIndex, bool approved) public {
        require(roles.isDaoOperator(msg.sender), "Only DAO operators can approve/reject distributions");
        if (approved) {
            approvalCount[queueIndex] += 1;
            emit DistributionApproved(queueIndex, msg.sender);
        } else {
            rejectionCount[queueIndex] += 1;
            emit DistributionRejected(queueIndex, msg.sender);
        }
    }

    function isDistributionApproved(uint24 queueIndex) public view returns (bool) {
        return approvalCount[queueIndex] > rejectionCount[queueIndex];
    }
}
