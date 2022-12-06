import { ethers } from "hardhat";

const main = async () => {
  const a = await ethers.provider.getTransaction(
    "0xf20fb57b8b4dc573837ee9f0ff69114b75738c2ff4498fa19b71f91499166e5d"
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
