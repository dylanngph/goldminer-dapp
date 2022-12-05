import { Stack, Box, styled, Typography } from '@mui/material';
import Image from 'next/image';

const Items = ({ data }: any) => {
  console.log('data?.length==>', data?.length);
  return data?.length !== 0 ? (
    <Stack gap="2.5rem" flexDirection="row" flexWrap="wrap" width="100%">
      {data?.map((item: any) => (
        <Card
          key={item}
          sx={{
            position: 'relative',
            width: 'calc(100% / 5 - 2rem)',
            aspectRatio: '1/1.395',
          }}
        >
          <Image src={item.image} alt={item.image} layout="fill" objectFit="contain" />
        </Card>
      ))}
    </Stack>
  ) : (
    <Stack>
      <Box
        sx={{
          position: 'relative',
          maxWidth: '55rem',
          width: '100%',
          aspectRatio: '1/0.523',
        }}
      >
        <Image src="/images/ingame_map1.png" alt="ingame_map1.png" layout="fill" objectFit="contain" />
      </Box>
      <Typography variant="body28MulishBold" lineHeight="4rem" color="text.primary">
        Stay tune, the game is coming
      </Typography>
    </Stack>
  );
};

const Card = styled(Box)``;

export default Items;
