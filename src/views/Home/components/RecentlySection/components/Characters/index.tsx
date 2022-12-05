import { Stack, Box, styled } from '@mui/material';
import Image from 'next/image';

const Characters = ({ data }: any) => {
  return (
    <Stack gap="2.5rem" flexDirection='row' flexWrap='wrap'>
      {data?.map((item: any) => (
        <Card key={item} sx={{
            position: 'relative',
            width: 'calc(100% / 5 - 2rem)',
            aspectRatio: '1/1.395',
        }}>
          <Image src={item.image} alt={item.image} layout="fill" objectFit="contain" />
        </Card>
      ))}
    </Stack>
  );
};

const Card = styled(Box)`

`

export default Characters;
