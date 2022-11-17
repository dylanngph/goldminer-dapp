import dynamic from "next/dynamic";

// import Trade from "views/Trade";
const Trade = dynamic(() => import("../../views/Swap"), {
  ssr: false,
});

type Props = {};

const SwapPage = (props: Props) => {
  return (
    <>
      <Trade />
    </>
  );
};

export default SwapPage;
