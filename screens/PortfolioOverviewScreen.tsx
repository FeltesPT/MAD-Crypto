import React, { useEffect, useContext }  from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';

import ListOfCoins from '../components/Portfolio/ListOfCoins';

const PortfolioOverviewScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const { colors } = useContext(ThemeContext);

  useEffect(() => {
    navigation.setOptions({
      title: "Portfolio",
      headerRight: () => (
        <MaterialCommunityIcons
          name='plus'
          size={24}
          style={{ marginRight: 10, color: colors.text }}
          onPress={() => openAddTransactionModal()}
        />
      ),
      // headerLeft: () => (
      //   <MaterialCommunityIcons
      //     name='delete'
      //     size={24}
      //     style={{ marginRight: 10 }}
      //     onPress={() => AsyncStorage.clear()}
      //   />
      // )
    });
  }, [navigation]);

  const openAddTransactionModal = () => {
    navigation.navigate('Modal', {
      screen: 'AddTransaction',
    });
  };
  
  return (
    <View style={[styles.view, { backgroundColor: colors.background }]}>
      <ListOfCoins onGoToChartPress={() => navigation.navigate('Chart')} onCoinPress={(coin) => navigation.navigate('CoinPurchases', { coin })} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default PortfolioOverviewScreen;
