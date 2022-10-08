// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.9;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./StorageToClone.sol";

contract CloneFactory {
    function createCloneStorage(address implementation)
        public
        returns (address newStorage)
    {
        newStorage = Clones.clone(implementation);
    }
}
