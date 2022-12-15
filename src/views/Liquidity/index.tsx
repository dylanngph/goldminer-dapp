import { Stack, Typography } from '@mui/material';
import PrimaryLoadingButton from 'components/PrimaryLoadingButton';
import { useRouter } from 'next/router';
import LiquidityPosition from './Position';

const LiquidityPage = () => {
  const router = useRouter();

  const redirectAnotherPage = (value: string) => {
    router.push(value);
  };

  return (
    <>
      <LiquidityPosition />
      <PrimaryLoadingButton onClick={() => redirectAnotherPage('/liquidity/add')} sx={{ height: '4.6rem' }}>
        <Typography variant="body16MulishBold" color="text.primary">
          Add liquidity
        </Typography>
      </PrimaryLoadingButton>
    </>
  );
};

export default LiquidityPage;
