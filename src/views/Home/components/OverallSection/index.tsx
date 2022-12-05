import { styled, Box, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';

const configs = [
  {
    label: 'Total Items',
    icon: '/images/TotalItems.png',
    value: '11,568,558',
  },
  {
    label: 'Total Owners',
    icon: '/images/TotalOwners.png',
    value: '2,050,650',
  },
  {
    label: 'Total Volume',
    icon: '/images/TotalVolume.png',
    value: '1,362,031',
  },
  {
    label: 'Transaction',
    icon: '/images/Transaction.png',
    value: '18,164,215',
  },
];

const OverallSection = () => {
  return (
    <Section>
      <Container maxWidth="xl">
        <WrapBox>
          <Typography variant="body24MulishBold" color="text.primary">
            Overall stats
          </Typography>
          <Stack gap="2.4rem" flexDirection="row" justifyContent='space-between'>
            {configs.map((item: any, index: number) => (
              <>
                <WrapItem key={item.icon}>
                  <Box
                    sx={{
                      width: '5rem',
                      aspectRatio: '1',
                      position: 'relative',
                    }}
                  >
                    <Image src={item.icon} alt={item.label} layout="fill" objectFit="contain" />
                  </Box>
                  <Stack alignItems="flex-start">
                    <Typography variant="body14MulishRegular" color="gray.500" lineHeight="2.4rem">
                      {item.label}
                    </Typography>
                    <Typography variant="body24MulishBlack" color="text.primary" lineHeight="3rem">
                      {item.value}
                    </Typography>
                  </Stack>
                </WrapItem>
                {index !== configs.length - 1 && <VerticalLine />}
              </>
            ))}
          </Stack>
        </WrapBox>
      </Container>
    </Section>
  );
};

const Section = styled(Box)`
    margin-top: 50px;
`;
const WrapBox = styled(Stack)`
  background: #0c1620;
  border-radius: 12px;
  padding: 40px 24px;
  gap: 35px;
  align-items: flex-start;
`;
const WrapItem = styled(Stack)`
  gap: 16px;
  flex-direction: row;
`;
const VerticalLine = styled(Box)`
  height: 6rem;
  width: 1px;
  background-color: ${(prop) => prop.theme.palette.gray[800]};
`;

export default OverallSection;
