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
    mapping(address => mapping(uint => bool)) approvals;

    uint nextId;

    constructor(address[] memory _approvers, uint _quorum) public payable {
        approvers = _approvers;
        quorum = _quorum;
    }

    function createTransfer(uint amount, address payable to) external onlyApprover(){
        transfers[nextId] = Transfer({
            id: nextId,
            amount: amount,
            to: to,
            approvals: 0,
            sent: false
        });

        nextId++;
    }

    function sendTransfer(uint id) external onlyApprover() {
        require(transfers[id].sent != false, "Transfer already sent.");

        if (transfers[id].approvals >= quorum) {
            transfers[id].sent = true;

            address payable to = transfers[id].to;
            uint amount = transfers[id].amount;

            to.transfer(amount);

            return;
        }

        if (approvals[msg.sender][id] == false) {
            approvals[msg.sender][id] = true;

            transfers[id].approvals++;
        }
    }

    modifier onlyApprover() {
        bool allowed = false;

        for (uint = 0; i < approvers.length; i++) {
            if (approvers[i] == msg.sender) {
                allowed = true;
            }
        }

        require(allowed == true, "Only approver allowed");
        _;
    }
}
