import { CurrencyAmount } from '@bionswap/core-sdk';
import { Typography, Stack, CircularProgress } from '@mui/material';
import { Button, ConnectButton } from 'components';
import { useChain, useV2PairsWithLiquidity } from 'hooks';
import Link from 'next/link';
import React from 'react';
import MinimalPositionCard from '../components/PositionCard';

const LiquidityPosition = () => {
  const { account } = useChain();
  const { loading, pairs } = useV2PairsWithLiquidity();

  return (
    <>
      <Stack>
        <Typography>Position Overview</Typography>
        <Link href="/liquidity/add" passHref={true}>
          <Button label="New Position" />
        </Link>
      </Stack>
      <Stack>
        {!account ? (
          <ConnectButton />
        ) : (
          <div className="px-2 space-y-4 rounded bg-dark-900">
            <div className="grid grid-flow-row divide-y divide-dark-800">
              {loading ? (
                <CircularProgress />
              ) : pairs?.length > 0 ? (
                pairs.map((v2Pair) => (
                  <MinimalPositionCard
                    key={v2Pair.liquidityToken.address}
                    pair={v2Pair}
                    stakedBalance={CurrencyAmount.fromRawAmount(v2Pair.liquidityToken, '0')}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center h-40">
                  <Typography>{`No positions found`}</Typography>
                </div>
              )}
            </div>
          </div>
        )}
      </Stack>
      <Typography>
        {`Liquidity providers earn a 0.25% fee on all trades proportional to their share of
                        the pool. Fees are added to the pool, accrue in real time and can be claimed by
                        withdrawing your liquidity`}
      </Typography>
    </>
  );
};

export default LiquidityPosition;
