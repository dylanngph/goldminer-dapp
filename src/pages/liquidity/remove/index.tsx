import { ConnectButton } from 'components';
import { Stack } from '@mui/material';
import RemoveLiquidity from 'views/Liquidity/Remove';

type Props = {};

const RemoveLiquidityPage = (props: Props) => {
  return (
    <>
      <Stack sx={{ bgcolor: 'black' }}>
        <ConnectButton />
        <RemoveLiquidity />
      </Stack>
    </>
  );
};

export default RemoveLiquidityPage;
