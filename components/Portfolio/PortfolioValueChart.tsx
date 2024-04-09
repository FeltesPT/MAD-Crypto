import React, { useMemo } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTransactions } from '../../context/TransactionsContext';

const horizontalPadding = 32;
const adjustedScreenWidth = Dimensions.get('window').width - horizontalPadding;

const PortfolioValueChart = () => {
  const { transactions } = useTransactions();

  const chartData = useMemo(() => {
    // Aggregate transactions by date
    const aggregatedByDate = transactions.reduce((acc, curr) => {
      const date = curr.date;
      const value = curr.type === 'buy' ? curr.quantity * curr.pricePerCoin : -curr.quantity * curr.pricePerCoin;
      acc[date] = (acc[date] || 0) + value;
      return acc;
    }, {});

    // Sort dates and calculate cumulative values
    const datesSorted = Object.keys(aggregatedByDate).sort();
    let cumulativeValue = 0;
    const values = datesSorted.map(date => {
      cumulativeValue += aggregatedByDate[date];
      return cumulativeValue;
    });
    
    // Prepare data for the chart
    return {
      labels: datesSorted,
      datasets: [
        {
          data: values,
        },
      ],
    };
  }, [transactions]);

  if (!chartData.datasets[0].data  || chartData.datasets[0].data.length === 0) {
    return <View />;
  }
  
  return (
    <View style={styles.chartContainer}>
      <LineChart
        data={chartData}
        width={adjustedScreenWidth}
        height={220}
        yAxisLabel="$"
        yAxisInterval={1000}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    marginVertical: 8,
    borderRadius: 16,
  },
})

export default PortfolioValueChart;
