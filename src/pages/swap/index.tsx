import { Stack } from '@mui/material';
import { ConnectButton } from 'components';
import TabChangePage from 'components/TabChangePage';
import dynamic from 'next/dynamic';

// import Trade from "views/Trade";
const Trade = dynamic(() => import('../../views/Swap'), {
  ssr: false,
});

type Props = {};

const configs = [
  {
    label: 'Swap',
    link: '/swap',
  },
  {
    label: 'Liquidity',
    link: '/liquidity',
  },
];

const SwapPage = (props: Props) => {
  return (
    <Stack gap="4rem" mt="4rem">
      <TabChangePage data={configs} />
      <Trade />
    </Stack>
  );
};

export default SwapPage;
