import { Box, Container, Stack, Typography, styled } from '@mui/material';
import PrimaryLoadingButton from 'components/PrimaryLoadingButton';
import Image from 'next/image';
import Link from 'next/link';

const menuConfigs = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Swap',
    href: '/swap',
  },
  {
    label: 'Earn',
    href: '/earn',
  },
];

const Menu = ({ children }: any) => {
  return (
    <>
      <Section>
        <Container maxWidth='xl'>
          <Stack flexDirection="row" gap="3rem" width='100%'>
            <Box
              sx={{
                aspectRatio: '1',
                position: 'relative',
                width: '8rem',
              }}
            >
              <Image src="/logo.png" alt="" layout="fill" objectFit="contain" />
            </Box>
            {menuConfigs?.map((item: any) => (
              <Link key={item.href} href={item.href}>
                <MenuItem>
                  <Typography variant="body14MulishBold">{item.label}</Typography>
                </MenuItem>
              </Link>
            ))}
            <ConnectWallet>
              <Typography variant="body14MulishBold">Connect Wallet</Typography>
            </ConnectWallet>
          </Stack>
        </Container>
      </Section>
      <Box>{children}</Box>
    </>
  );
};

const Section = styled(Box)`
  background-color: #0c1620;
`;
const MenuItem = styled(Box)`
  background-color: transparent;
  border-radius: 12px;
  padding: 10px;
  cursor: pointer;

  &.active: {
    background-color: rgba(240, 185, 11, 0.1);
  }
`;
const ConnectWallet = styled(PrimaryLoadingButton)`
  width: 198px;
  height: 40px;
  margin-left: auto;
`;

export default Menu;
