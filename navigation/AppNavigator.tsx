import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// Import your screens
import PortfolioOverviewScreen from '../screens/PortfolioOverviewScreen';
import CoinPurchasesScreen from '../screens/CoinPurchasesScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import ChartScreen from '../screens/ChartScreen';

import { ThemeContext } from '../context/ThemeContext';

// Define the Modal Stack first
const ModalStack = createNativeStackNavigator();
const ModalStackScreen = () => (
  <ModalStack.Navigator
    screenOptions={{ headerShown: true }}
  >
    <ModalStack.Screen
      name='AddTransaction'
      component={AddTransactionScreen}
      options={{ title: 'Add Transaction' }}
    />
    <ModalStack.Screen
      name='EditTransaction'
      component={AddTransactionScreen}
      options={{ title: 'Edit Transaction' }}
    />
  </ModalStack.Navigator>
);

// Now define the main Stack Navigator
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='PortfolioOverview'
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.header,
          },
          headerTintColor: colors.text,
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name='PortfolioOverview'
          component={PortfolioOverviewScreen}
        />
        <Stack.Screen name='CoinPurchases' component={CoinPurchasesScreen} />
        <Stack.Screen name='Chart' component={ChartScreen} />
        <Stack.Screen
          name='Modal'
          component={ModalStackScreen}
          options={{
            headerShown: false,
            title: 'Add Transaction',
            presentation: 'formSheet',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
