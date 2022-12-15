import { Box, Stack } from '@mui/material';
import LiquidityBox from 'components/LiquidityBox';
import TabChangePage from 'components/TabChangePage';
import LiquidityPage from 'views/Liquidity';

const configs = [
    {
        label: 'Swap',
        link: '/swap',
    },
    {
        label: 'Liquidity',
        link: '/liquidity',
    }
]

const Liquidity = () => {
  return (
    <Stack gap='4rem' mt='4rem'>
      <TabChangePage data={configs} />
      <LiquidityBox>
        <LiquidityPage />
      </LiquidityBox>
    </Stack>
  );
};

export default Liquidity;
