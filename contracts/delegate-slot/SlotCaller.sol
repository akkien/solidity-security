// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.9;

contract SlotCaller {
    function delegateSetNumber(address logic, uint256 num) public {
        (bool success, bytes memory data) = logic.delegatecall(
            abi.encodeWithSignature("setNumber(uint256)", num)
        );
    }

    function get() public view returns (uint256) {
        assembly {
            mstore(0x0, sload(0)) // 0 is the slot of number
            return(0x0, 32)
        }
    }
}
