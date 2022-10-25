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
  const logic = Logic.attach("0x3150cb71e1Af4C662c78B638c284dBA0dd2508C0");
  console.log("logic depoyed at:", logic.address);

  const proxy = Proxy.attach("0xcb1BFf65F32E93F3FeF79AEB951d60995908735E");
  console.log("proxy depoyed at:", proxy.address);

  // Logic set
  const logicSetTx = await logic.setNumber(5);
  await logicSetTx.wait();

  const logicNumber = await logic.number();
  console.log("logicNumber", logicNumber);

  // // Proxy set
  // const proxySetTx = await proxy.delegateSetNumber(logic.address, 10);
  // await proxySetTx.wait();

  // const logicNumber2 = await logic.number();
  // const proxyNumber = await proxy.number();

  // console.log("proxyNumber", proxyNumber);

  // console.log(
  //   "logicNumber - after proxy call delegate setNumber",
  //   logicNumber2
  // );

  // Proxy destruct
  const proxyDestructTx = await proxy.delegateDelete(logic.address);
  const deleteReceipt = await proxyDestructTx.wait();
  console.log("deleteReceipt", deleteReceipt);

  const proxyCode = await ethers.provider.getCode(proxy.address);
  console.log("proxyCode", proxyCode);

  const logicCode = await ethers.provider.getCode(logic.address);
  console.log("logicCode", logicCode);
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
