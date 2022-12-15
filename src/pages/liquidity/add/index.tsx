import LiquidityBox from 'components/LiquidityBox';
import AddLiquidity from 'views/Liquidity/Add';

type Props = {};

const AddLiquidityPage = (props: Props) => {
  return (
    <LiquidityBox isBack={true}>
      <AddLiquidity />
    </LiquidityBox>
  );
};

export default AddLiquidityPage;
