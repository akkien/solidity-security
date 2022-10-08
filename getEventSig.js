const { ethers } = require("ethers");

const sig = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("Set(uint256,uint256)")
);

console.log(sig);
