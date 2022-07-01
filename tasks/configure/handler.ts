/* eslint-disable @typescript-eslint/no-unused-vars */
import { task } from "hardhat/config";
import { grantRole, IDeployment } from "../utils";
import { TaskArguments } from "hardhat/types";
import deployment from "../../deployment/deployments.json";
import { ONESPLIT } from "../constants";
const deployments: IDeployment = deployment;

task("Configure:handler").setAction(async function (_taskArguments: TaskArguments, hre) {
  const network = await hre.getChainId();

  const C1 = await hre.ethers.getContractFactory("ERC20HandlerUpgradeable");
  const C1Addr = C1.attach(deployments[network].ERC20HandlerUpgradeable.proxy);

  console.log("Contract Configuration Started ");
  const bridgeRole = await C1Addr.BRIDGE_ROLE();
  await grantRole("ERC20HandlerUpgradeable", bridgeRole, deployments[network].BridgeUpgradeable.proxy, hre);

  let tx = await C1Addr.setFeeManager(deployments[network].FeeManagerUpgradeable.proxy);
  console.log(tx)
  console.log("setFeeManager")
  await tx.wait(2);
  tx = await C1Addr.setReserve(deployments[network].HandlerReserveUpgradeable.proxy);
  console.log(tx)
  console.log("setReserve")
  await tx.wait(2);
  tx = await C1Addr.setOneSplitAddress(ONESPLIT[network]);
  console.log(tx)
  console.log("setOneSplitAddress")
  await tx.wait(2);

  console.log("Contract Configuration Ended ");
});
