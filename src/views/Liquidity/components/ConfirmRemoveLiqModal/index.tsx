import { Currency, CurrencyAmount, Pair, Percent, Token } from '@bionswap/core-sdk';
import { Stack, Typography } from '@mui/material';
import { TransactionConfirmationModal, Button, DoubleCurrencyLogo, CurrencyLogo } from 'components';
import { ApprovalState } from 'hooks/useApproveCallback';
import React, { useMemo } from 'react';
import { Field } from 'state/burn/actions';

type ConfirmRemoveLiqModalProps = {
  open: boolean;
  onDismiss: () => void;
  attemptingTxn: boolean;
  hash?: string;
  onRemove: () => void;
  parsedAmounts: { [field in Field]?: CurrencyAmount<Currency> };
  approval: ApprovalState;
  allowedSlippage: Percent;
  tokenA?: Token;
  tokenB?: Token;
  pair?: Pair;
};

const ConfirmRemoveLiqModal = ({
  open,
  onDismiss,
  attemptingTxn,
  hash,
  parsedAmounts,
  onRemove,
  approval,
  allowedSlippage,
  tokenA,
  tokenB,
  pair,
}: ConfirmRemoveLiqModalProps) => {
  const currencyA = parsedAmounts[Field.CURRENCY_A]?.currency;
  const currencyB = parsedAmounts[Field.CURRENCY_B]?.currency;

  const pendingText = `Removing ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)} ${
    currencyA?.symbol
  } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)} ${currencyB?.symbol}`;

  const ConfirmationModalContent = useMemo(() => {
    return (
      <Stack>
        <CurrencyLogo currency={currencyA} size={48} />
        <Typography>{parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}</Typography>
        <CurrencyLogo currency={currencyB} size={48} />
        <Typography>{parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}</Typography>
        <Typography>
          {`Output is estimated. If the price changes by more than ${allowedSlippage.toSignificant(
            4,
          )}% your transaction will revert.`}
        </Typography>
        <Typography>{`1 ${currencyA?.symbol} = ${tokenA ? pair.priceOf(tokenA).toSignificant(6) : '-'} ${
          currencyB?.symbol
        }`}</Typography>
        <Typography>{`1 ${currencyB?.symbol} = ${tokenB ? pair.priceOf(tokenB).toSignificant(6) : '-'} ${
          currencyA?.symbol
        }`}</Typography>
        <Typography>{`${currencyA?.symbol}/${currencyB?.symbol} Burned`}</Typography>
        <Button disabled={!(approval === ApprovalState.APPROVED)} label="Confirm" onClick={onRemove} />
      </Stack>
    );
  }, [allowedSlippage, approval, currencyA, currencyB, onRemove, pair, parsedAmounts, tokenA, tokenB]);

  return (
    <TransactionConfirmationModal
      title="Remove Liquidity"
      open={open}
      onDismiss={onDismiss}
      attemptingTxn={attemptingTxn}
      hash={hash}
      content={ConfirmationModalContent}
      pendingText={pendingText}
    />
  );
};

export default ConfirmRemoveLiqModal;
