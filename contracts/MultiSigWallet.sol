pragma solidity ^0.8.4;

contract MultiSigWallet {
  address[] public approvers;
  uint public quorum;

  constructor(address[] memory _approvers, uint _quorum) public payable {
    approvers = _approvers
    quorum = _quorum
  }
}
