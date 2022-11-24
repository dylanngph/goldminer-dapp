import { Stack } from '@mui/material';
import { ConnectButton } from 'components';
import LiquidityPosition from 'views/Liquidity/Position';

type Props = {};

const LiquidityPositionPage = (props: Props) => {
  return (
    <>
      <Stack sx={{ bgcolor: 'black' }}>
        <ConnectButton />
        <LiquidityPosition />
      </Stack>
    </>
  );
};

export default LiquidityPositionPage;
