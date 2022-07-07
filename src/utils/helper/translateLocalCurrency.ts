export const translateLocalCurrency = (
  price: number,
  locales?: any,
  options?: any
) => {
  return price.toLocaleString(locales, options);
};
