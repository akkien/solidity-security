// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.9;

contract Storage {
    uint256 public number;

    function setNumber(uint256 _num, uint256 inc) public {
        if (number == 0) {
            number = number + inc;
        }
    }

    function setNumber2(uint256 _num, uint256 inc) public {
        uint256 no = number;

        if (no == 0) {
            number = no + inc;
        }
    }
}
