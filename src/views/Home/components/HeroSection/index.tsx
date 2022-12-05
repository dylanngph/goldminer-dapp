import { styled, Box, Container, Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const Socials = [
  {
    label: 'Discord',
    icon: '/images/socials/discord.svg',
    link: '/',
  },
  {
    label: 'Telegram',
    icon: '/images/socials/telegram.svg',
    link: '/',
  },
  {
    label: 'Twitter',
    icon: '/images/socials/twitter.svg',
    link: '/',
  },
  {
    label: 'Facebook',
    icon: '/images/socials/facebook.svg',
    link: '/',
  },
  {
    label: 'Youtube',
    icon: '/images/socials/youtube.svg',
    link: '/',
  },
];

const HeroSection = () => {
  return (
    <Section>
      <Container maxWidth="xl">
        <Stack width="100%" alignItems='flex-end'>
          <Stack>
            <Box
              sx={{
                position: 'relative',
                width: '54.8rem',
                aspectRatio: '1/0.34',
              }}
            >
              <Image src="/images/Group48095620.png" alt="" layout="fill" objectFit="contain" />
            </Box>
            <Stack flexDirection="row" gap='1.6rem' ml='-3.5rem' mt='-2rem'>
              {Socials?.map((item: any) => (
                <Link key={item.icon} href={item.link}>
                  <SocialItem>
                    <Box
                      sx={{
                        position: 'relative',
                        width: '2rem',
                        aspectRatio: '1',
                      }}
                    >
                      <Image src={item.icon} alt="" layout="fill" objectFit="contain" />
                    </Box>
                  </SocialItem>
                </Link>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
};

const Section = styled(Box)`
  height: calc(100vh - 8rem);
  background-image: url('/images/bgHero.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
`;
const SocialItem = styled(Stack)`
  background-image: url('/images/BgSocial.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 5.5rem;
  aspect-ratio: 1/1.077;
  cursor: pointer;
`;

export default HeroSection;
