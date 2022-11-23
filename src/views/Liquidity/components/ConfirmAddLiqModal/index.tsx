import { Currency, CurrencyAmount, Percent } from '@bionswap/core-sdk';
import { Stack, Typography } from '@mui/material';
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
      <Stack>
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
          <Stack>
            <Typography>{liquidityMinted?.toSignificant(6)}</Typography>
            <DoubleCurrencyLogo
              currency0={currencies[Field.CURRENCY_A]}
              currency1={currencies[Field.CURRENCY_B]}
              size={48}
            />
            <Typography>
              {currencies[Field.CURRENCY_A]?.symbol}/{currencies[Field.CURRENCY_B]?.symbol}
              &nbsp;{`Pool Tokens`}
            </Typography>
            <Typography>
              {`Output is estimated. If the price changes by more than ${allowedSlippage.toSignificant(
                4,
              )}% your transaction
            will revert.`}
            </Typography>
          </Stack>
        )}
        <Button label="Confirm Supply" onClick={onAdd} />
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

export default ConfirmAddLiqModal;
