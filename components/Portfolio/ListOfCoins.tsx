import React, { useContext, useMemo } from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import { Card, TouchableRipple } from 'react-native-paper';

import { ThemeContext } from '../../context/ThemeContext';
import { useTransactions } from '../../context/TransactionsContext';
import ChartsContainerView from './ChartsContainerView';

// Define the structure of your data items
const ListOfCoins: React.FC<{
  onGoToChartPress: () => void;
  onCoinPress: (coin: string) => void;
}> = ({ onGoToChartPress, onCoinPress }) => {
  const { colors } = useContext(ThemeContext);
  const { transactions } = useTransactions();

  const portfolioArray = useMemo(() => {
    const portfolio = transactions.reduce<Record<string, PortfolioItem>>(
      (acc, { coin, type, quantity, pricePerCoin }) => {
        // Initialize the coin in the accumulator if it's not already there
        if (!acc[coin]) {
          acc[coin] = { coin, quantity: 0, totalPrice: 0 };
        }

        // Aggregate quantities and total prices
        if (type === 'buy') {
          acc[coin].quantity += quantity;
          acc[coin].totalPrice += quantity * pricePerCoin;
        } else {
          acc[coin].quantity -= quantity;
          acc[coin].totalPrice -= quantity * pricePerCoin;
        }

        return acc;
      },
      {},
    );

    // Convert the aggregated data back into an array
    return Object.values(portfolio);
  }, [transactions]);

  return (
    <FlatList
      data={portfolioArray}
      keyExtractor={(item) => item.coin}
      ListHeaderComponent={
        <ChartsContainerView
          portfolioArray={portfolioArray}
          onGoToChartPress={onGoToChartPress}
        />
      }
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <TouchableRipple
          onPress={() => onCoinPress(item.coin)}
          rippleColor='rgba(0, 0, 0, .32)'
        >
          <Card
            style={[
              styles.card,
              {
                backgroundColor:
                  item.totalPrice > 0
                    ? colors.positiveCardBackground
                    : colors.negativeCardBackground,
              },
            ]}
          >
            <Card.Title
              title={item.coin}
              titleStyle={{
                color:
                  item.totalPrice > 0
                    ? colors.positiveCardText
                    : colors.negativeCardText,
                fontWeight: 'bold',
                fontSize: 18,
              }}
            />
            <Card.Content>
              <Text
                style={{
                  color:
                    item.totalPrice > 0
                      ? colors.positiveCardText
                      : colors.negativeCardText,
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>Quantity:</Text>{' '}
                {item.quantity.toFixed(2)}
              </Text>
              <Text
                style={{
                  color:
                    item.totalPrice > 0
                      ? colors.positiveCardText
                      : colors.negativeCardText,
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>Total Value:</Text> $
                {item.totalPrice.toFixed(2)}
              </Text>
            </Card.Content>
          </Card>
        </TouchableRipple>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
  },
});

export default ListOfCoins;
