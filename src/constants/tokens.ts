import { ChainId, Token, TokenMap } from '@bionswap/core-sdk';
import { PROJECT_TOKEN_ADDRESS } from './addresses';

export const PROJECT_TOKEN: TokenMap = {
  [ChainId.BSC]: new Token(ChainId.BSC, PROJECT_TOKEN_ADDRESS[ChainId.BSC], 18, 'GOLD', 'GOLD Coin'),
  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET,
    PROJECT_TOKEN_ADDRESS[ChainId.BSC_TESTNET],
    18,
    'GOLD',
    'GOLD Coin',
  ),
};
