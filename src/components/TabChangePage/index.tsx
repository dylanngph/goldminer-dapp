import { Stack, styled, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { Button } from 'components';

const TabChangePage = ({ data }: any) => {
  const router = useRouter();
  console.log('🚀 ~ file: index.tsx:7 ~ TabChangePage ~ router', router);

  const redirectToAnotherPage = (value: string) => {
    router.push(value);
  };

  return (
    <WrapBox>
      <WrapItems>
        {data?.map((item: any) => (
          <Item
            key={item.label}
            onClick={() => redirectToAnotherPage(item.link)}
            className={item.link === router.route ? 'active' : ''}
          >
            <Typography variant="body18MulishSemiBold" color={item.link === router.route ? 'text.primary' : 'gray.600'}>
              {item.label}
            </Typography>
          </Item>
        ))}
      </WrapItems>
    </WrapBox>
  );
};

const WrapBox = styled(Stack)``;
const WrapItems = styled(Stack)`
  background: ${(props) => props.theme.palette.gray[900]};
  box-shadow: 0px 12px 40px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  padding: 1rem;
  flex-direction: row;
  gap: 2rem;
`;
const Item = styled(Box)`
  padding: 10px;
  cursor: pointer;
  border-radius: 8px;

  &.active {
    background: linear-gradient(180deg, #e8a639 0%, #ebb340 50.84%, #f2ca4c 100%);
  }
`;

export default TabChangePage;
