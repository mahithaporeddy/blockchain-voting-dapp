/*
Major Project:
Decentralized Voting System

Features:
Admin controlled election
One wallet one vote
Transparent results
Blockchain based storage
*/
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MajorVoting {

    address public admin;

    bool public votingStarted;
    bool public votingEnded;

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    uint public candidateCount;

    mapping(address => bool) public hasVoted;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin allowed");
        _;
    }

    function addCandidate(string memory _name) public onlyAdmin {

        candidateCount++;

        candidates[candidateCount] = Candidate(
            candidateCount,
            _name,
            0
        );
    }

    function startVoting() public onlyAdmin {
        votingStarted = true;
    }

    function endVoting() public onlyAdmin {
        votingEnded = true;
    }

    function vote(uint _candidateId) public {

        require(votingStarted == true, "Voting not started");
        require(votingEnded == false, "Voting ended");

        require(hasVoted[msg.sender] == false, "Already voted");

        require(_candidateId > 0 && _candidateId <= candidateCount, "Invalid candidate");

        candidates[_candidateId].voteCount++;

        hasVoted[msg.sender] = true;
    }

    function getVotes(uint _candidateId) public view returns(uint) {

        return candidates[_candidateId].voteCount;

    }

}