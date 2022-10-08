// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.9;

contract SelfdestructCallee {
    uint256 public number;

    constructor() {}

    function setNumber(uint256 _num) public {
        number = _num;
    }

    function selfdelete() public {
        selfdestruct(payable(msg.sender));
    }
}
