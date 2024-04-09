import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';

import { loadTransactions, addTransaction } from '../utils/transactionData';

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (newTransaction: Transaction) => Promise<TransactionResponse>;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined,
);

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsProvider: React.FC<TransactionsProviderProps> = ({
  children,
}): React.ReactElement => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const transactions = await loadTransactions();
      setTransactions(transactions);
    };
    loadData();
  }, []);

  const addTransactionHandler = useCallback(async (newTransaction: Transaction): Promise<TransactionResponse> => {
    try {
      // Save the new transaction and update AsyncStorage
      const response = await addTransaction(newTransaction);

      // Assuming addTransaction updates AsyncStorage correctly, 
      // you can directly append the new transaction to the current state.
      // This avoids the need to reload all transactions from AsyncStorage.
      setTransactions(prevTransactions => [...prevTransactions, newTransaction]);

      return response;
    } catch (error) {
      console.error('Error adding transaction:', error);
      return {
        statusCode: 400,
        message: 'Failed to add transaction',
      };
    }
  }, []);

  return React.createElement(
    TransactionsContext.Provider,
    { value: { transactions, addTransaction: addTransactionHandler } },
    children,
  );
};

export const useTransactions = (): TransactionsContextType => {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error(
      'useTransactions must be used within a TransactionsProvider',
    );
  }
  return context;
};
