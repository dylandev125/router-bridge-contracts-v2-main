import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
// TODO:
// add tx.wait(2) or smthing better

task("Deploy:All").setAction(async function (_taskArguments: TaskArguments, hre) {
  console.log("deploying voter Started ");
  await hre.run("deploy:voter");
  console.log("deploying voter Finished ");
  console.log("deploying Bridge started ");
  await hre.run("deploy:Bridge");
  console.log("deploying Bridge Finished  ");
  console.log("configuring Bridge Started  ");
  await hre.run("Configure:Bridge");
  console.log("configuring Bridge Finished  ");
  console.log("configuring Voter Staretd  ");
  await hre.run("Configure:Voter");
  console.log("configuring Voter Finished  ");
  console.log("deploying handler Started  ");
  await hre.run("Deploy:Handler");
  console.log("deploying handler Finished  ");
  console.log("deploying  handler reserve started  ");
  await hre.run("Deploy:HandlerReserve");
  console.log("cdeploying  handler reserve Finished  ");
  console.log("deploying  fee manager started  ");
  await hre.run("Deploy:FeeManager");
  console.log("deploying  fee manager finished  ");
  console.log("configuring handler Staretd  ");
  await hre.run("Configure:handler");
  console.log("configuring handler finished  ");
});
