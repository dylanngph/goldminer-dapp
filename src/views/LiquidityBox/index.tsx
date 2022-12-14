import { styled, Button, Stack, Typography } from '@mui/material';
import { CurrencyInputPanel, TransactionSettings } from 'components';
import PrimaryLoadingButton from 'components/PrimaryLoadingButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddLiquidity from 'views/Liquidity/Add';
import { useState } from 'react';

const statusConfig = {
  index: 0,
  create: 1,
  find: 2,
};

const LiquidityBox = () => {
  const [status, addStatus] = useState(statusConfig.index);

  const onChangeStatusShow = (value: number) => {
    addStatus(value)
  }
  
  return (
    <WrapLiquidityBox>
      <Stack flexDirection="row" justifyContent="space-between" width="100%">
        {status !== statusConfig.index && (
          <Button
            onClick={() => onChangeStatusShow(statusConfig.index)}
            sx={{
              padding: '0',
              minWidth: 'auto',
            }}
          >
            <ArrowBackIosNewIcon
              sx={{
                fontSize: '1.8rem',
                color: 'gray.400',
              }}
            />
          </Button>
        )}
        <Typography variant="body14MulishBold" color="gray.100">
          Liquidity
        </Typography>
        <TransactionSettings />
      </Stack>
      {status === statusConfig.index ? (
        <>
          <Stack width="100%" flex="1">
            <Typography variant="body16MulishBold" color="gray.500">
              No liquidity pools found.
            </Typography>
          </Stack>
          <PrimaryLoadingButton onClick={() => onChangeStatusShow(statusConfig.create)} sx={{ height: '4.6rem' }}>
            <Typography variant="body16MulishBold" color="text.primary">
              Add liquidity
            </Typography>
          </PrimaryLoadingButton>
        </>
      ) : (
        <AddLiquidity />
      )}
    </WrapLiquidityBox>
  );
};

const WrapLiquidityBox = styled(Stack)`
  max-width: 53rem;
  min-height: 39.4rem;
  height: auto;
  border-radius: 1.2rem;
  padding: 2rem;
  border: 1px solid ${(props) => props.theme.palette.gray[700]};
  box-shadow: 0px 12px 40px rgba(0, 0, 0, 0.05);
  background: ${(props) => props.theme.palette.gray[900]};
  gap: 2rem;
  margin: auto;
`;

export default LiquidityBox;
