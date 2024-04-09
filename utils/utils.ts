export const getCryptoColor = (value): string => {
  const currency = cryptocurrencies.find((c) => c.label === value);
  return currency.color;
};

export const cryptocurrencies = [
  { label: 'Bitcoin', value: 'BTC', color: '#24466B' },
  { label: 'Ethereum', value: 'ETH', color: '#633E63' },
  { label: 'Cardano', value: 'ADA', color: '#B85675' },
  { label: 'Litecoin', value: 'LTC', color: '#D45B7A' },
  { label: 'Ripple', value: 'XRP', color: '#FDA576' },
  { label: 'Solana', value: 'SOL', color: '#EB6763' },
  { label: 'Dogecoin', value: 'DOGE', color: '#9599A3' },
];
