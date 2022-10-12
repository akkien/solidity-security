// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const Logic = await ethers.getContractFactory("SelfdestructCallee");
  const Proxy = await ethers.getContractFactory("SelfdestructCaller");

  // Deploy
  const logic = await Logic.deploy();
  await logic.deployed();
  console.log("logic depoyed at:", logic.address);

  const proxy = await Proxy.deploy();
  await proxy.deployed();
  console.log("proxy depoyed at:", proxy.address);

  // Logic set
  const logicSetTx = await logic.setNumber(5);
  await logicSetTx.wait();

  const logicNumber = await logic.number();
  console.log("logicNumber", logicNumber);

  // Proxy set
  const proxySetTx = await proxy.delegateSetNumber(logic.address, 10);
  await proxySetTx.wait();

  const logicNumber2 = await logic.number();
  const proxyNumber = await proxy.number();

  console.log("proxyNumber", proxyNumber);

  console.log(
    "logicNumber - after proxy call delegate setNumber",
    logicNumber2
  );

  // Proxy destruct
  const proxyDestructTx = await proxy.delegateDelete(logic.address);
  const deleteReceipt = await proxyDestructTx.wait();
  console.log("deleteReceipt", deleteReceipt);

  const proxyCode = await ethers.provider.getCode(proxy.address);
  console.log("proxyCode", proxyCode);

  const logicCode = await ethers.provider.getCode(logic.address);
  console.log("logicCode", logicCode);

  // Proxy set after destruct
  const proxySetTx2 = await proxy.delegateSetNumber(logic.address, 20);
  const receipt = await proxySetTx2.wait();
  console.log("receipt", receipt);

  const proxyNumber2 = await proxy.number();
  console.log("proxyNumber - after deleted and still set", proxyNumber2);
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
