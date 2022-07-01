import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

task("Deploy:ETHHandler").setAction(async function (_taskArguments: TaskArguments, hre) {
  const ETHHandler = await hre.ethers.getContractFactory("ETHHandler");
  const handler = await ETHHandler.deploy();
  await handler.deployed();
  console.log("Handler deployed to:", handler.address);
});
