// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { Interface } from "ethers/lib/utils";
import { ethers } from "hardhat";
import Web3 from "web3";

async function main() {
  const CustomError = await ethers.getContractFactory("CustomError");
  const customError = await CustomError.deploy();
  await customError.deployed();
  console.log("customError:", customError.address);

  // Traditional Error
  const tx = await customError.setNumber1(1, {
    gasLimit: 1000000,
  });

  try {
    await tx.wait();
  } catch (error) {
    getRequireMessage(tx.hash);
  }

  // Custom Error
  const tx2 = await customError.setNumber2(1, {
    gasLimit: 1000000,
  });

  try {
    await tx2.wait();
  } catch (error) {
    getCustomError(tx2.hash, CustomError.interface, "InvalidNumber");
  }
}

const getRequireMessage = async (txHash: string) => {
  const tx = await ethers.provider.getTransaction(txHash);

  let code = "";
  try {
    code = await ethers.provider.call(
      {
        from: tx.from,
        to: tx.to,
        data: tx.data,
        value: tx.value,
      },
      tx.blockNumber
    );
  } catch (error) {
    code = (error as any).data.replace("Reverted ", "");
  } finally {
    const reason = ethers.utils.toUtf8String("0x" + code.substr(138));
    console.log("revert reason:", reason);
  }
};

const getCustomError = async (
  txHash: string,
  abi: Interface,
  errorName: string
) => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider("https://rpc.astranaut.dev/")
  );
  const tx = await web3.eth.getTransaction(txHash);

  try {
    await web3.eth.call(
      {
        to: tx.to ?? "",
        data: tx.input,
        from: tx.from,
        value: tx.value,
      },
      tx.blockNumber ?? 0
    );
  } catch (error) {
    const decodedData = abi.decodeErrorResult(errorName, (error as any).data);
    console.log("decodedData", decodedData);
  }
};

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
