import { Currency, CurrencyAmount, Percent } from '@bionswap/core-sdk';
import { Box, Stack, Typography, styled } from '@mui/material';
import { TransactionConfirmationModal, Button, DoubleCurrencyLogo } from 'components';
import React, { useMemo } from 'react';
import { Field } from 'state/mint/actions';

type ConfirmAddLiqModalProps = {
  open: boolean;
  onDismiss: () => void;
  attemptingTxn: boolean;
  hash?: string;
  currencies: { [field in Field]?: Currency };
  parsedAmounts: { [field in Field]?: CurrencyAmount<Currency> };
  onAdd: () => void;
  noLiquidity?: boolean;
  allowedSlippage: Percent;
  liquidityMinted?: CurrencyAmount<Currency>;
};

const ConfirmAddLiqModal = ({
  open,
  onDismiss,
  attemptingTxn,
  hash,
  parsedAmounts,
  currencies,
  onAdd,
  noLiquidity,
  allowedSlippage,
  liquidityMinted,
}: ConfirmAddLiqModalProps) => {
  const pendingText = `Supplying ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)} ${
    currencies[Field.CURRENCY_A]?.symbol
  } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)} ${currencies[Field.CURRENCY_B]?.symbol}`;

  const ConfirmationModalContent = useMemo(() => {
    return (
      <Stack width="100%" gap="2rem">
        {noLiquidity ? (
          <Stack>
            <Typography>{currencies[Field.CURRENCY_A]?.symbol + '/' + currencies[Field.CURRENCY_B]?.symbol}</Typography>
            <DoubleCurrencyLogo
              currency0={currencies[Field.CURRENCY_A]}
              currency1={currencies[Field.CURRENCY_B]}
              size={48}
            />
          </Stack>
        ) : (
          <Stack alignItems="flex-start" gap="1rem" width="100%">
            <WrapBox>
              <Stack flexDirection="row" gap=".7rem" justifyContent="flex-start">
                <DoubleCurrencyLogo
                  currency0={currencies[Field.CURRENCY_A]}
                  currency1={currencies[Field.CURRENCY_B]}
                  size={30}
                />
                <Typography variant="body14MulishSemiBold" color="gray.400">
                  {currencies[Field.CURRENCY_A]?.symbol}/{currencies[Field.CURRENCY_B]?.symbol}
                </Typography>
                <Typography variant="body14MulishBold" color="gray.500">
                  {liquidityMinted?.toSignificant(6)}
                </Typography>
              </Stack>
            </WrapBox>

            {/* <Typography>
              {currencies[Field.CURRENCY_A]?.symbol}/{currencies[Field.CURRENCY_B]?.symbol}
              &nbsp;{`Pool Tokens`}
            </Typography>
            <Typography>
              {`Output is estimated. If the price changes by more than ${allowedSlippage.toSignificant(
                4,
              )}% your transaction
            will revert.`}
            </Typography> */}
          </Stack>
        )}
        <Button
          label="Confirm Supply"
          onClick={onAdd}
          labelSx={{
            fontSize: '1.6rem',
            lineHeight: '2.7rem',
            fontWeight: '700',
            color: 'text.primary',
          }}
        />
      </Stack>
    );
  }, [allowedSlippage, currencies, liquidityMinted, noLiquidity, onAdd]);

  return (
    <TransactionConfirmationModal
      title={noLiquidity ? 'You are creating a pool' : 'You will receive'}
      open={open}
      onDismiss={onDismiss}
      attemptingTxn={attemptingTxn}
      hash={hash}
      content={ConfirmationModalContent}
      pendingText={pendingText}
    />
  );
};

const WrapBox = styled(Box)`
  background: ${(props) => props.theme.palette.background.default};
  border-radius: 8px;
  padding: 1.7rem 1.5rem;
  width: 100%;
`;

export default ConfirmAddLiqModal;
