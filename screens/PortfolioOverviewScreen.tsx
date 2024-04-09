import React, { useEffect }  from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ListOfCoins from '../components/Portfolio/ListOfCoins';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PortfolioOverviewScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialCommunityIcons
          name='plus'
          size={24}
          style={{ marginRight: 10 }}
          onPress={() => openAddTransactionModal()}
        />
      ),
      headerLeft: () => (
        <MaterialCommunityIcons
          name='delete'
          size={24}
          style={{ marginRight: 10 }}
          onPress={() => AsyncStorage.clear()}
        />
      )
    });
  }, [navigation]);

  const openAddTransactionModal = () => {
    navigation.navigate('Modal', {
      screen: 'AddTransaction',
    });
  };
  
  return (
    <SafeAreaView style={styles.view}>
      <ListOfCoins onCoinPress={(coin) => navigation.navigate('CoinPurchases', { coin })} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default PortfolioOverviewScreen;
