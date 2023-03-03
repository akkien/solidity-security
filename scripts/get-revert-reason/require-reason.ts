import { ethers } from "hardhat";

const main = async () => {
  const a = await ethers.provider.getTransaction(
    "0x25c86c2a567b6cd66a3c1e775f23fd9807d29a58bb718984e6a1c77f19f0c613"
  );
  try {
    const code = await ethers.provider.call(a as any, a.blockNumber);
    const reason = ethers.utils.toUtf8String("0x" + code.substr(138));
    console.log("revert reason:", reason);
  } catch (err) {
    console.log("err", err);
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
