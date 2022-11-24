import { Token } from '@bionswap/core-sdk';
import { BASES_TO_TRACK_LIQUIDITY_FOR, PINNED_PAIRS } from 'configs/routing';
import { useMemo } from 'react';
import { useAllTokens } from './useAllTokens';
import { useChain } from './useChain';

/**
 * Returns all the pairs of tokens that are tracked by the user for the current chain ID.
 */
export function useTrackedTokenPairs(): [Token, Token][] {
  const { chainId } = useChain();
  const tokens = useAllTokens();

  // pinned pairs
  const pinnedPairs = useMemo(() => (chainId ? PINNED_PAIRS[chainId] ?? [] : []), [chainId]);
  // pairs for every token against every base
  const generatedPairs: [Token, Token][] = useMemo(
    () =>
      chainId
        ? Object.keys(tokens).flatMap((tokenAddress) => {
            const token = tokens[tokenAddress];
            // for each token on the current chain,
            return (
              // loop though all bases on the current chain
              (BASES_TO_TRACK_LIQUIDITY_FOR[chainId] ?? [])
                // to construct pairs of the given token with each base
                .map((base) => {
                  if (base.address === token.address) {
                    return null;
                  } else {
                    return [base, token];
                  }
                })
                .filter((p): p is [Token, Token] => p !== null)
            );
          })
        : [],
    [tokens, chainId],
  );

  // pairs saved by users
  //   const savedSerializedPairs = useAppSelector(({ user: { pairs } }) => pairs);

  //   const userPairs: [Token, Token][] = useMemo(() => {
  //     if (!chainId || !savedSerializedPairs) return [];
  //     const forChain = savedSerializedPairs[chainId];
  //     if (!forChain) return [];

  //     return Object.keys(forChain).map((pairId) => {
  //       return [deserializeToken(forChain[pairId].token0), deserializeToken(forChain[pairId].token1)];
  //     });
  //   }, [savedSerializedPairs, chainId]);

  const combinedList = useMemo(() => generatedPairs.concat(pinnedPairs), [generatedPairs, pinnedPairs]);

  return useMemo(() => {
    // dedupes pairs of tokens in the combined list
    const keyed = combinedList.reduce<{ [key: string]: [Token, Token] }>((memo, [tokenA, tokenB]) => {
      const sorted = tokenA.sortsBefore(tokenB);
      const key = sorted ? `${tokenA.address}:${tokenB.address}` : `${tokenB.address}:${tokenA.address}`;
      if (memo[key]) return memo;
      memo[key] = sorted ? [tokenA, tokenB] : [tokenB, tokenA];
      return memo;
    }, {});

    return Object.keys(keyed).map((key) => keyed[key]);
  }, [combinedList]);
}
