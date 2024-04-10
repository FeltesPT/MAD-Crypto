import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import { ThemeContext } from '../../context/ThemeContext';

const TransactionCard = ({ item }: { item: Transaction }) => {
  const { colors } = useContext(ThemeContext);

  const textColor = item.type === 'buy'? colors.positiveCardText : colors.negativeCardText;

  return (
    <Card
      style={[
        styles.transactionItem,
        {
          backgroundColor:
            item.type === 'buy'
              ? colors.positiveCardBackground
              : colors.negativeCardBackground,
        },
      ]}
    >
      <Card.Title
        title={item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        titleStyle={{ color: textColor, fontWeight: 'bold', fontSize: 18 }}
      />
      <Card.Content>
        <Text style={{ color: textColor }}><Text style={{fontWeight: 'bold'}}>Quantity:</Text> {item.quantity.toFixed(2)}</Text>
        <Text style={{ color: textColor }}><Text style={{fontWeight: 'bold'}}>Value:</Text> ${item.pricePerCoin.toFixed(2)}</Text>
        <Text style={{ color: textColor }}><Text style={{fontWeight: 'bold'}}>Date:</Text> {item.date}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  transactionItem: {
    marginBottom: 10,
    marginHorizontal: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default TransactionCard;
