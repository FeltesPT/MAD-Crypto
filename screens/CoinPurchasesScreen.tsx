import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTransactions } from '../context/TransactionsContext';

type ParamList = {
  CoinPurchases: {
    coin: string;
  };
};

const CoinPurchasesScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const route = useRoute<RouteProp<ParamList, 'CoinPurchases'>>();
  const { coin } = route.params;
  const { transactions } = useTransactions();

  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    navigation.setOptions({
      title: coin,

      headerRight: () => (
        <MaterialCommunityIcons
          name='plus'
          size={24}
          style={{ marginRight: 10 }}
          onPress={() => openAddTransactionModal()}
        />
      ),
    });
  }, [coin, navigation]);

  const openAddTransactionModal = () => {
    navigation.navigate('Modal', {
      screen: 'AddTransaction',
      params: { coin },
    });
  };

  useEffect(() => {
    const coinTransactions = transactions.filter(t => t.coin === coin);
    setFilteredTransactions(coinTransactions.slice().sort((a, b) => Number(b.id) - Number(a.id)));
  }, [coin, transactions]);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text>Date: {item.date}</Text>
            <Text>Type: {item.type}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Price Per Coin: ${item.pricePerCoin}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  transactionItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default CoinPurchasesScreen;
