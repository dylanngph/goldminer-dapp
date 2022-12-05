import { styled, Box, Container, Stack, Typography, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import Characters from './components/Characters';
import Items from './components/Items';
import Machines from './components/Machines';

const items = [
  {
    image: '/images/characters/Legendary.png',
  },
  {
    image: '/images/characters/Epic.png',
  },
  {
    image: '/images/characters/Common.png',
  },
  {
    image: '/images/characters/Rare.png',
  },
  {
    image: '/images/characters/Legendary.png',
  },
  {
    image: '/images/characters/Common.png',
  },
  {
    image: '/images/characters/Legendary.png',
  },
  {
    image: '/images/characters/Rare.png',
  },
  {
    image: '/images/characters/Legendary.png',
  },
  {
    image: '/images/characters/Epic.png',
  },
  {
    image: '/images/characters/Rare.png',
  },
  {
    image: '/images/characters/Common.png',
  },
  {
    image: '/images/characters/Epic.png',
  },
  {
    image: '/images/characters/Legendary.png',
  },
  {
    image: '/images/characters/Rare.png',
  },
];

const configs = [
  {
    title: 'Characters',
    component: <Characters data={items} />,
  },
  {
    title: 'Items',
    component: <Items data={[]} />,
  },
  {
    title: 'Machines',
    component: <Machines data={[]} />,
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: '4rem' }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const RecentlySection = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Section>
      <Container maxWidth="xl">
        <WrapBox>
          <Typography variant="body24MulishBold" color="text.primary" lineHeight="3rem">
            Recently listed
          </Typography>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange}>
                {configs.map((item: any, index: number) => (
                  <Tab
                    key={item.title}
                    label={
                      <Typography variant="body16MulishBold" color="gray.400" lineHeight="2rem" textTransform="initial">
                        {item.title}
                      </Typography>
                    }
                    {...a11yProps(index)}
                  />
                ))}
              </Tabs>
            </Box>
            {configs.map((item: any, index: number) => (
              <TabPanel value={value} index={index} key={item.component}>
                {item.component}
              </TabPanel>
            ))}
          </Box>
        </WrapBox>
      </Container>
    </Section>
  );
};

const Section = styled(Box)`
  margin-top: 50px;
  margin-bottom: 90px;
`;
const WrapBox = styled(Stack)`
  align-items: flex-start;
  gap: 2.4rem;

  .Mui-selected {
    span {
      color: ${(prop) => prop.theme.palette.text.primary};
    }
  }

  .MuiTabs-indicator {
    background: #f0b90b;
    border-radius: 4px 4px 0px 0px;
    height: 5px;
  }
`;

export default RecentlySection;
