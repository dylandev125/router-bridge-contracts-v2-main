import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { IDeployment, setFeeStatus } from "../utils";
import {
  contracts,
  TASK_BRIDGE_PAUSE,
  TASK_CHANGE_QUORUM,
  TASK_SET_BURNABLE,
  TASK_SET_FEE,
  TASK_SET_FEE_STATUS,
  TASK_SET_LP,
  TASK_SET_DECIMAL,
  TASK_SET_LP_OWNER,
  TASK_SET_ONESPLIT,
  TASK_SET_RESOURCE,
} from "../constants";
import deployment from "../../deployment/deployments.json";
const deployments: IDeployment = deployment;

task("Configure:Bridge").setAction(async function (_taskArguments: TaskArguments, _hre) {
  // const conf = BRIDGE_CONFIG[network];
  // const network = await hre.getChainId();
  // const C1 = await hre.ethers.getContractFactory("BridgeUpgradeable");
});

task(TASK_SET_FEE, "Set fee for a token on the BRIDGE")
  .addParam("resourceid", "Resource ID of the token")
  .addParam("destchainid", "Destination chain ID")
  .addParam("feetokenaddress", "Fee token address")
  .addParam("transferfee", "Transfer Fee (in wei)")
  .addParam("exchangefee", "Exchange Fee (in wei)")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const network = await hre.getChainId();
    const C1 = await hre.ethers.getContractFactory(contracts["BRIDGE"]);
    const C1Addr = C1.attach(deployments[network][contracts["BRIDGE"]].proxy);
    await setFeeStatus(taskArguments.resourceid, true, hre);
    const tx = await C1Addr.setBridgeFee(
      taskArguments.resourceid,
      taskArguments.destchainid,
      taskArguments.feetokenaddress,
      taskArguments.transferfee,
      taskArguments.exchangefee,
      true,
    );
    console.log(tx)
    await tx.wait(2);
    console.log("Fee set for token " + taskArguments.feeTokenAddress);
  });

task(TASK_SET_FEE_STATUS, "Set status for a fee token")
  .addParam("resourceId", "Resource ID of the token")
  .addParam("status", "Status (true or false)")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    await setFeeStatus(taskArguments.resourceId, taskArguments.status, hre);
    console.log("Fee status set to " + taskArguments.status + " for resourceId " + taskArguments.resourceId);
  });

task(TASK_SET_RESOURCE, "Set a token as a resource")
  .addParam("rid", "Resource ID of the handler")
  .addParam("token", "Address of the token")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const network = await hre.getChainId();
    const C1 = await hre.ethers.getContractFactory("BridgeUpgradeable");
    const C1Addr = C1.attach(deployments[network]["BridgeUpgradeable"].proxy);
    console.log(taskArguments)
    const tx = await C1Addr.adminSetResource(
      deployments[network][contracts["ERC20HANDLER"]].proxy,
      taskArguments.rid,
      taskArguments.token,
    );
    await tx.wait(2);
    console.log("Added Resource to bridge");
  });

task(TASK_SET_BURNABLE, "Set a token as a burnable")
  .addParam("handleraddress", "Address of the handler")
  .addParam("tokenaddress", "Address of the token")
  .addParam("status", "Status (true or false)")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const network = await hre.getChainId();
    const C1 = await hre.ethers.getContractFactory(contracts["BRIDGE"]);
    const C1Addr = C1.attach(deployments[network][contracts["BRIDGE"]].proxy);
    const tx = await C1Addr.adminSetBurnable(
      taskArguments.handleraddress,
      taskArguments.tokenaddress,
      taskArguments.status,
    );
    await tx.wait(2);
    console.log("Added Token as burnable");
  });

task(TASK_SET_ONESPLIT, "Set onesplit contract address")
  .addParam("handlerAddress", "Address of the handler")
  .addParam("onesplit", "Address of onesplit contract")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const network = await hre.getChainId();
    const C1 = await hre.ethers.getContractFactory(deployments[network]["BRIDGE"].proxy);
    const C1Addr = C1.attach(deployments[network][contracts["BRIDGE"]].proxy);
    const tx = await C1Addr.adminSetOneSplitAddress(taskArguments.handlerAddress, taskArguments.onesplit);
    await tx.wait(2);
    console.log("Added Oneplit contract");
  });

task(TASK_BRIDGE_PAUSE, "Pause the bridge")
  .addParam("type", "Enables or disables pausing bridge contract (enable or disable)")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const network = await hre.getChainId();
    const C1 = await hre.ethers.getContractFactory(deployments[network]["BRIDGE"].proxy);
    const C1Addr = C1.attach(deployments[network][contracts["BRIDGE"]].proxy);

    if (taskArguments.type === "enable") {
      const tx = await C1Addr.pause();
      await tx.wait(2);
      console.log("Bridge Paused");
    } else if (taskArguments.type === "disable") {
      const tx = await C1Addr.unpause();
      await tx.wait(2);
      console.log("Bridge Paused");
    }
  });

task(TASK_SET_LP, "Set LP to bridge contract")
  .addParam("name", "Name of the LP Pool")
  .addParam("symbol", "Symbol of the LP Pool")
  .addParam("decimal", "decimal of the LP Pool")
  .addParam("tokenaddress", "Address of token contract")
  .addOptionalParam("lpaddress", "Address of LP contract")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const network = await hre.getChainId();
    const C1 = await hre.ethers.getContractFactory(contracts["BRIDGE"]);
    const C1Addr = C1.attach(deployments[network][contracts["BRIDGE"]].proxy);
    console.log(taskArguments)
    const tx = await C1Addr.adminSetLiquidityPool(
      taskArguments.name,
      taskArguments.symbol,
      taskArguments.decimal,
      deployments[network][contracts["ERC20HANDLER"]].proxy,
      taskArguments.tokenaddress,
      taskArguments.lpaddress ? taskArguments.lpaddress : "0x0000000000000000000000000000000000000000",
    );
    console.log(tx)
    await tx.wait(2);
  });


task(TASK_SET_DECIMAL, "Set Decimal of token contract")
  .addParam("destid", "Symbol of the LP Pool")
  .addParam("decimal", "decimal of the LP Pool")
  .addParam("tokenaddress", "Address of token contract")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const network = await hre.getChainId();
    const C1 = await hre.ethers.getContractFactory(contracts["BRIDGE"]);
    const C1Addr = C1.attach(deployments[network][contracts["BRIDGE"]].proxy);
    console.log(taskArguments)
    
    const tx = await C1Addr.adminSetTokenDecimals(
      deployments[network][contracts["ERC20HANDLER"]].proxy,
      taskArguments.tokenaddress,
      taskArguments.destid,
      taskArguments.decimal
    );
    console.log(tx)
    await tx.wait(2);
  });

task(TASK_SET_LP_OWNER, "Set Owner of the LP contract")
  .addParam("handlerAddress", "Address of the handler")
  .addParam("ownerAddress", "Address of the New Owner")
  .addParam("tokenAddress", "Address of token contract")
  .addParam("lpAddress", "Address of LP contract")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const network = await hre.getChainId();
    const C1 = await hre.ethers.getContractFactory(deployments[network]["BRIDGE"].proxy);
    const C1Addr = C1.attach(deployments[network][contracts["BRIDGE"]].proxy);
    const tx = await C1Addr.adminSetLiquidityPoolOwner(
      taskArguments.handlerAddress,
      taskArguments.ownerAddress,
      taskArguments.tokenAddress,
      taskArguments.lpAddress,
    );
    await tx.wait(2);
    console.log("Owner of the LP contract changed to " + taskArguments.ownerAddress);
  });

task(TASK_CHANGE_QUORUM, "Change quorum of bridge contract")
  .addParam("quorum", "New quorum value")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const network = await hre.getChainId();
    const C1 = await hre.ethers.getContractFactory(deployments[network]["BRIDGE"].proxy);
    const C1Addr = C1.attach(deployments[network][contracts["BRIDGE"]].proxy);
    const tx = await C1Addr.adminChangeQuorum(taskArguments.quorum);
    await tx.wait(2);
  });
