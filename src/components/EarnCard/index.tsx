import { styled, Box, Stack, Typography } from '@mui/material';
import { Button, DoubleCurrencyLogo } from 'components';
import { Field } from 'state/mint/actions';
import { Currency, CurrencyAmount, Percent } from '@bionswap/core-sdk';
import { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import LaunchIcon from '@mui/icons-material/Launch';
import { useChain, useCurrency, useSingleCallResult } from 'hooks';
import ConnectButton from 'components/ConnectButton';
import PrimaryLoadingButton from 'components/PrimaryLoadingButton';
import { useUSDValue } from 'hooks/useUSDCPrice';

type EarnCardProps = {
  currencies: { [field in Field]?: Currency };
  contract: any;
  rewardToken: string;
};

const EarnCard = ({ currencies, contract, rewardToken }: EarnCardProps) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const { chainId, account, provider, signer } = useChain();
  const viewAPR = Number(useSingleCallResult(contract, 'viewAPR')?.result?.[0] || 0);
  const liquidity = useUSDValue(CurrencyAmount.fromRawAmount(useCurrency(rewardToken) as Currency, '0'));

  const toggleShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  const actionLinks = [
    {
      title: 'Get USDT-BUSD LP',
      link: '',
    },
    {
      title: 'View contract',
      link: '',
    },
  ];

  return (
    <WrapCard>
      <HeadCard>
        <Stack flexDirection="row" gap="1.1rem" justifyContent="flex-start">
          <DoubleCurrencyLogo
            currency0={currencies[Field.CURRENCY_A]}
            currency1={currencies[Field.CURRENCY_B]}
            size={48}
          />
          <Stack gap="0.5rem" alignItems="flex-start">
            <Typography variant="body16ExtraBold" color="gray.100">
              USDT-BUSD
            </Typography>
            <Typography variant="body12MulishSemiBold" color="gray.400">
              Stake LP earn USDT
            </Typography>
          </Stack>
        </Stack>
      </HeadCard>
      <BodyCard>
        <Stack gap="2rem">
          <BodyRow>
            <Typography variant="body16MulishBold" color="gray.400">
              APR:
            </Typography>
            <Typography variant="body16MulishBold" color="primary.main">
              {viewAPR}%
            </Typography>
          </BodyRow>
          <BodyRow>
            <Typography variant="body16MulishSemiBold" color="gray.400">
              Liquidity:
            </Typography>
            <Typography variant="body16MulishBold" color="text.primary">
              {liquidity || 0}$
            </Typography>
          </BodyRow>
          <WrapEarn>
            <Stack alignItems="flex-start" gap="0.5rem">
              <Typography variant="body12MulishSemiBold" color="gray.400">
                USDT REWARDED
              </Typography>
              <Stack flexDirection="row" width="100%" justifyContent="space-between" gap="0.5rem">
                <Stack gap="0.5rem" alignItems="flex-start">
                  <Typography variant="body18MulishExtraBold" color="gray.500">
                    0.00
                  </Typography>
                  <Typography variant="body12MulishSemiBold" color="gray.400">
                    ~0$
                  </Typography>
                </Stack>
                <Claim>Claim Reward</Claim>
              </Stack>
            </Stack>
          </WrapEarn>
          <BodyRow>
            <Typography variant="body16MulishSemiBold" color="gray.400">
              LP STAKED
            </Typography>
            <Typography variant="body16MulishBold" color="text.primary">
              566,673.34$
            </Typography>
          </BodyRow>
          {!account ? (
            <ConnectButton />
          ) : (
            <StakeButton>
              <Typography variant="body16MulishBold" color="text.primary">
                Stake LP
              </Typography>
            </StakeButton>
          )}
          <ShowMore onClick={toggleShowMore}>
            <Typography variant="body14MulishBold" color="gray.500">
              {isShowMore ? 'Hide' : 'See more'}
            </Typography>
            {isShowMore ? (
              <ArrowDropUpIcon
                sx={{
                  fontSize: '2rem',
                  color: 'gray.500',
                }}
              />
            ) : (
              <ArrowDropDownIcon
                sx={{
                  fontSize: '2rem',
                  color: 'gray.500',
                }}
              />
            )}
          </ShowMore>
          {isShowMore && (
            <ActionLink>
              {actionLinks?.map((item: any) => (
                <Stack key={item.title} flexDirection="row" gap="0.6rem" sx={{ cursor: 'pointer' }}>
                  <Typography variant="body12MulishBold" color="blue.300">
                    {item.title}
                  </Typography>
                  <LaunchIcon
                    sx={{
                      color: 'blue.300',
                    }}
                  />
                </Stack>
              ))}
            </ActionLink>
          )}
        </Stack>
      </BodyCard>
    </WrapCard>
  );
};

const WrapCard = styled(Box)`
  box-shadow: 0px 12px 40px rgba(0, 0, 0, 0.05);
  border: 1px solid ${(props) => props.theme.palette.gray[700]};
  background: ${(props) => props.theme.palette.gray[900]};
  width: 100%;
  border-radius: 12px;
`;
const HeadCard = styled(Box)`
  padding: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.palette.gray[700]};
`;
const BodyCard = styled(Box)`
  padding: 2rem 2rem 2.5rem;
`;
const BodyRow = styled(Stack)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
const WrapEarn = styled(Box)`
  background: ${(props) => props.theme.palette.background.default};
  padding: 1.5rem 1rem;
  width: 100%;
  border-radius: 8px;
`;
const Claim = styled(Button)`
  max-width: 14.2rem;
  width: 100%;
  height: 36px;
`;
const ShowMore = styled(Stack)`
  width: 100%;
  gap: 0.5rem;
  flex-direction: row;
  alignitems: center;
  justifycontent: center;
  cursor: pointer;
`;
const ActionLink = styled(Stack)`
  padding-top: 1.5rem;
  border-top: 1px solid ${(props) => props.theme.palette.gray[700]};
  width: 100%;
  gap: 1.1rem;
  align-items: flex-start;
`;
const StakeButton = styled(PrimaryLoadingButton)`
  height: 4.6rem;
`;

export default EarnCard;
