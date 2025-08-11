// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { ILanguages } from "@elimu-ai/dao-contracts/ILanguages.sol";

struct Sponsorship {
    uint256 estimatedCost;
    string languageCode;
    uint256 timestamp;
    address sponsor;
}

contract SponsorshipQueue {
    address public owner;
    uint256 public estimatedCost;
    ILanguages public languages;
    Sponsorship[] public queue;

    event OwnerUpdated(address owner);
    event EstimatedCostUpdated(uint256 estimatedCost);
    event LanguagesUpdated(address _languages);
    event SponsorshipAdded(Sponsorship sponsorship);

    error OnlyOwner();
    error InvalidLanguageCode();

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert OnlyOwner();
        }
        _;
    }

    constructor(uint256 _estimatedCost, address _languages) {
        owner = msg.sender;
        estimatedCost = _estimatedCost;
        languages = ILanguages(_languages);
    }

    function updateOwner(address _owner) public onlyOwner() {
        owner = _owner;
        emit OwnerUpdated(_owner);
    }

    function updateEstimatedCost(uint256 _estimatedCost) public onlyOwner {
        estimatedCost = _estimatedCost;
        emit EstimatedCostUpdated(_estimatedCost);
    }

    function updateLanguages(address _languages) public onlyOwner {
        languages = ILanguages(_languages);
        emit LanguagesUpdated(_languages);
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
        queue.push(sponsorship);
        emit SponsorshipAdded(sponsorship);
    }

    function getQueueCount() public view returns (uint256) {
        return queue.length;
    }
}
