import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { TransactionsProvider } from './context/TransactionsContext';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <TransactionsProvider>
        <AppNavigator />
      </TransactionsProvider>
    </ThemeProvider>
  );
};

export default App;
