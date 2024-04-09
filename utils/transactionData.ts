import AsyncStorage from '@react-native-async-storage/async-storage';
import transactionsData from '../assets/crypto_transactions_1000.json'; // Adjust the import based on your file structure

const TRANSACTION_STORAGE_KEY = 'CRYPTO_TRANSACTIONS';

export const loadTransactions = async (): Promise<Transaction[]> => {
  try {
    // Attempt to read transactions from AsyncStorage
    const storedTransactions = await AsyncStorage.getItem(
      TRANSACTION_STORAGE_KEY,
    );
    if (storedTransactions !== null) {
      // Parse and return the stored transactions if they exist
      return JSON.parse(storedTransactions);
    } else {
      // If no transactions are stored, initialize with your JSON file
      const initialTransactions: Transaction[] =
        transactionsData.transactions.map((t: any) => ({
          ...t,
          type: t.type === 'buy' ? 'buy' : 'sell',
        }));

      // Save the initial transactions to AsyncStorage for future launches
      await AsyncStorage.setItem(
        TRANSACTION_STORAGE_KEY,
        JSON.stringify(initialTransactions),
      );

      return initialTransactions;
    }
  } catch (e) {
    // Handle read/write errors
    console.error('Failed to load or save transactions:', e);
    return []; // Return an empty array or initial state as appropriate
  }
};

export const addTransaction = async (
  newTransaction: Transaction,
): Promise<TransactionResponse> => {
  const transactions = await loadTransactions();
  const updatedTransactions = [...transactions, newTransaction];

  try {
    await AsyncStorage.setItem(
      TRANSACTION_STORAGE_KEY,
      JSON.stringify(updatedTransactions),
    );
    return {
      statusCode: 200,
      transaction: newTransaction,
      updatedTransactions,
      message: 'Transaction added successfully',
    };
  } catch (e) {
    console.error('Failed to save the updated transactions:', e);
    return {
      statusCode: 400,
      message: 'Failed to save the updated transactions',
    };
  }
};

export const editTransaction = async (
  updatedTransaction: Transaction
): Promise<TransactionResponse> => {

  const transactions = await loadTransactions();

  const updatedTransactions = transactions.map(t => {
    if(t.id === updatedTransaction.id) {
      return updatedTransaction; 
    }
    return t;
  });

  try {
    await AsyncStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify(updatedTransactions));
    return {
      statusCode: 200,
      transaction: updatedTransaction,
      updatedTransactions,
      message: 'Transaction updated successfully'
    };

  } catch (e) {
    console.error('Failed to update transaction', e);
    return {
      statusCode: 500,
      message: 'Failed to update transaction'
    }
  }

}

const calculatePortfolio = (
  transactions: Transaction[],
): Record<string, CoinSummary> => {
  return transactions.reduce<Record<string, CoinSummary>>(
    (acc, { coin, quantity, pricePerCoin, type }) => {
      const adjustment = type === 'buy' ? 1 : -1;
      if (!acc[coin]) {
        acc[coin] = { quantity: 0, totalPrice: 0 };
      }

      acc[coin].quantity += quantity * adjustment;
      acc[coin].totalPrice += quantity * pricePerCoin * adjustment;
      return acc;
    },
    {},
  );
};

export const portfolioData = async () => {
  const transactions = await loadTransactions();

  return calculatePortfolio(
    transactions.map(
      ({ id, coin, type, quantity, pricePerCoin, date }): Transaction => ({
        id,
        coin,
        type: type === 'buy' ? 'buy' : 'sell',
        quantity,
        pricePerCoin,
        date,
      }),
    ),
  );
};
