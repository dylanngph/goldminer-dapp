import { Currency } from '@bionswap/core-sdk';
import { Stack } from '@mui/material';
import CurrencyLogo from 'components/CurrencyLogo';
import React from 'react';

interface DoubleCurrencyLogoProps {
  margin?: boolean;
  size?: number;
  currency0?: Currency;
  currency1?: Currency;
  className?: string;
  logoClassName?: string;
}

export default function DoubleCurrencyLogo({ currency0, currency1, size = 16 }: DoubleCurrencyLogoProps) {
  return (
    <Stack direction="row">
      <CurrencyLogo currency={currency0} size={size.toString() + 'px'} />
      <CurrencyLogo currency={currency1} size={size.toString() + 'px'} />
    </Stack>
  );
}
