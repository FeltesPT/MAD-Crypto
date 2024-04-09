import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

const TransactionCard = ({ item }: { item: Transaction }) => {
  return (
    <Card style={styles.transactionItem}>
    <Card.Title title={item.type.charAt(0).toUpperCase() + item.type.slice(1)} />
    <Card.Content>
      <Text>Quantity: {item.quantity.toFixed(2)}</Text>
      <Text>Value: ${item.pricePerCoin.toFixed(2)}</Text>
    </Card.Content>
  </Card>
  );
};

const styles = StyleSheet.create({
  transactionItem: {
    marginBottom: 10,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default TransactionCard;
