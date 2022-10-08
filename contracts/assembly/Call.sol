// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract Callee {
    function testFunc1() public pure returns (string memory) {
        return "Hello World!";
    }

    function testFunc2() public pure returns (uint256) {
        return 99;
    }
}

contract Caller {
    Callee callee;

    constructor() {
        callee = new Callee();
    }

    function callTestFunc1() public view returns (string memory) {
        callee.testFunc1();

        uint256 retStrLen;
        assembly {
            retStrLen := returndatasize()
        }

        string memory retStr = new string(retStrLen);
        assembly {
            returndatacopy(add(retStr, 32), 0, retStrLen)
            return(add(retStr, 32), retStrLen)
        }

        // return retStr; // this works too
    }

    function callTestFunc2() public view returns (uint256) {
        callee.testFunc2();
        assembly {
            returndatacopy(0x40, 0, 32) // we know testFunc2 return 32 bytes (uint256)
            return(0x40, 32)
        }
    }
}
