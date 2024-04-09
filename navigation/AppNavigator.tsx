import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// Import your screens
import PortfolioOverviewScreen from '../screens/PortfolioOverviewScreen';
import CoinPurchasesScreen from '../screens/CoinPurchasesScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';

// Define the Modal Stack first
const ModalStack = createNativeStackNavigator();
const ModalStackScreen = () => (
  <ModalStack.Navigator
    screenOptions={{ headerShown: false, presentation: 'formSheet' }}
  >
    <ModalStack.Screen
      name='AddTransaction'
      component={AddTransactionScreen}
      options={{ title: 'Add Transaction' }}
    />
  </ModalStack.Navigator>
);

// Now define the main Stack Navigator
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='PortfolioOverview'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name='PortfolioOverview'
          component={PortfolioOverviewScreen}
        />
        <Stack.Screen name='CoinPurchases' component={CoinPurchasesScreen} />
        <Stack.Screen
          name='Modal'
          component={ModalStackScreen}
          options={{ title: 'Add Transaction', presentation: 'formSheet' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
