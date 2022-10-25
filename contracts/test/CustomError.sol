// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.9;

contract CustomError {
    uint256 public number;

    error InvalidNumber(uint256 number, address sender);

    function setNumber1(uint256 _num) public {
        number = _num;
        require(_num >= 10, "InvalidNumber");
    }

    function setNumber2(uint256 _num) public {
        number = _num;
        if (_num < 10) {
            revert InvalidNumber(_num, msg.sender);
        }
    }
}
