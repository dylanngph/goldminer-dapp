import RemoveLiquidity from 'views/Liquidity/Remove';
import LiquidityBox from 'components/LiquidityBox';

type Props = {};

const RemoveLiquidityPage = (props: Props) => {
  return (
    <LiquidityBox isBack={true}>
      <RemoveLiquidity />
    </LiquidityBox>
  );
};

export default RemoveLiquidityPage;
