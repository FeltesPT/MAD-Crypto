import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const horizontalPadding = 16;
const adjustedScreenWidth = Dimensions.get('window').width - horizontalPadding;

const PortfolioValueChart = ({ chartData }: { chartData: ChartData }) => {
  return (
    <View style={styles.chartContainer}>
      <LineChart
        data={chartData}
        width={adjustedScreenWidth}
        height={220}
        yAxisSuffix='k'
        yAxisLabel='$'
        yAxisInterval={1000}
        yLabelsOffset={0}
        xLabelsOffset={5}
        chartConfig={{
          backgroundColor: '#312C51',
          backgroundGradientFrom: '#312C51',
          backgroundGradientTo: '#48426D',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: "2",
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
  },
});

export default PortfolioValueChart;
