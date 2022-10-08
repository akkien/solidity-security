// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const Storage = await ethers.getContractFactory("Storage");
  const Proxy = await ethers.getContractFactory("StorageProxy");

  const storage = await Storage.deploy(5);
  await storage.deployed();

  const proxy = await Proxy.deploy(storage.address);
  await proxy.deployed();

  const setNumberTxData = storage.interface.encodeFunctionData("setNumber", [
    3,
  ]);

  const fundTx = await deployer.sendTransaction({
    from: deployer.address,
    to: proxy.address,
    value: ethers.BigNumber.from("1"),
  });
  await fundTx.wait();

  const tx = await deployer.sendTransaction({
    from: deployer.address,
    to: proxy.address,
    data: setNumberTxData,
    value: ethers.BigNumber.from("1"),
  });
  const receipt = await tx.wait();

  const number = await proxy.number();
  console.log("number", number);

  console.log("receipt", receipt.logs);

  const proxyBalance = await ethers.provider.getBalance(proxy.address);
  console.log("proxyBalance", proxyBalance);

  const storageBalance = await ethers.provider.getBalance(storage.address);
  console.log("storageBalance", storageBalance);
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
