// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

enum DistributionStatus {
    DeviceDelivered,
    Approved,
    Rejected,
    Paid
}

struct Distribution {
    uint256 timestamp;
    address distributor;
    DistributionStatus status;
}

contract DistributionQueue {
    address public owner;
    address public attestationHandler;
    Distribution[] public queue;

    event OwnerUpdated(address owner);
    event AttestationHandlerUpdated(address attestationHandler);
    event DistributionAdded(Distribution distribution);
    event DistributionStatusUpdated(Distribution distribution);

    error OnlyOwner();
    error OnlyAttestationHandler();

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert OnlyOwner();
        }
        _;
    }

    modifier onlyAttestationHandler() {
        if (msg.sender != owner) {
            revert OnlyAttestationHandler();
        }
        _;
    }

    constructor(address _attestationHandler) {
        owner = msg.sender;
        attestationHandler = _attestationHandler;
    }

    function updateOwner(address _owner) public onlyOwner() {
        owner = _owner;
        emit OwnerUpdated(_owner);
    }

    function updateAttestationHandler(address _attestationHandler) public onlyAttestationHandler() {
        attestationHandler = _attestationHandler;
        emit AttestationHandlerUpdated(_attestationHandler);
    }

    function addDistribution() public {
        Distribution memory distribution = Distribution(
            block.timestamp,
            msg.sender,
            DistributionStatus.DeviceDelivered
        );
        queue.push(distribution);
        emit DistributionAdded(distribution);
    }

    function updateDistributionStatus(uint256 queueIndex, DistributionStatus _distributionStatus) public onlyAttestationHandler() {
        Distribution memory distribution = queue[queueIndex];
        distribution.status = _distributionStatus;
        emit DistributionStatusUpdated(distribution);
    }

    function getQueueCount() public view returns (uint256) {
        return queue.length;
    }
}
