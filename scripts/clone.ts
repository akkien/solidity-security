// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const StorageToClone = await ethers.getContractFactory("StorageToClone");
  const CloneFactory = await ethers.getContractFactory("CloneFactory");

  const storage = await StorageToClone.deploy();
  await storage.deployed();

  const cloneFactory = await CloneFactory.deploy();
  await cloneFactory.deployed();

  const cloneTx = await cloneFactory.createCloneStorage(storage.address);
  await cloneTx.wait();

  console.log("cloneTx", cloneTx);

  console.log("Storage deployed to:", storage.address);
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
