import { Stack } from '@mui/material';
import { ConnectButton } from 'components';
import AddLiquidity from 'views/Liquidity/Add';

type Props = {};

const AddLiquidityPage = (props: Props) => {
  return (
    <>
      <Stack sx={{ bgcolor: 'black' }}>
        <ConnectButton />
        <AddLiquidity />
      </Stack>
    </>
  );
};

export default AddLiquidityPage;
