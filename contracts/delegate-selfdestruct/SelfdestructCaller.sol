// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.9;

contract SelfdestructCaller {
    uint256 public number;
    uint256[50] public __gap;

    constructor() {}

    function delegateSetNumber(address logic, uint256 num) public {
        (bool success, bytes memory data) = logic.delegatecall(
            abi.encodeWithSignature("setNumber(uint256)", num)
        );
    }

    function delegateDelete(address logic) public {
        (bool success, bytes memory data) = logic.delegatecall(
            abi.encodeWithSignature("selfdelete()")
        );
    }
}
