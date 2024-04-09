import React, { useContext } from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';

import { getCryptoColor } from '../../utils/utils';
import { ThemeContext } from '../../context/ThemeContext';

const PortfolioChart: React.FC<{ portfolioArray: any[] }> = ({
  portfolioArray,
}) => {
  const { colors } = useContext(ThemeContext);
  const data = portfolioArray.map((item) => ({
    name: item.coin,
    quantity: item.quantity,
    color: getCryptoColor(item.coin),
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
    label: item.coin,
  }));

  const totalValue = portfolioArray.reduce(
    (acc, item) => acc + item.totalPrice,
    0,
  );

  return (
    <Card
      style={{
        backgroundColor: colors.positiveCardBackground,
        borderColor: colors.header,
        borderWidth: 1,
        marginBottom: 10,
      }}
    >
      <Card.Content>
        <Title style={{ color: colors.text }}>Portfolio Overview</Title>
        <Paragraph style={{ color: colors.text }}>
          Total Value: ${totalValue.toFixed(2)}
        </Paragraph>
        {data.length > 0 ? ( // Ensure data is checked for length before rendering PieChart
          <PieChart
            data={data}
            width={340}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor='quantity'
            backgroundColor='transparent'
            paddingLeft='15'
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
