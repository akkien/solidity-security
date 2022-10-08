// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract StorageUUPS is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    uint256 private number;

    event Init(address self);

    event UpgradeCaller(address caller);

    function Storage_init(uint256 _number) public initializer {
        number = _number;

        __Ownable_init();
    }

    function setNumber(uint256 _number) public onlyOwner {
        number = _number;
    }

    function getNumber() public view returns (uint256) {
        return number;
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        virtual
        override
    {
        require(msg.sender != address(0), "caller is address zero"); // just for test
        emit UpgradeCaller(msg.sender);
    }
}
