import { ethers } from "hardhat";
import Web3 from "web3";

const main = async () => {
  const web3 = new Web3("");
  const tx = await web3.eth.getTransaction(
    "0x6a52d89356bf007f64c7476d8353926f0c8c938d2b8c7569b3d35292ebc1dd31"
  );
  try {
    await web3.eth.call(
      { to: tx.to, data: tx.input, from: tx.from, value: tx.value },
      tx.blockNumber
    );
  } catch (error) {
    console.log("custom revert string:", error.data);

    const decodedData = abi.decodeErrorResult("InvalidNumber", error.data);
    console.log("decodeErrorResult", decodedData);
  }
};

main()
  .then(() => {
    console.log("Done!");
  })
  .catch((error) => {
    console.error(error);
    console.log("Fail!");
  });
