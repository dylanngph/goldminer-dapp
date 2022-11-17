// a list of tokens by chain

import { Token, ChainId, WNATIVE } from '@bionswap/core-sdk';
import * as BSC from './tokens/bsc';
import * as BSC_TESTNET from './tokens/bsc-testnet';

type ChainTokenList = {
  readonly [chainId: number]: Token[];
};

const WRAPPED_NATIVE_ONLY: ChainTokenList = {
  [ChainId.BSC]: [WNATIVE[ChainId.BSC]],
  [ChainId.BSC_TESTNET]: [WNATIVE[ChainId.BSC_TESTNET]],
};

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WRAPPED_NATIVE_ONLY,
  [ChainId.BSC]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.BSC],
    BSC.DAI,
    BSC.BUSD,
    BSC.USDC,
    BSC.USDT,
    BSC.BTCB,
    BSC.WETH,
    BSC.MIM,
    BSC.FRAX,
    BSC.STG,
  ],
  [ChainId.BSC_TESTNET]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.BSC_TESTNET],
    BSC_TESTNET.BUSD,
    BSC_TESTNET.USDC,
    BSC_TESTNET.USDT,
  ],
};

export const ADDITIONAL_BASES: {
  [chainId: number]: { [tokenAddress: string]: Token[] };
} = {
  [ChainId.BSC]: {
    [BSC.FRAX.address]: [BSC.FXS],
    [BSC.FXS.address]: [BSC.FRAX],
  },
};

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: {
  [chainId: number]: { [tokenAddress: string]: Token[] };
} = {};

/**
 * Shows up in the currency select for swap and add liquidity
 */
export const COMMON_BASES: ChainTokenList = {
  [ChainId.BSC]: [
    // @ts-ignore TYPE NEEDS FIXING
    ...WRAPPED_NATIVE_ONLY[ChainId.BSC],
    // @ts-ignore TYPE NEEDS FIXING
    SUSHI[ChainId.BSC],
    // @ts-ignore TYPE NEEDS FIXING
    BSC.WETH,
    // @ts-ignore TYPE NEEDS FIXING
    BSC.BTCB,
    // @ts-ignore TYPE NEEDS FIXING
    BSC.MIM,
    // @ts-ignore TYPE NEEDS FIXING
    BSC.SPELL,
    // @ts-ignore TYPE NEEDS FIXING
    BSC.ICE,
    // @ts-ignore TYPE NEEDS FIXING
    BSC.DAI,
    // @ts-ignore TYPE NEEDS FIXING
    BSC.USDC,
    // @ts-ignore TYPE NEEDS FIXING
    BSC.USDT,
    // @ts-ignore TYPE NEEDS FIXING
    BSC.BUSD,
    // @ts-ignore TYPE NEEDS FIXING
    BSC.FRAX,
    // @ts-ignore TYPE NEEDS FIXING
    BSC.STG,
  ],
  [ChainId.BSC_TESTNET]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.BSC_TESTNET],
    BSC_TESTNET.BUSD,
    BSC_TESTNET.USDC,
    BSC_TESTNET.USDT,
  ],
};

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WRAPPED_NATIVE_ONLY,
  [ChainId.BSC]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.BSC],
    BSC.DAI,
    BSC.BUSD,
    BSC.USDC,
    BSC.USDT,
    BSC.BTCB,
    BSC.WETH,
    BSC.MIM,
    BSC.FRAX,
    BSC.STG,
  ],
  [ChainId.BSC_TESTNET]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.BSC_TESTNET],
    BSC_TESTNET.BUSD,
    BSC_TESTNET.USDC,
    BSC_TESTNET.USDT,
  ],
};

export const PINNED_PAIRS: { readonly [chainId: number]: [Token, Token][] } = {
  // [ChainId.ETHEREUM]: [
  //   // @ts-ignore TYPE NEEDS FIXING
  //   [SUSHI[ChainId.ETHEREUM], WNATIVE[ChainId.ETHEREUM]],
  //   [
  //     new Token(ChainId.ETHEREUM, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'),
  //     new Token(ChainId.ETHEREUM, '0x39AA39c021dfbaE8faC545936693aC917d5E7563', 8, 'cUSDC', 'Compound USD Coin'),
  //   ],
  //   [ETHEREUM.USDC, ETHEREUM.USDT],
  //   [ETHEREUM.DAI, ETHEREUM.USDT],
  // ],
};
