export const CHAIN_ID = 1666600000;
export const MULTICALL_ADDRESS = "0x34b415f4d3b332515e66f70595ace1dcf36254c5";

//----------------------------------MAIN NET------------------------------------------//
// export const CHAIN_ID = 1666600000;
// export const MULTICALL_ADDRESS = '0x34b415f4d3b332515e66f70595ace1dcf36254c5';
//------------------------------------------------------------------------------------//

//---------------------------------contract address-------------------------------------
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

// export const CONTRACT_TOKEN = '0x8f6cdaA89122Bd9FaE6d006d8DC88B738F1B537d'; //old
// export const CONTRACT_TOKEN = '0xBf64724d6328008Cf5485FD7Baea87Ffe2a6F16a'; //new
export const CONTRACT_TOKEN = "0xa36A484Ccd2Dff252314cc92531EF09D767BaFCC"; //new

// export const CONTRACT_NFT_PUFF = '0x701d1907fd9Ed5A1B4d6f005D602C723F9fD47fa'; //old
// export const CONTRACT_NFT_PUFF = '0x943AE671811877abf303a60d1827C8e5AFf76e83'; //new

// export const CONTRACT_MARKETPLACE = '0xc4EB0f03fb6D0eEE602943a92CA26ACf3501f944'; //old
// export const CONTRACT_MARKETPLACE = '0xfFC0Fe2Edb4C506Fe3D97Fa3d397EF71d90CEB55'; //new
export const CONTRACT_MARKETPLACE =
  "0x08D3C40eE6Cf29D863b1Bf8463d8Ce0DB6b3bd2b"; //new

export const CONTRACT_NFT_PUFF = "0xc4EB0f03fb6D0eEE602943a92CA26ACf3501f944"; //new

export const PUFF_IMAGE_URL =
  "https://puffs.mypinata.cloud/ipfs/QmcfT6TK8BpuptbGaabPes8eJM37Py7Kq4Jj2E37mGH6LU/";
export const PUFF_DATA_URL =
  "https://puffs.mypinata.cloud/ipfs/QmSNZ4yb1caWZB9bu18xeeqGLnyhaoCD3WoDkkpbhvQPhj/";
export const PUFF_RARITY_URL =
  "https://oneverse-backend.onrender.com/puff/sign/";

export const CONTRACT_NFT_HARMOLECULES =
  "0x9542a61F170478d31d37522E2082aB3d46c28775";
export const HARMOLECULES_IMAGE_URL =
  "https://harmolecules.mypinata.cloud/ipfs/QmTdSaXrVuNh2BjPhDPVqCmx2tpYuhn6rpuXJJydkAUKtY/";
export const HARMOLECULES_RARITY_URL =
  "https://oneverse-backend.onrender.com/molecule/sign/";
export const HARMOLECULES_DATA_URL = "https://harmolecules.mypinata.cloud/ipfs/QmTQfazmn4sXcte6TjVmY7NkxNqj8meqjpXxtC2xuzg6cA/"

//------------------------------Info for connect wallet-----------------------------------

export const DefaultNetwork = Number(CHAIN_ID);

export const supportedChainIds = [Number(CHAIN_ID)];

export const NETWORK_ID = CHAIN_ID.toString();
export const RPC_URLS = {
  1666600000: "https://api.harmony.one",
  1666700000: "https://api.s0.b.hmny.io",
};

export const networkInfo = [
  {
    name: "Harmony Mainnet",
    label: "Harmony Mainnet",
    chainId: 1666600000,
    nativeCurrency: { name: "ONE", symbol: "ONE", decimals: 18 },
    rpcUrl: ["https://api.harmony.one"],
    explorer: ["https://explorer.harmony.one/"],
  },
  {
    name: "Harmony Testnet",
    label: "Harmony Testnet",
    chainId: 1666700000,
    nativeCurrency: { name: "ONE", symbol: "ONE", decimals: 18 },
    rpcUrl: ["https://api.s0.b.hmny.io"],
    explorer: ["https://explorer.pops.one/"],
  },
];

export const GRAPHQL_ENDPOINT =
  "http://34.224.81.163:8000/subgraphs/name/oneverse/oneverse-subgraph";
