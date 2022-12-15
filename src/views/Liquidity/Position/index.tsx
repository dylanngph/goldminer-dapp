import { CurrencyAmount } from '@bionswap/core-sdk';
import { Typography, Stack, CircularProgress, styled, Box } from '@mui/material';
import { Button, ConnectButton } from 'components';
import { useChain, useV2PairsWithLiquidity } from 'hooks';
import Link from 'next/link';
import React from 'react';
import MinimalPositionCard from '../components/PositionCard';

const LiquidityPosition = () => {
  const { account } = useChain();
  const { loading, pairs } = useV2PairsWithLiquidity();
  console.log('🚀 ~ file: index.tsx:12 ~ LiquidityPosition ~ pairs', pairs);

  return (
    <>
      {/* <Stack>
        <Typography>Position Overview</Typography>
        <Link href="/liquidity/add" passHref={true}>
          <Button label="New Position" />
        </Link>
      </Stack> */}
      <></>
      <Stack width="100%" flex="1">
        {!account ? (
          <ConnectButton />
        ) : pairs.length === 0 ? (
          <Stack width="100%" flex="1">
            <Typography variant="body16MulishBold" color="gray.500">
              No liquidity pools found.
            </Typography>
          </Stack>
        ) : (
          <Box width="100%" className="px-2 space-y-4 rounded bg-dark-900">
            <Box width="100%" className="grid grid-flow-row divide-y divide-dark-800">
              {loading ? (
                <CircularProgress />
              ) : pairs?.length > 0 ? (
                pairs.map((v2Pair) => (
                  <LpItem key={v2Pair.liquidityToken.address}>
                    <MinimalPositionCard
                      pair={v2Pair}
                      stakedBalance={CurrencyAmount.fromRawAmount(v2Pair.liquidityToken, '0')}
                    />
                  </LpItem>
                ))
              ) : (
                <div className="flex items-center justify-center h-40">
                  <Typography>{`No positions found`}</Typography>
                </div>
              )}
            </Box>
          </Box>
        )}
      </Stack>
      {/* <Typography>
        {`Liquidity providers earn a 0.25% fee on all trades proportional to their share of
                        the pool. Fees are added to the pool, accrue in real time and can be claimed by
                        withdrawing your liquidity`}
      </Typography> */}
    </>
  );
};

const LpItem = styled(Stack)`
  border: 1px solid #4f5b67;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
`;

export default LiquidityPosition;
