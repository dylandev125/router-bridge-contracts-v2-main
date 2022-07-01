import { task } from "hardhat/config";
import { IDeployment } from "./utils";
import { TaskArguments } from "hardhat/types";
import { Multicall, ContractCallContext } from "ethereum-multicall";
import fs from "fs"
import { contracts } from "./constants";
import deployment from "../deployment/deployments.json";
import { abi } from "../artifacts/contracts/handlers/ERC20HandlerUpgradeable.sol/ERC20HandlerUpgradeable.json";
import { assert } from "console";
const Web3 = require("web3");
const _ = require('lodash');
const deployments: IDeployment = deployment;
const chainIDToChains: any = {
    1: "POLYGON",
    137: "POLYGON",
    2: "BSC",
    56: "BSC"
}
task(
    "deposit-executes",
    "Task is used to grant role to BRIDGE, VOTER, ERC20HANDLER, FEEMANAGER, HANDLERRESERVE"
)
    .addParam("chain", "Transfer Fee (in wei)")
    .addParam("start", "Transfer Fee (in wei)")
    .addParam("count", "Transfer Fee (in wei)")
    .setAction(async function (taskArguments: TaskArguments, hre) {
        const network = await hre.getChainId();
        console.log(`Fetching reports for ${network}`)
        const multicall = new Multicall({ web3Instance: new Web3(hre.network.provider), tryAggregate: false });
        const contractCallContext: ContractCallContext[] = await getDepositArgs(
            {
                reference: "testContract",
                contractAddress: deployments[network][contracts["ERC20HANDLER"]].proxy,
                abi,
                calls: [
                    { reference: "getDepositRecord", methodName: "getDepositRecord", methodParameters: [1, 1] },
                    { reference: "executeRecord", methodName: "executeRecord", methodParameters: [1, 1] }
                ],
            },
            parseInt(taskArguments.count),
            parseInt(taskArguments.chain),
            parseInt(taskArguments.start)
        )

        let results: any = await multicall.call(contractCallContext);
        results = Object.entries(results.results).map((i: any) => {
            let depositNonce: any = i[1].originalContractCallContext.calls[0].methodParameters[0]
            let address: any = i[1].callsReturnContext[0].returnValues[9]
            let block: any = parseInt(i[1].callsReturnContext[1].returnValues[0].hex)
            return [depositNonce, address, block]
        })
        let json: any = {}
        json.data = results
        fs.writeFileSync(`./debug/depositExecutes${chainIDToChains[network]}to${chainIDToChains[taskArguments.chain]}.json`, JSON.stringify(json, null, 1));
    });

const getDepositArgs = async (obj: ContractCallContext, count: any, chainId: any, start: any = 0) => {
    let args: ContractCallContext[] = []
    for (let i = start; i <= start + count; i++) {
        let ob = _.cloneDeep(obj)
        let calls = [...ob.calls]
        ob.reference = `${i}`
        calls[0].methodParameters = [i, chainId]
        calls[1].methodParameters = [chainId, i]
        obj.calls = calls
        args.push(ob)
    }
    return args
}

task(
    "merge-reports",
    "Task is used to grant role to BRIDGE, VOTER, ERC20HANDLER, FEEMANAGER, HANDLERRESERVE",
)
    .addParam("chain1", "Transfer Fee (in wei)")
    .addParam("chain2", "Transfer Fee (in wei)")
    .setAction(async function (taskArguments: TaskArguments, hre) {
        console.log(`Merging Reports`)
        const bscReport = require(`../debug/depositExecutes${chainIDToChains[taskArguments.chain1]}to${chainIDToChains[taskArguments.chain2]}.json`)
        const polygonReport = require(`../debug/depositExecutes${chainIDToChains[taskArguments.chain2]}to${chainIDToChains[taskArguments.chain1]}.json`)
        assert(bscReport.data.length === polygonReport.data.length, "Can't be merged, unequal lengths")
        assert(bscReport.data[0][0] === polygonReport.data[0][0], "Index mismatch")
        assert(bscReport.data[bscReport.data.length - 1][0] === polygonReport.data[polygonReport.data.length - 1][0], "Index mismatch")
        for (let i = 0; i < bscReport.data.length; i++) {
            [polygonReport.data[i][2], bscReport.data[i][2]] = [bscReport.data[i][2], polygonReport.data[i][2]]
        }
        fs.writeFileSync(`./debug/depositExecutesMerged${chainIDToChains[taskArguments.chain1]}to${chainIDToChains[taskArguments.chain2]}.json`, JSON.stringify(bscReport, null, 1));
        fs.writeFileSync(`./debug/depositExecutesMerged${chainIDToChains[taskArguments.chain2]}to${chainIDToChains[taskArguments.chain1]}.json`, JSON.stringify(polygonReport, null, 1));
    });