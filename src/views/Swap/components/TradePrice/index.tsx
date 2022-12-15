import { Currency, Price } from '@bionswap/core-sdk';
import { Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import Image from 'next/image';

type Props = {
  price?: Price<Currency, Currency>;
};

const TradePrice = ({ price }: Props) => {
  const [inverted, setInverted] = useState(false);

  const formattedPrice = inverted ? price?.invert()?.toSignificant(6) : price?.toSignificant(6);

  const labelInverted = inverted ? `${price?.baseCurrency?.symbol} ` : `${price?.quoteCurrency?.symbol}`;

  const label = inverted ? `${price?.quoteCurrency?.symbol}` : `${price?.baseCurrency?.symbol}`;

  return (
    <Stack direction="row">
      <Button
        onClick={() => setInverted(!inverted)}
        sx={{
          boxShadow: 'none',
          padding: '0',
          display: 'flex',
          gap: '0.6rem',

          '&:hover': {
            transform: 'none',
            backgroundColor: 'transparent',
          },
        }}
      >
        <Typography variant="body14MulishSemiBold" color="gray.500">
          {`1 ${label} = ${formattedPrice} ${labelInverted}`}
        </Typography>
        <SwapHorizontalCircleIcon sx={{
          color: 'gray.500',
          fontSize: '2rem'
        }} />
      </Button>
    </Stack>
  );
};

export default TradePrice;
