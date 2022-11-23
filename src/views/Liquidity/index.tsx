import { Currency, currencyEquals, WNATIVE } from '@bionswap/core-sdk';
import { BigNumber } from '@ethersproject/bignumber';
import { TransactionResponse } from '@ethersproject/providers';
import { Stack, Typography } from '@mui/material';
import { Button, ConnectButton, CurrencyInputPanel } from 'components';
import { PROJECT_TOKEN_ADDRESS } from 'constants/addresses';
import { ONE_BIPS, ZERO_PERCENT } from 'constants/common';
import { USER_REJECTED_TX } from 'constants/transactions';
import {
  useApproveCallback,
  useChain,
  useCurrency,
  useIsSwapUnsupported,
  useRouterContract,
  useTransactionDeadline,
} from 'hooks';
import { ApprovalState } from 'hooks/useApproveCallback';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { Field } from 'state/mint/actions';
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from 'state/mint/hooks';
import { useTransactionAdder } from 'state/transactions/hooks';
import { useExpertModeManager, useUserSlippageTolerance } from 'state/user/hooks';
import { getCurrencyId } from 'utils/currencies';
import { calculateGasMargin, calculateSlippageAmount } from 'utils/trade';
import TradePrice from '../Swap/components/TradePrice';
import ConfirmAddLiqModal from './components/ConfirmAddLiqModal';

export default function AddLiquidity() {
  const { account, chainId, provider } = useChain();
  const router = useRouter();
  // const tokens = router.query.tokens;
  const [currencyIdA, setCurrencyIdA] = useState(PROJECT_TOKEN_ADDRESS[chainId]);
  const [currencyIdB, setCurrencyIdB] = useState('ETH');

  const currencyA = useCurrency(currencyIdA);
  const currencyB = useCurrency(currencyIdB);

  const oneCurrencyIsWETH = Boolean(
    chainId &&
      ((currencyA && currencyEquals(currencyA, WNATIVE[chainId])) ||
        (currencyB && currencyEquals(currencyB, WNATIVE[chainId]))),
  );

  const [isExpertMode] = useExpertModeManager();

  // mint state
  const { independentField, typedValue, otherTypedValue } = useMintState();
  const {
    dependentField,
    currencies,
    pair,
    pairState,
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error,
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined);
  const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity);

  const isValid = !error;

  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false); // clicked confirm

  // txn values
  const deadline = useTransactionDeadline(); // custom from users settings

  const [allowedSlippage] = useUserSlippageTolerance();

  const [txHash, setTxHash] = useState<string>('');

  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  };

  const routerContract = useRouterContract();

  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_A], routerContract?.address);
  console.log("🚀 ~ file: index.tsx ~ line 87 ~ AddLiquidity ~ approvalA", approvalA)
  const [approvalB, approveBCallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_B], routerContract?.address);
  console.log("🚀 ~ file: index.tsx ~ line 89 ~ AddLiquidity ~ approvalB", approvalB)

  const addIsUnsupported = useIsSwapUnsupported(currencies?.CURRENCY_A, currencies?.CURRENCY_B);

  const addTransaction = useTransactionAdder();

  async function onAdd() {
    if (!chainId || !provider || !account || !routerContract) return;

    const { [Field.CURRENCY_A]: parsedAmountA, [Field.CURRENCY_B]: parsedAmountB } = parsedAmounts;

    // console.log({ parsedAmountA, parsedAmountB, currencyA, currencyB, deadline })

    if (!parsedAmountA || !parsedAmountB || !currencyA || !currencyB || !deadline) {
      return;
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(parsedAmountA, noLiquidity ? ZERO_PERCENT : allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(parsedAmountB, noLiquidity ? ZERO_PERCENT : allowedSlippage)[0],
    };

    let estimate,
      method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null;
    if (currencyA.isNative || currencyB.isNative) {
      const tokenBIsETH = currencyB.isNative;
      estimate = routerContract.estimateGas.addLiquidityETH;
      method = routerContract.addLiquidityETH;
      args = [
        (tokenBIsETH ? currencyA : currencyB)?.wrapped?.address ?? '', // token
        (tokenBIsETH ? parsedAmountA : parsedAmountB).quotient.toString(), // token desired
        amountsMin[tokenBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(), // token min
        amountsMin[tokenBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(), // eth min
        account,
        deadline.toHexString(),
      ];
      value = BigNumber.from((tokenBIsETH ? parsedAmountB : parsedAmountA).quotient.toString());
    } else {
      estimate = routerContract.estimateGas.addLiquidity;
      method = routerContract.addLiquidity;
      args = [
        currencyA?.wrapped?.address ?? '',
        currencyB?.wrapped?.address ?? '',
        parsedAmountA.quotient.toString(),
        parsedAmountB.quotient.toString(),
        amountsMin[Field.CURRENCY_A].toString(),
        amountsMin[Field.CURRENCY_B].toString(),
        account,
        deadline.toHexString(),
      ];
      value = null;
    }

    setAttemptingTxn(true);
    await estimate(...args, value ? { value } : {})
      .then((estimatedGasLimit) =>
        method(...args, {
          ...(value ? { value } : {}),
          gasLimit: calculateGasMargin(estimatedGasLimit),
        }).then((response) => {
          setAttemptingTxn(false);

          addTransaction(response, {
            summary: `Add ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${
              currencies[Field.CURRENCY_A]?.symbol
            } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)} ${currencies[Field.CURRENCY_B]?.symbol}`,
          });

          setTxHash(response.hash);

          gtag('event', 'Add', {
            event_category: 'Liquidity',
            event_label: [currencies[Field.CURRENCY_A]?.symbol, currencies[Field.CURRENCY_B]?.symbol].join('/'),
          });
        }),
      )
      .catch((error) => {
        setAttemptingTxn(false);
        // we only care if the error is something _other_ than the user rejected the tx
        if (error?.code !== USER_REJECTED_TX) {
          console.error(error);
        }
      });
  }

  const handleCurrencyASelect = useCallback(
    (currencyA: Currency) => {
      const newCurrencyIdA = getCurrencyId(currencyA);
      if (newCurrencyIdA === currencyIdB) {
        // router.push(`/add/${currencyIdB}/${currencyIdA}`);
        setCurrencyIdA(currencyIdB);
        setCurrencyIdB(newCurrencyIdA);
      } else {
        // router.push(`/add/${newCurrencyIdA}/${currencyIdB}`);
        setCurrencyIdA(newCurrencyIdA);
      }
    },
    [currencyIdB],
  );
  const handleCurrencyBSelect = useCallback(
    (currencyB: Currency) => {
      const newCurrencyIdB = getCurrencyId(currencyB);
      if (currencyIdA === newCurrencyIdB) {
        if (currencyIdB) {
          // router.push(`/add/${currencyIdB}/${newCurrencyIdB}`);
          setCurrencyIdA(newCurrencyIdB);
        } else {
          // router.push(`/add/${newCurrencyIdB}`);
          setCurrencyIdA(newCurrencyIdB);
        }
      } else {
        // router.push(`/add/${currencyIdA ? currencyIdA : 'ETH'}/${newCurrencyIdB}`);
        setCurrencyIdB(newCurrencyIdB);
      }
    },
    [currencyIdA, currencyIdB],
  );

  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false);
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onFieldAInput('');
    }
    setTxHash('');
  }, [onFieldAInput, txHash]);

  return (
    <>
      <ConfirmAddLiqModal
        attemptingTxn={attemptingTxn}
        currencies={currencies}
        open={showConfirm}
        onDismiss={handleDismissConfirmation}
        parsedAmounts={parsedAmounts}
        hash={txHash}
        onAdd={onAdd}
        allowedSlippage={allowedSlippage}
        noLiquidity={noLiquidity}
        liquidityMinted={liquidityMinted}
      />
      <Stack>
        <CurrencyInputPanel
          value={formattedAmounts[Field.CURRENCY_A]}
          onUserInput={onFieldAInput}
          onCurrencySelect={handleCurrencyASelect}
          currency={currencies[Field.CURRENCY_A]}
        />
        <CurrencyInputPanel
          value={formattedAmounts[Field.CURRENCY_B]}
          onUserInput={onFieldBInput}
          onCurrencySelect={handleCurrencyBSelect}
          currency={currencies[Field.CURRENCY_B]}
        />
        <Stack bgcolor="black">
          <Stack direction={'row'} justifyContent="space-between" gap={1}>
            <Typography>Rate</Typography>
            <TradePrice price={price} />
          </Stack>
          <Stack direction={'row'} justifyContent="space-between" gap={1}>
            <Typography>Share of pool</Typography>
            <Typography>
              {noLiquidity && price
                ? '100'
                : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
              %
            </Typography>
          </Stack>
        </Stack>

        {addIsUnsupported ? (
          <Button label={`Unsupported Asset`} />
        ) : !account ? (
          <ConnectButton />
        ) : (
          <Stack>
            {approvalA !== ApprovalState.APPROVED && approvalA !== ApprovalState.UNKNOWN && (
              <Button
                loading={approvalA === ApprovalState.PENDING}
                fullWidth
                onClick={approveACallback}
                disabled={approvalA === ApprovalState.PENDING}
                label={`Approve ${currencies[Field.CURRENCY_A]?.symbol}`}
              />
            )}
            {approvalB !== ApprovalState.APPROVED && approvalB !== ApprovalState.UNKNOWN && (
              <Button
                loading={approvalB === ApprovalState.PENDING}
                fullWidth
                onClick={approveBCallback}
                disabled={approvalB === ApprovalState.PENDING}
                label={`Approve ${currencies[Field.CURRENCY_B]?.symbol}`}
              />
            )}
            <Button
              fullWidth
              onClick={() => {
                isExpertMode ? onAdd() : setShowConfirm(true);
              }}
              disabled={!isValid || approvalA !== ApprovalState.APPROVED || approvalB !== ApprovalState.APPROVED}
              label={error ?? `Add Liquidity`}
            />
          </Stack>
        )}
      </Stack>
    </>
  );
}
