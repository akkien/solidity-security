// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.9;

contract StorageToClone {
    uint256 number;

    event Set(uint256 indexed number, uint256 time);

    function set(uint256 a) public {
        assembly {
            sstore(number.slot, a)

            mstore(0, timestamp())
            let
                eventSig
            := 0x545b620a3000f6303b158b321f06b4e95e28a27d70aecac8c6bdac4f48a9f6b3 // Set(uint256,uint256)
            log2(0, 0x20, eventSig, a)
        }
    }

    function get() public view returns (uint256) {
        assembly {
            mstore(0x0, sload(number.slot))
            return(0x0, 32)
        }
    }

    function callData(uint256 number) public pure returns (uint256) {
        assembly {
            let val := calldataload(0x4) // call data starts at 0x4
            mstore(0x0, val)
            return(0x0, 32)
        }
    }

    function callData2(address a, uint256 b) public pure {
        assembly {
            function decodeAsAddress(offset) -> v {
                v := decodeAsUint(offset)
                if iszero(
                    iszero(
                        and(v, not(0xffffffffffffffffffffffffffffffffffffffff))
                    )
                ) {
                    revert(0, 0)
                }
            }
            function decodeAsUint(offset) -> v {
                let pos := add(4, mul(offset, 0x20))
                if lt(calldatasize(), add(pos, 0x20)) {
                    revert(0, 0)
                }
                v := calldataload(pos)
            }

            let gotA := decodeAsAddress(0)
            let gotB := decodeAsUint(1)
        }
    }
}
