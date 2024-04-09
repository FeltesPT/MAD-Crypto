import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, FlatList, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTransactions } from '../context/TransactionsContext';
import TransactionCard from '../components/Transaction/TransactionCard';

type ParamList = {
  CoinPurchases: {
    coin: string;
  };
};

const CoinPurchasesScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const route = useRoute<RouteProp<ParamList, 'CoinPurchases'>>();
  const { coin } = route.params;
  const { transactions } = useTransactions();

  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

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

  const openEditTransactionModal = (transaction: Transaction) => {
    navigation.navigate('Modal', {
      screen: 'EditTransaction',
      params: { transaction },
    });
  };

  useEffect(() => {
    const coinTransactions = transactions.filter((t) => t.coin === coin);
    setFilteredTransactions(
      coinTransactions.slice().sort((a, b) => Number(b.id) - Number(a.id)),
    );
  }, [coin, transactions]);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.headerView}>
            <Text style={styles.header}>Transactions List</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openEditTransactionModal(item)}>
            <TransactionCard item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CoinPurchasesScreen;
