import { BUSD_ADDRESS, USDC_ADDRESS, USDT_ADDRESS } from '@bionswap/core-sdk';
import EarnCard from 'components/EarnCard';
import { useDerivedSwapInfo } from 'state/swap/hooks';
import { useFarm } from 'hooks/useContract';
import { PROJECT_TOKEN_ADDRESS, LIQUIDITY_ADDRESS, FARM_ADDRESS } from 'constants/addresses';
import { useChain } from 'hooks';
import { Stack, styled, Box, Container } from '@mui/material';

const configs = {
  farmAddress: '',
  token: '',
  quoteToken: '',
  stakeToken: '',
  rewardToken: '',
};

const Farm = () => {
  const farmContract = useFarm();
  const { account, chainId, provider } = useChain();

  const configs = {
    farmAddress: FARM_ADDRESS[chainId],
    token: PROJECT_TOKEN_ADDRESS[chainId],
    quoteToken: BUSD_ADDRESS[chainId],
    stakeToken: LIQUIDITY_ADDRESS[chainId],
    rewardToken: PROJECT_TOKEN_ADDRESS[chainId],
  };

  const {
    v2Trade,
    parsedAmount,
    currencies,
    inputError: swapInputError,
    allowedSlippage,
    to,
    currencyBalances,
  } = useDerivedSwapInfo();
  console.log('🚀 ~ file: index.tsx:14 ~ Farm ~ currencies', currencies);

  return (
    <Section>
      <Container>
        <Stack>
          <FarmItem>
            <EarnCard currencies={currencies} contract={farmContract} rewardToken={configs.rewardToken} />
          </FarmItem>
        </Stack>
      </Container>
    </Section>
  );
};

const Section = styled(Box)`
  min-height: calc(100vh - 8rem);
  height: auto;
`;
const FarmItem = styled(Box)`
  max-width: 350px;
  width: 100%;
`;

export default Farm;
