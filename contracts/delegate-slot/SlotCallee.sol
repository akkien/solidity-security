// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.9;

contract SlotCallee {
    uint256 public number;

    function setNumber(uint256 _number) public {
        number = _number;
    }
}
