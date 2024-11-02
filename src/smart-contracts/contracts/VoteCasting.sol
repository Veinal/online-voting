// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
// pragma solidity ^0.8.0;

contract VoteCasting {
    struct Voter {
        bool hasVoted;
        uint256 candidateId;
    }

    mapping(uint256 => mapping(address => Voter)) public electionVotes; // electionId => voter address => Voter struct
    mapping(uint256 => mapping(uint256 => uint256)) public candidateVoteCounts; // electionId => candidateId => vote count

    event VoteCasted(uint256 electionId, address voter, uint256 candidateId);

    function castVote(uint256 _electionId, uint256 _candidateId) public {
        require(!electionVotes[_electionId][msg.sender].hasVoted, "Already voted in this election");

        electionVotes[_electionId][msg.sender] = Voter({
            hasVoted: true,
            candidateId: _candidateId
        });

        candidateVoteCounts[_electionId][_candidateId] += 1;
        
        emit VoteCasted(_electionId, msg.sender, _candidateId);
    }

    function getCandidateVoteCount(uint256 _electionId, uint256 _candidateId) public view returns (uint256) {
        return candidateVoteCounts[_electionId][_candidateId];
    }

    function hasVoted(uint256 _electionId, address _voter) public view returns (bool) {
        return electionVotes[_electionId][_voter].hasVoted;
    }
}
