/* eslint-disable node/no-missing-import */
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Storage } from "../typechain";

describe("Storage", function () {
  let deployer: SignerWithAddress;

  let storage: Storage;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();

    // ERC20
    const Storage = await ethers.getContractFactory("Storage");
    storage = await Storage.deploy();
    await storage.deployed();
  });

  it("Should init successfully", async () => {
    const tx = await storage.setNumber(1, 2);
    await tx.wait();

    const tx2 = await storage.setNumber2(1, 2);
    await tx2.wait();
  });
  it("Should init successfully2", async () => {
    const tx2 = await storage.setNumber2(1, 2);
    await tx2.wait();
  });

  it("Should init successfully3", async () => {
    const tx = await storage.setNumber(1, 3);
    await tx.wait();
    const tx2 = await storage.setNumber2(1, 3);
    await tx2.wait();
  });
});
