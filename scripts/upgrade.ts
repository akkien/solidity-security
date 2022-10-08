// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from "hardhat";

async function main() {
  const Storage = await ethers.getContractFactory("StorageUUPS");

  const storage = await upgrades.upgradeProxy(
    "0x5477f95E9b57297b136589ea5c79F9D56EDfbDf8",
    Storage
  );

  console.log("Upgraded:", storage.address);
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
