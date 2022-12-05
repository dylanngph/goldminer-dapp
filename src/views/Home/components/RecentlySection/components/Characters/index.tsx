import { Stack, Box, styled, Typography } from '@mui/material';
import PrimaryLoadingButton from 'components/PrimaryLoadingButton';
import Image from 'next/image';

const Characters = ({ data }: any) => {
  console.log('data?.length==>', data?.length);
  return data?.length !== 0 ? (
    <Stack gap='5rem'>
      <Stack gap="2.5rem" flexDirection="row" flexWrap="wrap" width="100%">
        {data?.map((item: any) => (
          <Card
            key={item}
            sx={{
              position: 'relative',
              width: { xs: 'calc(100% / 2 - 2rem)', sm: 'calc(100% / 3 - 2rem)', md: 'calc(100% / 5 - 2rem)' },
              aspectRatio: '1/1.395',
            }}
          >
            <Image src={item.image} alt={item.image} layout="fill" objectFit="contain" />
          </Card>
        ))}
      </Stack>
      <PrimaryLoadingButtonCustom variant='outlined'>
        <Typography variant='body16MulishBold' color='#E6AB58' lineHeight='2.7rem'>
          View in marketplace
        </Typography>
      </PrimaryLoadingButtonCustom>
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
const PrimaryLoadingButtonCustom = styled(PrimaryLoadingButton)`
  max-width: 218px;
  width: 100%;
  height: 46px;
`

export default Characters;
