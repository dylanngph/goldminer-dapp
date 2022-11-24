import { NATIVE, Percent, USD, WNATIVE, WNATIVE_ADDRESS } from '@bionswap/core-sdk';
import { TransactionResponse } from '@ethersproject/providers';
import { Typography, TextField, Stack } from '@mui/material';
import { Button, ConnectButton, CurrencyLogo } from 'components';
import { PROJECT_TOKEN_ADDRESS } from 'constants/addresses';
import { BigNumber, Contract } from 'ethers';
import {
  useApproveCallback,
  useChain,
  useCurrency,
  useDebouncedChangeHandler,
  useRouterContract,
  useTransactionDeadline,
} from 'hooks';
import { ApprovalState } from 'hooks/useApproveCallback';
import { usePairContract } from 'hooks/useContract';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { Field } from 'state/burn/actions';
import { useBurnActionHandlers, useDerivedBurnInfo } from 'state/burn/hooks';
import { useTransactionAdder } from 'state/transactions/hooks';
import { useUserSlippageTolerance } from 'state/user/hooks';
import { unwrappedCurrencyAmount } from 'utils/currencies';
import { formatNumber } from 'utils/format';
import { calculateGasMargin, calculateSlippageAmount } from 'utils/trade';
import ConfirmRemoveLiqModal from '../components/ConfirmRemoveLiqModal';

const DEFAULT_REMOVE_LIQUIDITY_SLIPPAGE_TOLERANCE = new Percent(5, 100);

export default function Remove() {
  const { account, chainId, provider } = useChain();
  const router = useRouter();
  const tokens = router.query.tokens;
  const [currencyIdA, currencyIdB] = tokens || [PROJECT_TOKEN_ADDRESS[chainId], USD[chainId].address];
  const [currencyA, currencyB] = [useCurrency(currencyIdA) ?? undefined, useCurrency(currencyIdB) ?? undefined];
  const [tokenA, tokenB] = useMemo(() => [currencyA?.wrapped, currencyB?.wrapped], [currencyA, currencyB]);

  // burn state
  const { pair, parsedAmounts, error } = useDerivedBurnInfo(currencyA ?? undefined, currencyB ?? undefined);
  const { onUserInput: _onUserInput } = useBurnActionHandlers();
  const isValid = !error;

  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [attemptingTxn, setAttemptingTxn] = useState(false); // clicked confirm

  // txn values
  const [txHash, setTxHash] = useState<string>('');
  const deadline = useTransactionDeadline();
  const [allowedSlippage] = useUserSlippageTolerance();

  // pair contract
  const pairContract: Contract | null = usePairContract(pair?.liquidityToken?.address);

  // router contract
  const routerContract = useRouterContract();

  // allowance handling
  // const { gatherPermitSignature, signatureData } = useV2LiquidityTokenPermit(
  //   parsedAmounts[Field.LIQUIDITY],
  //   routerContract?.address,
  // );

  const [approval, approveCallback] = useApproveCallback(parsedAmounts[Field.LIQUIDITY], routerContract?.address);

  async function onAttemptToApprove() {
    if (!pairContract || !pair || !provider || !deadline) throw new Error('missing dependencies');
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY];
    if (!liquidityAmount) throw new Error('missing liquidity amount');

    // if (chainId !== ChainId.HARMONY && gatherPermitSignature) {
    //   try {
    //     await gatherPermitSignature();
    //   } catch (error) {
    //     // try to approve if gatherPermitSignature failed for any reason other than the user rejecting it
    //     /* @ts-ignore TYPE NEEDS FIXING */
    //     if (error?.code !== USER_REJECTED_TX) {
    //       await approveCallback();
    //     }
    //   }
    // } else {
    //   await approveCallback();
    // }
    await approveCallback();
  }

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback(
    (field: Field, typedValue: string) => {
      return _onUserInput(field, typedValue);
    },
    [_onUserInput],
  );

  // tx sending
  const addTransaction = useTransactionAdder();

  async function onRemove() {
    if (!chainId || !provider || !account || !deadline || !router) throw new Error('missing dependencies');
    const { [Field.CURRENCY_A]: currencyAmountA, [Field.CURRENCY_B]: currencyAmountB } = parsedAmounts;
    if (!currencyAmountA || !currencyAmountB) {
      throw new Error('missing currency amounts');
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(currencyAmountA, allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(currencyAmountB, allowedSlippage)[0],
    };

    if (!currencyA || !currencyB) throw new Error('missing tokens');
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY];
    if (!liquidityAmount) throw new Error('missing liquidity amount');

    const currencyBIsETH = currencyB.isNative;
    const oneCurrencyIsETH = currencyA.isNative || currencyBIsETH;

    if (!tokenA || !tokenB) throw new Error('could not wrap');

    let methodNames: string[], args: Array<string | string[] | number | boolean>;
    // we have approval, use normal remove liquidity
    if (approval === ApprovalState.APPROVED) {
      // removeLiquidityETH
      if (oneCurrencyIsETH) {
        methodNames = ['removeLiquidityETH', 'removeLiquidityETHSupportingFeeOnTransferTokens'];
        args = [
          currencyBIsETH ? tokenA.address : tokenB.address,
          liquidityAmount.quotient.toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
          account,
          deadline.toHexString(),
        ];
      }
      // removeLiquidity
      else {
        methodNames = ['removeLiquidity'];
        args = [
          tokenA.address,
          tokenB.address,
          liquidityAmount.quotient.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString(),
          account,
          deadline.toHexString(),
        ];
      }
    }
    // we have a signature, use permit versions of remove liquidity
    // else if (signatureData !== null) {
    //   // removeLiquidityETHWithPermit
    //   if (oneCurrencyIsETH) {
    //     methodNames = ['removeLiquidityETHWithPermit', 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens'];
    //     args = [
    //       currencyBIsETH ? tokenA.address : tokenB.address,
    //       liquidityAmount.quotient.toString(),
    //       amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
    //       amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
    //       account,
    //       signatureData.deadline,
    //       false,
    //       signatureData.v,
    //       signatureData.r,
    //       signatureData.s,
    //     ];
    //   }
    //   // removeLiquidityETHWithPermit
    //   else {
    //     methodNames = ['removeLiquidityWithPermit'];
    //     args = [
    //       tokenA.address,
    //       tokenB.address,
    //       liquidityAmount.quotient.toString(),
    //       amountsMin[Field.CURRENCY_A].toString(),
    //       amountsMin[Field.CURRENCY_B].toString(),
    //       account,
    //       signatureData.deadline,
    //       false,
    //       signatureData.v,
    //       signatureData.r,
    //       signatureData.s,
    //     ];
    //   }
    // }
    else {
      throw new Error('Attempting to confirm without approval or a signature. Please contact support.');
    }

    const safeGasEstimates: (BigNumber | undefined)[] = await Promise.all(
      methodNames.map((methodName) =>
        /* @ts-ignore TYPE NEEDS FIXING */
        routerContract.estimateGas[methodName](...args)
          .then(calculateGasMargin)
          .catch((error) => {
            console.error(`estimateGas failed`, methodName, args, error);
            return undefined;
          }),
      ),
    );

    const indexOfSuccessfulEstimation = safeGasEstimates.findIndex((safeGasEstimate) =>
      BigNumber.isBigNumber(safeGasEstimate),
    );

    // all estimations failed...
    if (indexOfSuccessfulEstimation === -1) {
      console.error('This transaction would fail. Please contact support.');
    } else {
      const methodName = methodNames[indexOfSuccessfulEstimation];
      const safeGasEstimate = safeGasEstimates[indexOfSuccessfulEstimation];

      setAttemptingTxn(true);
      /* @ts-ignore TYPE NEEDS FIXING */
      await routerContract[methodName](...args, {
        gasLimit: safeGasEstimate,
      })
        .then((response: TransactionResponse) => {
          setAttemptingTxn(false);

          addTransaction(response, {
            summary: `Remove ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${
              currencyA?.symbol
            } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)} ${currencyB?.symbol}`,
          });

          setTxHash(response.hash);

          gtag('event', 'Remove', {
            event_category: 'Routing',
            event_label: [currencyA?.symbol, currencyB?.symbol].join('/'),
          });
        })
        .catch((error: Error) => {
          setAttemptingTxn(false);
          // we only care if the error is something _other_ than the user rejected the tx
          console.log(error);
        });
    }
  }

  const liquidityPercentChangeCallback = useCallback(
    (value: string) => {
      onUserInput(Field.LIQUIDITY_PERCENT, value);
    },
    [onUserInput],
  );

  const oneCurrencyIsETH = currencyA?.isNative || currencyB?.isNative;
  const oneCurrencyIsWETH = Boolean(
    chainId && WNATIVE[chainId] && (currencyA?.equals(WNATIVE[chainId]) || currencyB?.equals(WNATIVE[chainId])),
  );

  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false);
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.LIQUIDITY_PERCENT, '0');
    }
    setTxHash('');
  }, [onUserInput, txHash]);

  const [innerLiquidityPercentage, setInnerLiquidityPercentage] = useDebouncedChangeHandler(
    parsedAmounts[Field.LIQUIDITY_PERCENT].toFixed(0),
    liquidityPercentChangeCallback,
  );

  const inputError = +innerLiquidityPercentage > 100 || +innerLiquidityPercentage < 0;

  const currencyAmounts = [
    currencyA?.isNative ? unwrappedCurrencyAmount(parsedAmounts[Field.CURRENCY_A]) : parsedAmounts[Field.CURRENCY_A],
    currencyB?.isNative ? unwrappedCurrencyAmount(parsedAmounts[Field.CURRENCY_B]) : parsedAmounts[Field.CURRENCY_B],
  ];

  return (
    <>
      <ConfirmRemoveLiqModal
        attemptingTxn={attemptingTxn}
        open={showConfirm}
        onDismiss={handleDismissConfirmation}
        parsedAmounts={parsedAmounts}
        hash={txHash}
        onRemove={onRemove}
        allowedSlippage={allowedSlippage}
        approval={approval}
      />
      <Stack>
        <Stack>
          <Typography>{`Remove Liquidity`}</Typography>
        </Stack>
        <Stack>
          <Typography>{`Percent to remove`}</Typography>
          <TextField
            value={innerLiquidityPercentage}
            onChange={(e) => setInnerLiquidityPercentage(e.target.value)}
            placeholder="0%"
          />
        </Stack>
        <Stack>
          <Typography>{`You'll receive`}</Typography>
          {chainId && (oneCurrencyIsWETH || oneCurrencyIsETH) && (
            <Typography>
              {oneCurrencyIsETH ? (
                <Link
                  href={`/liquidity/remove?tokens=${
                    currencyA?.isNative ? WNATIVE_ADDRESS[chainId] : currencyIdA
                  }&tokens=${currencyB?.isNative ? WNATIVE_ADDRESS[chainId] : currencyIdB}`}
                >
                  <a>Receive W{NATIVE[chainId].symbol} instead</a>
                </Link>
              ) : (
                oneCurrencyIsWETH && (
                  <Link
                    href={`/liquidity/remove?tokens=${
                      currencyA?.equals(WNATIVE[chainId]) ? 'ETH' : currencyIdA
                    }&tokens=${currencyB?.equals(WNATIVE[chainId]) ? 'ETH' : currencyIdB}`}
                  >
                    <a>Receive {NATIVE[chainId].symbol} instead</a>
                  </Link>
                )
              )}
            </Typography>
          )}
        </Stack>
        <Stack>
          {currencyAmounts.map((currencyAmount, index) => (
            <>
              <CurrencyLogo currency={currencyAmount?.currency} size={30} className="rounded-full" />
              <Typography>{currencyAmount?.currency.symbol}</Typography>

              <Typography>{formatNumber(currencyAmount?.toSignificant(6))}</Typography>
            </>
          ))}
        </Stack>
        <Stack>
          {!account ? (
            <ConnectButton />
          ) : (
            <Stack>
              <Button
                fullWidth
                loading={approval === ApprovalState.PENDING}
                onClick={onAttemptToApprove}
                disabled={approval !== ApprovalState.NOT_APPROVED}
                label={approval === ApprovalState.APPROVED ? `Approved` : `Approve`}
              />
              <Button
                fullWidth
                color={
                  !isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B] ? 'red' : 'blue'
                }
                onClick={() => {
                  setShowConfirm(true);
                }}
                disabled={!isValid}
                label={error || `Confirm Withdrawal`}
              />
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
}
