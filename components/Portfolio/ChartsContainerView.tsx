import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import PortfolioChart from './PortfolioChart';

const ChartsContainerView: React.FC<{
  portfolioArray: PortfolioItem[];
  onGoToChartPress: () => void;
}> = ({ portfolioArray, onGoToChartPress }) => {
  return (
    <View>
      <Button onPress={onGoToChartPress} title='View Line Chart' />
      <PortfolioChart portfolioArray={portfolioArray} />
    </View>
  );
};

export default ChartsContainerView;
