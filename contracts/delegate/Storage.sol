// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract Storage {
    uint256 private number;

    event SenderInfo(address addr, uint256 value);

    constructor(uint256 _number) {
        number = _number;
    }

    function setNumber(uint256 _number) public payable {
        number = _number;
        emit SenderInfo(msg.sender, msg.value);
    }

    function getNumber() public view returns (uint256) {
        return number;
    }
}
