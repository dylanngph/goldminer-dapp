import { Currency } from '@bionswap/core-sdk';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Button, Stack, styled, TextField, Typography } from '@mui/material';
import { CurrencyLogo } from 'components';
import ManageCurrencyListModal from 'components/ManageCurrencyListModal';
import { useAccount, useCurrencyBalance, useUSDCValue } from 'hooks';
import { useCallback, useState } from 'react';
import { tryParseAmount } from 'utils/parse';

type Props = {
  value: string;
  onUserInput: (value: string) => void;
  onInputBlur?: () => void;
  onCurrencySelect?: (currency: Currency) => void;
  currency?: Currency;
  otherCurrency?: Currency;
  isMax?: boolean;
};

// const percentConfigs = [
//   {
//     id: 0,
//     label: '25%',
//   }
// ]

const CurrencyInputPanel = ({
  value,
  onUserInput,
  onInputBlur,
  onCurrencySelect,
  currency,
  otherCurrency,
  isMax = false,
}: Props) => {
  const { address: account } = useAccount();
  const currencyBalance = useCurrencyBalance(account, currency);
  const usdValue = useUSDCValue(tryParseAmount(value || '1', currency));

  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onCurrencySelect?.(currency);
      setSearchModalOpen(false);
    },
    [onCurrencySelect],
  );

  const handleMaxBalance = () => {
    onUserInput(currencyBalance?.toFixed(2)?.toString() || '');
  };

  const handleCloseSearchModal = useCallback(() => {
    setSearchModalOpen(false);
  }, []);

  return (
    <WrapCurrencyInputPanel>
      <Stack>
        <Stack direction="row" justifyContent="space-between" width={'100%'} mb="7px">
          <Typography variant="body14MulishSemiBold" color="gray.400">
            {`~${usdValue?.toFixed(2) || 0}$`}
          </Typography>
          <Typography variant="body14MulishSemiBold" color="gray.400">
            Balance: {`${currencyBalance?.toFixed(4) || 0}`}
          </Typography>
        </Stack>
        <TextField
          type={'number'}
          variant="standard"
          value={value}
          placeholder="0.0"
          onChange={(e) => {
            onUserInput(e.target.value);
          }}
          onBlur={() => {
            onInputBlur?.();
          }}
          sx={{
            backgroundColor: 'transparent',
            width: '100%',

            '& .MuiInputBase-input': {
              fontWeight: '800',
              fontSize: '2.4rem',
              lineHeight: '180%',
              padding: '0',
              color: 'gray.500',
            },
            '& .MuiInputBase-input::placeholder ': {
              fontWeight: '800',
              fontSize: '2.4rem',
              lineHeight: '180%',
            },
            borderRadius: 1,
          }}
          InputProps={{
            endAdornment: (
              // <InputAdornment position="end">

              // </InputAdornment>
              <Button
                onClick={() => setSearchModalOpen(true)}
                sx={{
                  boxShadow: 'none',
                  justifyContent: 'space-between',
                  minWidth: 'auto',
                  backgroundColor: 'gray.800',
                  borderRadius: '50rem',
                  '&:hover': {
                    backgroundColor: 'gray.800',
                  },
                }}
                endIcon={
                  <ArrowDropDownIcon
                    sx={{
                      color: 'text.primary',
                    }}
                  />
                }
              >
                <Stack direction="row" gap="5px">
                  <CurrencyLogo currency={currency} size={25} />
                  <Typography
                    sx={{
                      fontWeight: '500',
                      fontSize: '16px',
                      color: '#FFF3F3',
                    }}
                  >
                    {currency?.symbol}
                  </Typography>
                </Stack>
              </Button>
            ),
            disableUnderline: true,
          }}
        />
        <Stack alignItems="flex-start" width="100%" mt="8px">
          {isMax && (
            <MaxButton onClick={handleMaxBalance}>
              <Typography variant="body14MulishSemiBold" color="primary.main">
                Max
              </Typography>
            </MaxButton>
          )}
        </Stack>
        <ManageCurrencyListModal
          open={searchModalOpen}
          onDismiss={handleCloseSearchModal}
          onCurrencySelect={handleCurrencySelect}
        />
      </Stack>
    </WrapCurrencyInputPanel>
  );
};

const WrapCurrencyInputPanel = styled(Box)`
  border-radius: 8px;
  background: ${(props) => props.theme.palette.background.default};
  padding: 15px;
  border: 1px solid;
  transition: 0.12s ease-in;
  width: 100%;
  &:hover {
    border-color: ${(props) => props.theme.palette.gray[500]};
  }
`;
const MaxButton = styled(Button)`
  text-align: center;
  background: transparent;
  border: 1px solid ${(props) => props.theme.palette.primary.main};
  border-radius: 1.2rem;
  width: 5.3rem;
  height: 2.7rem;
  padding: 0.1rem;
`;

export default CurrencyInputPanel;
