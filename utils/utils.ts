export const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const cryptocurrencies = [
  { label: 'Bitcoin', value: 'BTC' },
  { label: 'Ethereum', value: 'ETH' },
  { label: 'Cardano', value: 'ADA' },
  { label: 'Litecoin', value: 'LTC' },
  { label: 'Ripple', value: 'XRP' },
  { label: 'Solana', value: 'SOL' },
  { label: 'Dogecoin', value: 'DOGE' },
];
