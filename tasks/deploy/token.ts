import { task } from "hardhat/config";
import { recordAllDeployments, IBridgeConfig, IDeployment } from "../utils";
import fs from "fs";
import { TaskArguments } from "hardhat/types";
import { BRIDGE_CONFIG } from "../constants";
import deployment from "../../deployment/deployments.json";
const deployments: IDeployment = deployment;

task("deploy:Token")
  .addParam("name", "Name of the Token")
  .addParam("symbol", "Symbol of the Token")
  .addParam("decimal", "Decimal of the Token")
  .setAction(async function (_taskArguments: TaskArguments, hre) {
  const deployContract = "RouterERC20Upgradable";
  // const network = await hre.getChainId();s
  // const conf: IBridgeConfig = BRIDGE_CONFIG;

  console.log("Contract Deployment Started ");
  const C1 = await hre.ethers.getContractFactory(deployContract);
  const c1Proxy = await hre.upgrades.deployProxy(
    C1,
    [_taskArguments.name, _taskArguments.symbol, _taskArguments.decimal]
  );
  
  console.log(c1Proxy)
  console.log(deployContract + " Proxy Contract deployed to: ", c1Proxy.address);
  await c1Proxy.deployed();
  const implementationAddr = await hre.upgrades.erc1967.getImplementationAddress(c1Proxy.address);
  console.log(deployContract + " Implementation Contract deployed to: ", implementationAddr);
  console.log("Contract Deployment Ended ");

  // console.log("Deployment Storage Started ");
  // const writeData = await recordAllDeployments(network, deployContract, c1Proxy.address, implementationAddr);
  // fs.writeFileSync("./deployment/deployments.json", JSON.stringify(writeData));
  // console.log("Deployment Storage Ended ");
});
