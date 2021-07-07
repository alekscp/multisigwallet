pragma solidity ^0.8.4;

contract MultiSigWallet {
    address[] public approvers;
    uint public quorum;

    struct Transfer {
        uint id;
        uint amount;
        address payable to;
        uint approvals;
        bool sent;
    }
    mapping(uint => Transfer) transfers;

    uint nextId;

    constructor(address[] memory _approvers, uint _quorum) public payable {
        approvers = _approvers;
        quorum = _quorum;
    }

    function createTransfer(uint amount, address payable to) external {
        // Container
        // Transfer
    }
}
