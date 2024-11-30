interface Currency {
  currency_code: string;
  currency_name: string;
  symbol: string;
  country: string;
}

export const getCurrencySymbol = (currency: string, currencies: Currency[]) => {
  const currencyData = currencies.find((c) => c.currency_code === currency);
  return currencyData?.symbol;
};

export const getCurrencyCountry = (
  currency: string,
  currencies: Currency[]
) => {
  const currencyData = currencies.find((c) => c.currency_code === currency);
  return currencyData?.country;
};
