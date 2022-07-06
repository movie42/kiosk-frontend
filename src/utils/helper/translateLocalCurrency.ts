export const translateLocalCurrency = (
  price: number,
  locales?: any,
  options: any = { style: "currency", currency: "KRW" },
) => {
  return price.toLocaleString(locales, options);
};
