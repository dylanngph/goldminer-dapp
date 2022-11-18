import { ChainId, Token } from '@bionswap/core-sdk';
import { PROJECT_TOKEN_ADDRESS } from 'constants/addresses';
import { PROJECT_TOKEN } from 'constants/tokens';
import { WrappedTokenInfo } from 'entities/WrappedTokenInfo';
import * as BSC from './tokens/bsc';
import * as BSC_TESTNET from './tokens/bsc-testnet';

export const DEFAULT_TOKEN_LIST: {
  [chainId: number]: {
    [tokenAddress: string]: WrappedTokenInfo;
  };
} = {
  [ChainId.BSC]: {
    [PROJECT_TOKEN_ADDRESS[ChainId.BSC]]: new WrappedTokenInfo({
      chainId: ChainId.BSC,
      address: PROJECT_TOKEN_ADDRESS[ChainId.BSC],
      name: PROJECT_TOKEN[ChainId.BSC].name!,
      symbol: PROJECT_TOKEN[ChainId.BSC].symbol!,
      decimals: PROJECT_TOKEN[ChainId.BSC].decimals,
      logoURI: '/logo.png',
    }),
    [BSC.BUSD.address]: new WrappedTokenInfo({
      chainId: ChainId.BSC,
      address: BSC.BUSD.address,
      name: BSC.BUSD.name!,
      symbol: BSC.BUSD.symbol!,
      decimals: BSC.BUSD.decimals,
      logoURI: '/busd.png',
    }),
    [BSC.USDC.address]: new WrappedTokenInfo({
      chainId: ChainId.BSC,
      address: BSC.USDC.address,
      name: BSC.USDC.name!,
      symbol: BSC.USDC.symbol!,
      decimals: BSC.USDC.decimals,
      logoURI: '/usdc.png',
    }),
    [BSC.USDT.address]: new WrappedTokenInfo({
      chainId: ChainId.BSC,
      address: BSC.USDT.address,
      name: BSC.USDT.name!,
      symbol: BSC.USDT.symbol!,
      decimals: BSC.USDT.decimals,
      logoURI: '/usdt.png',
    }),
  },

  [ChainId.BSC_TESTNET]: {
    [PROJECT_TOKEN_ADDRESS[ChainId.BSC_TESTNET]]: new WrappedTokenInfo({
      chainId: ChainId.BSC_TESTNET,
      address: PROJECT_TOKEN_ADDRESS[ChainId.BSC_TESTNET],
      name: PROJECT_TOKEN[ChainId.BSC_TESTNET].name!,
      symbol: PROJECT_TOKEN[ChainId.BSC_TESTNET].symbol!,
      decimals: PROJECT_TOKEN[ChainId.BSC_TESTNET].decimals,
      logoURI: '/logo.png',
    }),
    [BSC_TESTNET.BUSD.address]: new WrappedTokenInfo({
      chainId: ChainId.BSC_TESTNET,
      address: BSC_TESTNET.BUSD.address,
      name: BSC_TESTNET.BUSD.name!,
      symbol: BSC_TESTNET.BUSD.symbol!,
      decimals: BSC_TESTNET.BUSD.decimals,
      logoURI: '/busd.png',
    }),
    [BSC_TESTNET.USDC.address]: new WrappedTokenInfo({
      chainId: ChainId.BSC_TESTNET,
      address: BSC_TESTNET.USDC.address,
      name: BSC_TESTNET.USDC.name!,
      symbol: BSC_TESTNET.USDC.symbol!,
      decimals: BSC_TESTNET.USDC.decimals,
      logoURI: '/usdc.png',
    }),
    [BSC_TESTNET.USDT.address]: new WrappedTokenInfo({
      chainId: ChainId.BSC_TESTNET,
      address: BSC_TESTNET.USDT.address,
      name: BSC_TESTNET.USDT.name!,
      symbol: BSC_TESTNET.USDT.symbol!,
      decimals: BSC_TESTNET.USDT.decimals,
      logoURI: '/usdt.png',
    }),
  },
};
