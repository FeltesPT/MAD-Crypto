interface Portfolio {
  [key: string]: number;
}
interface Transaction {
  id: string;
  coin: string;
  type: 'buy' | 'sell';
  quantity: number;
  pricePerCoin: number;
  date: string;
}

interface CoinSummary {
  quantity: number;
  totalPrice: number;
}

interface TransactionResponse {
  statusCode: number;
  message: string;
  transaction?: Transaction | undefined;
  updatedTransactions?: Transaction[] | undefined;
}