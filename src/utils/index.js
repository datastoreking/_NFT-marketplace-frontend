import {
  Provider as MulticallProvider,
  Contract as MulticallContract,
  setMulticallAddress,
} from 'ethers-multicall';
import { CHAIN_ID, DefaultNetwork, MULTICALL_ADDRESS, networkInfo } from '../constant';
export const STAKE_DURATION = 1 * 24 * 3600;

export const shortAddress = (address) => {
  return `${address.slice(0, 5)}...${address.slice(-3)}`;
};

export const getRegNumber = (str) => {
  return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const chainIdToHexString = (chain_id) => {
  return '0x' + chain_id.toString(16);
};

export const changeNetwork = async () => {
  const wa = window;
  const ethereum = wa.ethereum;
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdToHexString(DefaultNetwork) }],
    });
  } catch (switchError) {
    const error = JSON.parse(JSON.stringify(switchError));
    console.log(error.code);
    if (
      error.code === 4902 ||
      (error.code === -32603 && error?.data?.originalError.code === 4902)
    ) {
      try {
        const item = networkInfo.filter((x) => x.chainId === DefaultNetwork)[0];
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: chainIdToHexString(DefaultNetwork),
              chainName: item.label,
              rpcUrls: item.rpcUrl,
              nativeCurrency: item.nativeCurrency,
              blockExplorerUrls: item.explorer,
            },
          ],
        });
        console.log('done');
      } catch (addError) {
        console.log('addError', addError);
      }
    }
  }
};

export const setupMultiCallContract = async (
  nftAddress,
  nftABI,
  provider
) => {
  setMulticallAddress(CHAIN_ID, MULTICALL_ADDRESS);
  const ethcallProvider = new MulticallProvider(provider);

  await ethcallProvider.init();

  const multicallContract = new MulticallContract(nftAddress, nftABI);
  return [ethcallProvider, multicallContract];
};


export const getNftRarity = async (nftId) => {
  // if (!process.env.REACT_APP_RARITY_URL) {
  //   console.log('Not env file');
  //   return { nftRarity: -1, signature: '' };
  // }
  try {
    const url = 'https://oneverse-backend.onrender.com/puff/sign/' + nftId;
    const res = await (await fetch(url)).json();
    return {
      nftRarity: res.voucher.rarity ?? -1,
      signature: res.signature ?? '',
    };
  } catch (err) {
    console.log(err);
    return { nftRarity: -1, signature: '' };
  }
};