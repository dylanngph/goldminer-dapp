import { AddressMap, ChainId } from '@bionswap/core-sdk';

export const PROJECT_TOKEN_ADDRESS: AddressMap = {
  [ChainId.BSC]: '0xC008debBB1f33d9453FFd2104fEB1fe7E9663524',
  [ChainId.BSC_TESTNET]: '0x5623C00df1dedcA5978c7e09F7902eB3c98e610e',
};

export const FARM_ADDRESS: AddressMap = {
  [ChainId.BSC]: '',
  [ChainId.BSC_TESTNET]: '0x6146E806A96108feCa672A9281b486C91dA1F0D8',
}

export const LIQUIDITY_ADDRESS: AddressMap = {
  [ChainId.BSC]: '',
  [ChainId.BSC_TESTNET]: '0x6146E806A96108feCa672A9281b486C91dA1F0D8',
}
