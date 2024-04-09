import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';

import { getRandomColor } from '../../utils/utils';

const PortfolioChart: React.FC<{ portfolioArray: any[] }> = ({ portfolioArray }) => {
  // Prepare the data for the PieChart based on the portfolioArray prop
  const data = portfolioArray.map(item => ({
    name: item.coin,
    quantity: item.quantity,
    color: getRandomColor(),
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
    label: item.coin,
  }));

  const totalValue = portfolioArray.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <Card>
      <Card.Content>
        <Title>Portfolio Overview</Title>
        <Paragraph>Total Value: ${totalValue.toFixed(2)}</Paragraph>
        {data.length > 0 ? ( // Ensure data is checked for length before rendering PieChart
          <PieChart
            data={data}
            width={340}
            height={220}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="quantity"
            backgroundColor="transparent"
            paddingLeft="15"
            center={[0, 0]}
            absolute={false}
          />
        ) : (
          <Paragraph>Loading chart...</Paragraph> // Provide a loading state or placeholder
        )}
      </Card.Content>
    </Card>
  );
};

export default PortfolioChart;
