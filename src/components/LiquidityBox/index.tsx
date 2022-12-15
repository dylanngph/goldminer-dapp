import { styled, Stack, Typography, Button } from '@mui/material';
import { TransactionSettings } from 'components';
import { useRouter } from 'next/router';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const LiquidityBox = ({ children, isBack = false }: any) => {
  const router = useRouter();

  const redirectAnotherPage = (value: string) => {
    router.push(value);
  };

  return (
    <WrapLiquidityBox>
      <Stack flexDirection="row" justifyContent="space-between" width="100%">
        {isBack && (
          <Button
            onClick={() => redirectAnotherPage('/liquidity')}
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
      {children}
    </WrapLiquidityBox>
  );
};

const WrapLiquidityBox = styled(Stack)`
  max-width: 45rem;
  min-height: 39.4rem;
  height: auto;
  border-radius: 1.2rem;
  padding: 2rem;
  border: 1px solid ${(props) => props.theme.palette.gray[700]};
  box-shadow: 0px 12px 40px rgba(0, 0, 0, 0.05);
  background: ${(props) => props.theme.palette.gray[900]};
  gap: 2rem;
  margin: auto;
  width: 100%;
`;

export default LiquidityBox;
