import { CurrencyAmount, JSBI, Pair, Percent, Token } from '@bionswap/core-sdk';
import { Stack, Typography, Box } from '@mui/material';
import { useChain, useTokenBalance, useTotalSupply } from 'hooks';
import { getCurrencyId, unwrappedToken } from 'utils/currencies';
import { Button } from 'components';
import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';

interface PositionCardProps {
  pair: Pair;
  showUnwrapped?: boolean;
  stakedBalance?: CurrencyAmount<Token>; // optional balance to indicate that liquidity is deposited in mining pool
}

const MinimalPositionCard = ({ pair }: PositionCardProps) => {
  console.log('🚀 ~ file: index.tsx:15 ~ MinimalPositionCard ~ pair', pair);
  const { account } = useChain();
  const router = useRouter();
  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken);
  const totalPoolTokens = useTotalSupply(pair.liquidityToken);
  const currency0 = unwrappedToken(pair.token0);
  const currencyInfo0 = pair.token0;
  const currency1 = unwrappedToken(pair.token1);
  const currencyInfo1 = pair.token1;

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

  console.log('token0Deposited==>', token0Deposited);

  return (
    <Stack width="100%">
      {userPoolBalance && JSBI.greaterThan(userPoolBalance.quotient, JSBI.BigInt(0)) && (
        <Stack width="100%" alignItems="flex-start" gap="1rem">
          {[token0Deposited, token1Deposited].map((tokenDeposited, i) => (
            <Stack key={i}>
              <Typography variant="body14MulishSemiBold" color="text.primary">
                {tokenDeposited?.currency.symbol} deposited: {tokenDeposited?.toSignificant(6)}
              </Typography>
            </Stack>
          ))}
          <Typography variant="body14MulishSemiBold" color="text.primary">
            Pool share: {poolTokenPercentage?.toSignificant(4)}%
          </Typography>
          <Button
            onClick={() => {
              router.push(`/liquidity/remove?tokens=${getCurrencyId(currency0)}&tokens=${getCurrencyId(currency1)}`);
            }}
            labelSx={{
              fontSize: '1.6rem',
              lineHeight: '2.7rem',
              fontWeight: '700',
              color: 'text.primary',
            }}
            label={`Remove`}
          />
          <Stack flexDirection='row' sx={{
                width: '100%',
                cursor: 'pointer',
                height: '4rem',
                gap:'0.5rem',
          }}
            onClick={() => {
              router.push(`/liquidity/add?tokens=${getCurrencyId(currency0)}&tokens=${getCurrencyId(currency1)}`);
            }}
          >
            <AddIcon sx={{color: 'text.primary'}} />
            <Typography variant="body16MulishBold" color="text.primary">
              Add liquidity instead
            </Typography>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default MinimalPositionCard;
