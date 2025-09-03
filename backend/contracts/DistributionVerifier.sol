// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { IRoles } from "@elimu-ai/dao-contracts/IRoles.sol";

/// @notice Handles approval/rejection of distributions added to `DistributionQueue.sol`
contract DistributionVerifier {
    address public owner;
    IRoles public roles;
    mapping(uint24 => uint8) public approvalCount;
    mapping(uint24 => uint8) public rejectionCount;
    mapping(uint24 => mapping(address => bool)) verifications;

    event OwnerUpdated(address owner);
    event RolesUpdated(address roles);
    event DistributionApproved(uint24 queueNumber, address operator);
    event DistributionRejected(uint24 queueNumber, address operator);

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

    function verifyDistribution(uint24 queueNumber, bool approved) public {
        require(roles.isDaoOperator(msg.sender), "Only DAO operators can approve/reject distributions");
        require(!verifications[queueNumber][msg.sender], "Verification already exists for this DAO operator");
        if (approved) {
            approvalCount[queueNumber] += 1;
            verifications[queueNumber][msg.sender] = true;
            emit DistributionApproved(queueNumber, msg.sender);
        } else {
            rejectionCount[queueNumber] += 1;
            verifications[queueNumber][msg.sender] = true;
            emit DistributionRejected(queueNumber, msg.sender);
        }
    }

    function isDistributionApproved(uint24 queueNumber) public view returns (bool) {
        return approvalCount[queueNumber] > rejectionCount[queueNumber];
    }

    function isDistributionRejected(uint24 queueNumber) public view returns (bool) {
        return rejectionCount[queueNumber] > approvalCount[queueNumber];
    }
}
