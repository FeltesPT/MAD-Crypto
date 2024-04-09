import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { TransactionsProvider } from './context/TransactionsContext';

const App = () => {
  return (
    <TransactionsProvider>
      <AppNavigator />
    </TransactionsProvider>
  );
};

export default App;
