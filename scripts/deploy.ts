// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from "hardhat";

async function main() {
  const StorageFactory = await ethers.getContractFactory("StorageUUPS");

  // const deployData =
  //   StorageFactory.bytecode +
  //   StorageFactory.interface.encodeDeploy(["<deploy params>"]);

  const storage = await upgrades.deployProxy(StorageFactory, [5], {
    initializer: "Storage_init",
  });
  await storage.deployed();

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
