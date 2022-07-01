import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "hardhat-gas-reporter";
// import "hardhat-docgen";
import "solidity-coverage";
import "@openzeppelin/hardhat-upgrades";

import "./tasks/accounts";
import "./tasks/clean";

import "./tasks/deploy";
import "./tasks/deployAll";
import "./tasks/configure";
import "./tasks/grantRole";
import "./tasks/revokeRole";
import "./tasks/verify";
import "./tasks/helperTasks";
import "./tasks/upgrade/upgrade";
import { resolve } from "path";

import { config as dotenvConfig } from "dotenv";
import { NetworkUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ganache";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const chainIds = {
  ganache: 5777,
  goerli: 5,
  hardhat: 7545,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  bscTestnet: 97,
  bsc: 56,
  ropsten: 3,
  mumbai: 80001,
  avalanche: 43114,
  polygon: 137,
  fuji: 43113,
  arbitrum: 42161,
  arbitrum_rinkeby: 421611,
  fantom_testnet: 4002,
  optimism: 10,
  optimism_kovan: 69,
  fantom: 250
};

// Ensure that we have all the environment variables we need.
const mnemonic = process.env.MNEMONIC;
if (!mnemonic) {
  throw new Error("Please set your MNEMONIC in a .env file");
}

const infuraApiKey = process.env.INFURA_API_KEY;
if (!infuraApiKey) {
  throw new Error("Please set your INFURA_API_KEY in a .env file");
}

function getChainConfig(network: keyof typeof chainIds): NetworkUserConfig {
  let url = "";
  url = "https://" + network + ".infura.io/v3/" + infuraApiKey;
  if (network == "polygon") {
    url = "https://polygon-mainnet.g.alchemy.com/v2/hCz4x1BLpLDP3NoomXivfaqND37qCSgS";
  } else if (network == "mumbai") {
    url = "https://rpc-mumbai.matic.today";
  } else if (network == "bsc") {
    url = "https://bsc-dataseed.binance.org/";
  } else if (network == "avalanche") {
    url = "https://api.avax.network/ext/bc/C/rpc";
  } else if (network == "arbitrum") { //42161
    url = "https://arbitrum-mainnet.infura.io/v3/fd9c5dbc69de41048405e7072cda9bf9";
  }else if (network == "optimism") { //10
    url = "https://mainnet.optimism.io";
  } else if (network == "fantom") { //250
    url = "https://rpc.ankr.com/fantom";
  } else if (network == "mainnet") { //1
    url = "https://mainnet.infura.io/v3/0d73cc5bbe184146957a9d00764db99f";
  // console.log(url, process.env.PRIVATE_KEY)
  }
  return {
    // accounts: {
    //   count: 10,
    //   mnemonic,
    //   path: "m/44'/60'/0'/0",
    //   initialIndex:2,
    // },
    accounts: [`${process.env.PRIVATE_KEY}`],
    chainId: chainIds[network],
    url,
    // gasPrice: network == "bsc" ? 20000000000 : 300000000000,
    gasPrice: 5_000_000_000
  };
}

const config = {
  defaultNetwork: "hardhat",
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: "./contracts",
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic,
      },
      chainId: chainIds.hardhat,
      mining: {
        auto: true,
        interval: 100,
      },
    },
    ganache1: {
      chainId: 7545,
      url: "http://127.0.0.1:7545/",
      accounts: {
        mnemonic,
      },
    },
    ganache2: {
      chainId: 2,
      url: "http://127.0.0.1:8546/",
      accounts: {
        mnemonic,
      },
    },

    ropsten: {
      saveDeployments: true,
      accounts: {
        initialIndex: 0,
        mnemonic,
        // path: "m/44'/60'/0'/0",
      },
      chainId: chainIds["ropsten"],
      url: "https://ropsten.infura.io/v3/" + infuraApiKey + "",
    },
    rinkeby: {
      saveDeployments: true,
      accounts: {
        initialIndex: 0,
        mnemonic,
        // path: "m/44'/60'/0'/0",
      },
      chainId: chainIds["rinkeby"],
      url: "https://rinkeby.infura.io/v3/" + infuraApiKey + "",
    },
    bscTestnet: {
      saveDeployments: true,
      accounts: {
        initialIndex: 0,
        mnemonic,
        // path: "m/44'/60'/0'/0",
      },
      chainId: chainIds["bscTestnet"],
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
    },
    mumbai: {
      saveDeployments: true,
      accounts: {
        initialIndex: 0,
        mnemonic,
        // path: "m/44'/60'/0'/0",
      },
      chainId: chainIds["mumbai"],
      url: "https://polygon-mumbai.g.alchemy.com/v2/BZ0E4emoGVd4i2_R6I_BcEbqAecpv7Gf",
    },

    // mainnet: createTestnetConfig("mainnet"),
    // rinkeby: createTestnetConfig("rinkeby"),
    // goerli: createTestnetConfig("goerli"),
    // mumbai: createTestnetConfig("mumbai"),
    // ropsten: createTestnetConfig("ropsten"),
    
    // kovan: createTestnetConfig("kovan"),
    polygon: getChainConfig("polygon"),
    bsc: getChainConfig("bsc"),
    avalanche: getChainConfig("avalanche"),

    arbitrum: getChainConfig("arbitrum"),
    opera: getChainConfig("fantom"),
    optimism: getChainConfig("optimism"),
    mainnet: getChainConfig("mainnet"),
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
    // deploy: "./deploy",
    // deployments: "./deployments",
    // imports: "./imports",
  },
  solidity: {
    version: "0.8.2",
    settings: {
      evmVersion: "berlin",
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/solidity-template/issues/31
        bytecodeHash: "none",
      },
      // You should disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 320,
      },
    },
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  etherscan: {
    apiKey: {
      kovan: process.env.KOVAN_ETHERSCAN_KEY,
      polygonMumbai: process.env.MUMBAI_ETHERSCAN_KEY,
      polygon: process.env.POLYGON_ETHERSCAN_KEY,
      bsc: process.env.BSC_ETHERSCAN_KEY,
      avalanche: "QAE2JD7XIBCYB6Z6GSKNJIHKZ8XGVYM8AI",

      opera: process.env.FTM_KEY,
      arbitrumOne: process.env.ARBITRUM_KEY,
      optimisticEthereum: process.env.OPTIMISM_KEY,
      mainnet: process.env.ETH_ETHERSCAN_KEY,
    },
  },
};

// const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
//   // code here
// };
export default config;