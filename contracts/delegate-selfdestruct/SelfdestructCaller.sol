// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.9;

contract SelfdestructCaller {
    uint256 public number;
    uint256[50] public __gap;

    constructor() {}

    function delegateSetNumber(address logic, uint256 num) public {
        (bool success, ) = logic.delegatecall(
            abi.encodeWithSignature("setNumber(uint256)", num)
        );
        require(success, "delegate fail");
    }

    function delegateDelete(address logic) public {
        (bool success, ) = logic.delegatecall(
            abi.encodeWithSignature("selfdelete()")
        );
        require(success, "delegate fail");
    }
}
