import { BridgeConfig } from "./utils";

export enum ChainId {
  MAINNET = "1",
  ROPSTEN = "3",
  RINKEBY = "4",
  GÖRLI = "5",
  KOVAN = "42",
  POLYGON = "137",
  MUMBAI = "80001",
  OKEX = "66",
  ARBITRUM = "42161",
  FANTOM = "250",
  XDAI = "100",
  BSC = "56",
  HARMONY = "1666600000",
  AVALANCHE = "43114",
}

export const contracts: any = {
  BRIDGE: "BridgeUpgradeable",
  VOTER: "VoterUpgradeable",
  ERC20HANDLER: "ERC20HandlerUpgradeable",
  FEEMANGER: "FeeManagerUpgradeable",
  DFYN: "RouterERC20Upgradable",
  ROUTE: "RouterERC20Upgradable",
  HANDLERRESERVE: "HandlerReserveUpgradeable",
};

export const TASK_ACCOUNTS: string = "accounts";
export const TASK_GRANT_ROLE: string = "grant-role";
export const TASK_REVOKE_ROLE: string = "revoke-role";
export const TASK_ADD_RELAYER: string = "add-relayer";
export const TASK_REMOVE_RELAYER: string = "remove-relayer";
export const TASK_SET_RESOURCE: string = "set-resource";
export const TASK_SET_BURNABLE: string = "set-burnable";
export const TASK_SET_FEE: string = "set-fee";
export const TASK_SET_FEE_STATUS: string = "set-fee-status";
export const TASK_VERIFY_PROXY: string = "verify-proxy";
export const TASK_VERIFY_ALL: string = "verify-all";
export const TASK_SET_ONESPLIT: string = "set-onesplit";
export const TASK_BRIDGE_PAUSE: string = "pause";
export const TASK_SET_LP: string = "set-lp";
export const TASK_SET_DECIMAL: string = "set-decimal";
export const TASK_SET_LP_OWNER: string = "set-lp-owner";
export const TASK_CHANGE_QUORUM: string = "change-quorum";
export const TASK_RESERVE_BALANCE: string = "reserve-balance";
export const TASK_CREATE_RESOURCE_ID: string = "create-resource-id";

export const FACTORY_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac",
  [ChainId.ROPSTEN]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
  [ChainId.RINKEBY]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
  [ChainId.GÖRLI]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
  [ChainId.KOVAN]: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
  [ChainId.MUMBAI]: "0xE7Fb3e833eFE5F9c441105EB65Ef8b261266423B",
  [ChainId.POLYGON]: "0xE7Fb3e833eFE5F9c441105EB65Ef8b261266423B",
  [ChainId.OKEX]: "0xE7Fb3e833eFE5F9c441105EB65Ef8b261266423B",
  [ChainId.ARBITRUM]: "0xa102072a4c07f06ec3b4900fdc4c7b80b6c57429",
  [ChainId.XDAI]: "0x4c28f48448720e9000907BC2611F73022fdcE1fA",
  [ChainId.FANTOM]: "0xd9820a17053d6314B20642E465a84Bf01a3D64f5",
  [ChainId.HARMONY]: "0xd9820a17053d6314B20642E465a84Bf01a3D64f5",
  [ChainId.BSC]: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73", // pancake
  [ChainId.AVALANCHE]: "0xd9820a17053d6314B20642E465a84Bf01a3D64f5",
};

export const ROUTER_ADDRESS: { [chainId in ChainId | string]: string } = {
  [ChainId.MAINNET]: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
  [ChainId.RINKEBY]: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
  [ChainId.ROPSTEN]: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
  [ChainId.GÖRLI]: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
  [ChainId.KOVAN]: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
  [ChainId.MUMBAI]: "0xA102072A4C07F06EC3B4900FDC4C7B80b6c57429",
  [ChainId.POLYGON]: "0xA102072A4C07F06EC3B4900FDC4C7B80b6c57429",
  [ChainId.OKEX]: "0x34686CBF7229ed0bff2Fbe7ED2CFC916317764f6",
  [ChainId.ARBITRUM]: "0xaedE1EFe768bD8A1663A7608c63290C60B85e71c",
  [ChainId.XDAI]: "0xE7Fb3e833eFE5F9c441105EB65Ef8b261266423B",
  [ChainId.FANTOM]: "0x2724B9497b2cF3325C6BE3ea430b3cec34B5Ef2d",
  [ChainId.HARMONY]: "0x8973792d9E8EA794E546b62c0f2295e32a6d7E48",
  [ChainId.BSC]: "0x10ED43C718714eb63d5aA57B78B54704E256024E", // pancake bsc
  [ChainId.AVALANCHE]: "0x4c28f48448720e9000907BC2611F73022fdcE1fA",
};

export const BRIDGE_CONFIG: { [chainId in ChainId]: BridgeConfig | any } = {
  [ChainId.POLYGON]: {
    chainID: "1",
    initialRelayers: [],
    quorum: "6000",
    expiry: "1000",
  },
  [ChainId.BSC]: {
    chainID: "2",
    initialRelayers: [],
    quorum: "6000",
    expiry: "1000",
  },
  [ChainId.ROPSTEN]: {
    chainID: "3",
    initialRelayers: ["0x33bCDe3dA095C1D2681F3167E5696bf5b7d4F321"],
    quorum: "6000",
    expiry: "1000",
  },
  [ChainId.KOVAN]: {
    chainID: "1",
    initialRelayers: ["0x33bCDe3dA095C1D2681F3167E5696bf5b7d4F321"],
    quorum: "6000",
    expiry: "1000",
  },
  [ChainId.MUMBAI]: {
    chainID: "2",
    initialRelayers: ["0x33bCDe3dA095C1D2681F3167E5696bf5b7d4F321"],
    quorum: "6000",
    expiry: "1000",
  },
  "1": undefined,
  "4": undefined,
  "5": undefined,
  "66": undefined,
  "42161": undefined,
  "250": undefined,
  "100": undefined,
  "1666600000": undefined,
  "43114": undefined,
};

export const ETH: { [chainId in ChainId | any]: string } = {
  [ChainId.MAINNET]: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  [ChainId.RINKEBY]: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  [ChainId.ROPSTEN]: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  [ChainId.GÖRLI]: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  [ChainId.KOVAN]: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  [ChainId.MUMBAI]: "0x0000000000000000000000000000000000001010",
  [ChainId.POLYGON]: "0x0000000000000000000000000000000000001010",
  [ChainId.OKEX]: "0x0000000000000000000000000000000000001010",
  [ChainId.ARBITRUM]: "0x0000000000000000000000000000000000001010",
  [ChainId.XDAI]: "0x0000000000000000000000000000000000001010",
  [ChainId.FANTOM]: "0x0000000000000000000000000000000000001010",
  [ChainId.HARMONY]: "0x0000000000000000000000000000000000001010",
  [ChainId.BSC]: "0x0000000000000000000000000000000000001010",
  [ChainId.AVALANCHE]: "0x0000000000000000000000000000000000001010",
};

export const WETH: { [chainId in ChainId | any]: string | undefined } = {
  [ChainId.MAINNET]: "0xd0A1E359811322d97991E03f863a0C30C2cF029C",
  [ChainId.RINKEBY]: "0xd0A1E359811322d97991E03f863a0C30C2cF029C",
  [ChainId.ROPSTEN]: "0xd0A1E359811322d97991E03f863a0C30C2cF029C",
  [ChainId.GÖRLI]: "0xd0A1E359811322d97991E03f863a0C30C2cF029C",
  [ChainId.KOVAN]: "0xd0A1E359811322d97991E03f863a0C30C2cF029C",
  [ChainId.MUMBAI]: "0x6373c962DCFfc21465973150993E19F56d8640a4",
  [ChainId.POLYGON]: "0x4c28f48448720e9000907BC2611F73022fdcE1fA",
  [ChainId.OKEX]: "0x6373c962DCFfc21465973150993E19F56d8640a4",
  [ChainId.ARBITRUM]: "0x6373c962DCFfc21465973150993E19F56d8640a4",
  [ChainId.XDAI]: "0x6373c962DCFfc21465973150993E19F56d8640a4",
  [ChainId.FANTOM]: "0x6373c962DCFfc21465973150993E19F56d8640a4",
  [ChainId.HARMONY]: "0x6373c962DCFfc21465973150993E19F56d8640a4",
  [ChainId.BSC]: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", // WBNB
  [ChainId.AVALANCHE]: "0x6373c962DCFfc21465973150993E19F56d8640a4",
};

export const ONESPLIT: { [chainId in ChainId | any]: string | undefined } = {
  [ChainId.MAINNET]: "0x50D30bB7C64FB5d8dBca332541133c86EB0232A8",
  [ChainId.RINKEBY]: "0x50D30bB7C64FB5d8dBca332541133c86EB0232A8",
  [ChainId.ROPSTEN]: "0x237F87Fd5cFA8E01396C5ea696c65FF36a731AE2",
  [ChainId.GÖRLI]: "0xd0A1E359811322d97991E03f863a0C30C2cF029C",
  [ChainId.KOVAN]: "0x97BDF7358164C3294466147ccFC00f521c11c164",
  [ChainId.MUMBAI]: "0x154Efcbc23EbB7566bd74fE77C5F32a3a6eD67bA",
  [ChainId.POLYGON]: "0xa9769da9482D35Bb62A96625FcC3ee0e4bA5cE20",
  [ChainId.OKEX]: "0x237F87Fd5cFA8E01396C5ea696c65FF36a731AE2",
  [ChainId.ARBITRUM]: "0x237F87Fd5cFA8E01396C5ea696c65FF36a731AE2",
  [ChainId.XDAI]: "0x237F87Fd5cFA8E01396C5ea696c65FF36a731AE2",
  [ChainId.FANTOM]: "0x237F87Fd5cFA8E01396C5ea696c65FF36a731AE2",
  [ChainId.HARMONY]: "0x237F87Fd5cFA8E01396C5ea696c65FF36a731AE2",
  [ChainId.BSC]: "0x5febcA23e97c8ead354318e5A3Ed34ec3704459a",
  [ChainId.AVALANCHE]: "0x237F87Fd5cFA8E01396C5ea696c65FF36a731AE2",
};
