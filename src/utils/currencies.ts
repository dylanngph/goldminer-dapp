import { ChainId, Currency, CurrencyAmount, JSBI, NATIVE, WNATIVE } from '@bionswap/core-sdk';

export function getCurrencyId(currency: Currency): string {
  if ([ChainId.CELO].includes(currency.chainId)) {
    return currency.wrapped.address;
  }

  if (currency.isNative) return 'ETH';

  if (currency.isToken) return currency.address;

  throw new Error('invalid currency');
}

const MIN_NATIVE_CURRENCY_FOR_GAS: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)); // .01 ETH

/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
export function maxAmountSpend(currencyAmount?: CurrencyAmount<Currency>): CurrencyAmount<Currency> | undefined {
  if (!currencyAmount) return undefined;
  if (currencyAmount.currency.isNative) {
    if (JSBI.greaterThan(currencyAmount.quotient, MIN_NATIVE_CURRENCY_FOR_GAS)) {
      return CurrencyAmount.fromRawAmount(
        currencyAmount.currency,
        JSBI.subtract(currencyAmount.quotient, MIN_NATIVE_CURRENCY_FOR_GAS),
      );
    } else {
      return CurrencyAmount.fromRawAmount(currencyAmount.currency, JSBI.BigInt(0));
    }
  }
  return currencyAmount;
}

export function unwrappedCurrencyAmount(amount?: CurrencyAmount<Currency>): CurrencyAmount<Currency> | undefined {
  if (!amount) return;

  const native = NATIVE[amount.currency.chainId];
  return CurrencyAmount.fromRawAmount(native, amount.quotient);
}

export function unwrappedToken(currency: Currency): Currency {
  if (currency.isNative) return currency;

  // @ts-ignore TYPE NEEDS FIXING
  if (currency.chainId in ChainId && currency.equals(WNATIVE[currency.chainId])) return NATIVE[currency.chainId];

  return currency;
}
