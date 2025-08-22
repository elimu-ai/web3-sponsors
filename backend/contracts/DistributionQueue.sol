// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { ILanguages } from "@elimu-ai/dao-contracts/ILanguages.sol";

struct Distribution {
    string languageCode;
    string androidId;
    uint256 timestamp;
    address distributor;
}

/// @notice A queue of distributions for the Ξlimu DAO's education program (see https://sponsors.elimu.ai)
contract DistributionQueue {
    address public owner;
    ILanguages public languages;
    address public queueHandler;
    mapping(uint24 => Distribution) public queue;
    uint24 public queueNumberFirst = 0;
    uint24 public queueNumberLast = 0;

    event OwnerUpdated(address owner);
    event DistributionAdded(Distribution distribution);

    error InvalidLanguageCode();

    constructor(address languages_) {
        owner = msg.sender;
        languages = ILanguages(languages_);
    }

    function updateOwner(address owner_) public {
        require(msg.sender == owner, "Only the current owner can set a new owner");
        owner = owner_;
        emit OwnerUpdated(owner_);
    }

    function addDistribution(string calldata languageCode, string calldata androidId) public {
        if (!languages.isSupportedLanguage(languageCode)) {
            revert InvalidLanguageCode();
        }
        Distribution memory distribution = Distribution(
            languageCode,
            androidId,
            block.timestamp,
            msg.sender
        );
        enqueue(distribution);
        emit DistributionAdded(distribution);
    }

    function enqueue(Distribution memory sponsorship) public {
        queueNumberLast += 1;
        queue[queueNumberLast] = sponsorship;
    }

    function dequeue() public returns (Distribution memory) {
        require(msg.sender == queueHandler, "Only the queue handler can remove from the queue");
        Distribution memory distribution = queue[queueNumberFirst];
        delete queue[queueNumberFirst];
        queueNumberFirst += 1;
        return distribution;
    }

    function getLength() public view returns (uint256) {
        return queueNumberLast - queueNumberFirst;
    }
}
