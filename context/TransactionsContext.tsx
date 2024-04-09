import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';

import {
  loadTransactions,
  addTransaction,
  editTransaction,
} from '../utils/transactionData';

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (newTransaction: Transaction) => Promise<TransactionResponse>;
  editTransaction: (transaction: Transaction) => Promise<TransactionResponse>;
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

  const addTransactionHandler = useCallback(
    async (newTransaction: Transaction): Promise<TransactionResponse> => {
      try {
        const response = await addTransaction(newTransaction);
        setTransactions((prevTransactions) => [
          ...prevTransactions,
          newTransaction,
        ]);
        return response;
      } catch (error) {
        console.error('Error adding transaction:', error);
        return {
          statusCode: 400,
          message: 'Failed to add transaction',
        };
      }
    },
    [],
  );

  const editTransactionHandler = useCallback(
    async (transaction: Transaction): Promise<TransactionResponse> => {
      try {
        const response = await editTransaction(transaction);
        setTransactions(response.updatedTransactions);
        return response;
      } catch (error) {
        console.error('Error adding transaction:', error);
        return {
          statusCode: 400,
          message: 'Failed to add transaction',
        };
      }
    },
    [],
  );

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction: addTransactionHandler,
        editTransaction: editTransactionHandler,
      }}
    >
      {children}
    </TransactionsContext.Provider>
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
