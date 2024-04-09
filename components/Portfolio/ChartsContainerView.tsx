import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import PortfolioChart from './PortfolioChart';

import { ThemeContext } from '../../context/ThemeContext';
import { colors } from '../../utils/theme';

const ChartsContainerView: React.FC<{
  portfolioArray: PortfolioItem[];
  onGoToChartPress: () => void;
}> = ({ portfolioArray, onGoToChartPress }) => {
  const { colors } = useContext(ThemeContext);

  return (
    <View>
      <PortfolioChart portfolioArray={portfolioArray} />
      <View style={styles.button}>
        <Button color={colors.text} onPress={onGoToChartPress} title='View Line Chart' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: colors.primary,
    borderRadius: 12,
  }
})

export default ChartsContainerView;
