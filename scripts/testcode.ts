// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const logicCode = await ethers.provider.getCode(
    "0x3150cb71e1Af4C662c78B638c284dBA0dd2508C0"
  );
  console.log("logicCode", logicCode);

  const proxyCode = await ethers.provider.getCode(
    "0xcb1BFf65F32E93F3FeF79AEB951d60995908735E"
  );
  console.log("proxyCode", proxyCode);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => {
    console.log("Done!");
  })
  .catch((error) => {
    console.error(error);
    console.log("Fail!");
  });
