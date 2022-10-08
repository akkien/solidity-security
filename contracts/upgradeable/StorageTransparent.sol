// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract StorageTransparent is Initializable, OwnableUpgradeable {
    uint256 private number;

    event Init(address self);

    uint256 public secondNumber; // new variable

    function Storage_init(uint256 _number) public initializer {
        number = _number;

        __Ownable_init();

        emit Init(address(this));
    }

    function setNumber(uint256 _number) public onlyOwner {
        number = _number;
    }

    function getNumber() public view returns (uint256) {
        return number;
    }

    // new function
    function setSecondNumber(uint256 _number) public onlyOwner {
        secondNumber = _number;
    }
}
