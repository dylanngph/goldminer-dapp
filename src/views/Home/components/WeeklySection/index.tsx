import { Container, styled, Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';

const configs = [
  {
    label: 'New Players',
    icon: '/images/NewPlayers.png',
    value: '6,234',
  },
  {
    label: 'Sale Volume',
    icon: '/images/SaleVolume.png',
    value: '2,456',
  },
  {
    label: 'Player Points',
    icon: '/images/PlayerPoints.png',
    value: '2,456,345',
  },
];

const WeeklySection = () => {
  return (
    <Section>
      <Container maxWidth="xl">
        <WrapBox>
          <Stack
            gap="2.4rem"
            flexDirection="row"
            flexWrap="wrap"
            sx={{
              justifyContent: { xs: 'start', sm: 'end' },
            }}
          >
            <ContentBox>
              <Typography variant="body24MulishBold" color="text.primary" lineHeight="3rem">
                This week in Gold Miner
              </Typography>
              <Typography variant="body14MulishSemiBold" color="gray.500" lineHeight="1.8rem">
                General stats from the past 7 days in the Gold Miner NFT.
              </Typography>
            </ContentBox>
            {configs?.map((item: any) => (
              <WrapItem key={item.icon}>
                <Box
                  sx={{
                    width: '6rem',
                    aspectRatio: '1',
                    position: 'relative',
                  }}
                >
                  <Image src={item.icon} alt={item.label} layout="fill" objectFit="contain" />
                </Box>
                <Stack alignItems="flex-start">
                  <Typography variant="body16MulishSemiBold" color="gray.500" lineHeight="2.4rem">
                    {item.label}
                  </Typography>
                  <Typography variant="body28MulishBlack" color="text.primary" lineHeight="3.5rem">
                    {item.value}
                  </Typography>
                </Stack>
              </WrapItem>
            ))}
          </Stack>
        </WrapBox>
      </Container>
    </Section>
  );
};

const Section = styled(Box)``;
const WrapBox = styled(Box)`
  border: 1px solid #373f47;
  border-radius: 12px;
  background-color: #0c1620;
  padding: 2.5rem;
`;
const ContentBox = styled(Stack)`
  max-width: 192px;
  width: 100%;
  gap: 1.2rem;
  margin-right: auto;
`;
const WrapItem = styled(Stack)`
  background: #242d35;
  border-radius: 10px;
  gap: 16px;
  flex-direction: row;
  max-width: 26.5rem;
  width: 100%;
  height: 10.8rem;
`;

export default WeeklySection;
