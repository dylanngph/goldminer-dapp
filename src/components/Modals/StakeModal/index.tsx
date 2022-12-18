import BaseModal from 'components/BaseModal';
import { Stack, Typography, styled, Box, OutlinedInput, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useChain, useNativeCurrencyBalances, useToken, useTokenBalance } from 'hooks';
import PrimaryLoadingButton from 'components/PrimaryLoadingButton';

const StakeModal = ({ open, onDismiss, data, unit, contract }: any) => {
  const { account, chainId } = useChain();
  const [input, setInput] = useState('0');
  const [isloading, setIsLoading] = useState(false);
  const ethBalance = useNativeCurrencyBalances(account ? [account] : [])?.[account ?? ''];
  const quoteToken = useToken(data?.quoteToken);
  const quoteTokenBalance = useTokenBalance(account, quoteToken || undefined);
  const quoteBalance = data?.isQuoteETH ? ethBalance : quoteTokenBalance;

  const handleMaxInput = () => {
    const maxBalance = Number(quoteBalance?.toFixed());
    setInput(maxBalance.toString());
  };

  const handleChangeInput = (event: any) => {
    setInput(event.target.value);
  };

  const handleStack = async () => {
    if (!contract || !account) return;
    if (approvalState === ApprovalState.APPROVED) {
      setIsLoading(true);
      if (data?.isQuoteETH) {
        const { error, result: tx } = await withCatch<any>(
          presaleContract.purchaseInETH({
            value: parsedPurchaseInputAmount.quotient.toString(),
          }),
        );

        if (error) {
          setIsLoading(false);
          toastError(error?.message);
          return;
        }

        await tx.wait();
        setSuccess(true);
      } else {
        const { error, result: tx } = await withCatch<any>(
          presaleContract.purchase(parsedPurchaseInputAmount.quotient.toString()),
        );

        if (error) {
          setIsLoading(false);
          toastError(error?.message);
          return;
        }

        await tx.wait();
        setSuccess(true);
        setIsLoading(false);
      }
    } else if (approvalState === ApprovalState.NOT_APPROVED) {
      setIsLoading(true);
      await approveCallback().catch((err) => {
        toastError(err?.message);
        setIsLoading(false);
      });
    }
  };

  return (
    <BaseModal
      open={open}
      sx={{
        padding: '15px',
        maxWidth: '352px',
        width: '100%',
        height: 'auto',
        maxHeight: '749px',
        overflowY: 'auto',
      }}
    >
      <IconButton onClick={onDismiss} sx={{ position: 'absolute', right: 8, top: 8 }}>
        <CloseIcon />
      </IconButton>
      <Stack gap="22px">
        <Typography variant="body14MulishBold" color="green.100">
          Stake
        </Typography>
        <WrapInput>
          <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
            <MaxButton onClick={handleMaxInput}>
              <Typography variant="body14MulishSemiBold" color="primary.main">
                MAX
              </Typography>
            </MaxButton>
            <Typography variant="body14MulishSemiBold" color="gray.400">
              Balance: {quoteBalance?.toFixed(4) || 0} {unit}
            </Typography>
          </Stack>
          <Stack alignItems="center" justifyContent="space-between">
            <OutlinedInput
              value={input}
              onChange={handleChangeInput}
              placeholder="0.00"
              type="number"
              sx={{
                fieldset: {
                  display: 'none',
                },
                input: {
                  padding: '0',
                  fontWeight: '500',
                  fontSize: '32px',
                  lineHeight: '180%',
                },
              }}
            />
            <CurrentcyBox>
              <Typography variant="body14MulishSemiBold" color="gray.100">
                {unit}
              </Typography>
              <img src={`/icons/coins/${unit}.svg`} alt={unit} />
            </CurrentcyBox>
          </Stack>
        </WrapInput>
        <Box>
          <ConfirmButton
            isLoading={isloading}
            onClick={handleStack}
            disabled={purchaseInput === '' || purchaseInput === '0'}
          >
            {!isloading && (
              <Typography variant="body3Poppins" color="#000607" fontWeight="600">
                {approvalState === ApprovalState.NOT_APPROVED ? 'Approve' : 'Confirm'}
              </Typography>
            )}
          </ConfirmButton>
        </Box>
      </Stack>
    </BaseModal>
  );
};

const WrapInput = styled(Stack)`
  background-color: ${(props) => props.theme.palette.background.default};
  border-radius: 8px;
  padding: 1rem 1.5rem;
  gap: 1.5rem;
`;
const MaxButton = styled(Button)`
  padding: 0;
  min-width: auto;
`;

const CurrentcyBox = styled(Box)`
  background-color: ${(props) => props.theme.palette.gray[900]};
  border: 1px solid #000000;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 116px;
  height: 46px;
  justify-content: center;
  padding: 5px 10px;

  img {
    width: 22px;
    height: auto;
  }
`;
const ConfirmButton = styled(PrimaryLoadingButton)`
  background: #07e0e0;
  border-radius: 8px;
  width: 100%;
  height: 57px;

  &.Mui-disabled {
    background: #eaecee;
  }

  .MuiLoadingButton-loadingIndicator {
    color: #a8b0b9;
  }
`;

export default StakeModal;
