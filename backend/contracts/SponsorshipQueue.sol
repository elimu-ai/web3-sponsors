// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { ILanguages } from "@elimu-ai/dao-contracts/ILanguages.sol";

struct Sponsorship {
    uint256 estimatedCost;
    string languageCode;
    uint256 timestamp;
    address sponsor;
}

/// @notice A queue of sponsorships for the Ξlimu DAO's education program (see https://sponsors.elimu.ai)
contract SponsorshipQueue {
    address public owner;
    uint256 public estimatedCost;
    ILanguages public languages;
    address public queueHandler;
    mapping(uint24 => Sponsorship) public queue;
    uint24 public queueNumberFront = 0;
    uint24 public queueNumberNext = 0;

    event OwnerUpdated(address);
    event EstimatedCostUpdated(uint256);
    event LanguagesUpdated(address);
    event QueueHandlerUpdated(address);
    event SponsorshipAdded(Sponsorship);

    error InvalidLanguageCode();

    constructor(uint256 estimatedCost_, address languages_) {
        owner = msg.sender;
        estimatedCost = estimatedCost_;
        languages = ILanguages(languages_);
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

    function updateLanguages(address languages_) public {
        require(msg.sender == owner, "Only the owner can set the `languages` address");
        languages = ILanguages(languages_);
        emit LanguagesUpdated(languages_);
    }

    function updateQueueHandler(address queueHandler_) public {
        require(msg.sender == owner, "Only the owner can set the `queueHandler` address");
        queueHandler = queueHandler_;
        emit QueueHandlerUpdated(queueHandler_);
    }

    function addSponsorship(string calldata languageCode) public payable {
        if (!languages.isSupportedLanguage(languageCode)) {
            revert InvalidLanguageCode();
        }
        payable(address(this)).send(msg.value);
        Sponsorship memory sponsorship = Sponsorship(
            msg.value,
            languageCode,
            block.timestamp,
            msg.sender
        );
        enqueue(sponsorship);
        emit SponsorshipAdded(sponsorship);
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
        // TODO: emit event
    }
}
