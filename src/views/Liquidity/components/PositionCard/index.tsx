import { CurrencyAmount, JSBI, Pair, Percent, Token } from '@bionswap/core-sdk';
import { Stack, Typography } from '@mui/material';
import { useChain, useTokenBalance, useTotalSupply } from 'hooks';
import { getCurrencyId, unwrappedToken } from 'utils/currencies';
import { Button } from 'components';
import { useRouter } from 'next/router';

interface PositionCardProps {
  pair: Pair;
  showUnwrapped?: boolean;
  stakedBalance?: CurrencyAmount<Token>; // optional balance to indicate that liquidity is deposited in mining pool
}

const MinimalPositionCard = ({ pair }: PositionCardProps) => {
  const { account } = useChain();
  const router = useRouter();
  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken);
  const totalPoolTokens = useTotalSupply(pair.liquidityToken);
  const currency0 = unwrappedToken(pair.token0);
  const currency1 = unwrappedToken(pair.token1);

  const poolTokenPercentage =
    !!userPoolBalance &&
    !!totalPoolTokens &&
    JSBI.greaterThanOrEqual(totalPoolTokens.quotient, userPoolBalance.quotient)
      ? new Percent(userPoolBalance.quotient, totalPoolTokens.quotient)
      : undefined;

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.quotient, userPoolBalance.quotient)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined];

  return (
    <Stack>
      {userPoolBalance && JSBI.greaterThan(userPoolBalance.quotient, JSBI.BigInt(0)) && (
        <Stack>
          {[token0Deposited, token1Deposited].map((tokenDeposited, i) => (
            <Stack key={i}>
              <Typography>
                {tokenDeposited?.currency.symbol} deposited: {tokenDeposited?.toSignificant(6)}
              </Typography>
            </Stack>
          ))}
          <Button
            onClick={() => {
              router.push(`/liquidity/remove?tokens=${getCurrencyId(currency0)}&tokens=${getCurrencyId(currency1)}`);
            }}
            label={`Remove`}
          />
          <Button
            onClick={() => {
              router.push(`/liquidity/add?tokens=${getCurrencyId(currency0)}&tokens=${getCurrencyId(currency1)}`);
            }}
            label={`Add`}
          />
          <Typography>Pool share: {poolTokenPercentage?.toSignificant(4)}%</Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default MinimalPositionCard;
