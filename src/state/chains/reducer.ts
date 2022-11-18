import { ChainId } from '@bionswap/core-sdk';
import { createReducer } from '@reduxjs/toolkit';
import { getChainId } from 'utils/chains';
import { switchChain } from './actions';

export type ChainState = {
  chainId: number;
};

const initialState: ChainState = {
  chainId: getChainId(),
};

export default createReducer<ChainState>(initialState, (builder) =>
  builder.addCase(switchChain, (state, { payload: { chainId } }) => {
    state.chainId = chainId;
  }),
);
