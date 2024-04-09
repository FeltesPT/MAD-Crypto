import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { subDays, subMonths, subYears, isWithinInterval } from 'date-fns';

import PortfolioValueChart from '../components/Portfolio/PortfolioValueChart';
import { useTransactions } from '../context/TransactionsContext';

const ChartScreen = () => {
  const { transactions } = useTransactions();

  const dateFilters = [
    { label: 'One Week', value: 'week' },
    { label: 'One Month', value: 'month' },
    { label: 'Three Months', value: '3months' },
    { label: 'Six Months', value: '6months' },
    { label: 'Nine Months', value: '9months' },
    { label: 'One year', value: '1year' },
  ];

  const [selectedFilter, setSelectedFilter] = useState('6months');

  const filterData = (data, filter) => {
    let filteredData = { labels: [], datasets: [{ data: [] }] };

    switch (filter) {
      case 'week':
        filteredData.labels = data.labels.filter((date) =>
          isWithinInterval(date, {
            start: subDays(new Date(), 7),
            end: new Date(),
          }),
        );
        filteredData.datasets[0].data = data.datasets[0].data.filter((_, i) =>
          filteredData.labels.includes(data.labels[i]),
        );
        break;
      case 'month':
        filteredData.labels = data.labels.filter((date) =>
          isWithinInterval(date, {
            start: subMonths(new Date(), 1),
            end: new Date(),
          }),
        );
        filteredData.datasets[0].data = data.datasets[0].data.filter((_, i) =>
          filteredData.labels.includes(data.labels[i]),
        );
        break;
      case '3months':
        filteredData.labels = data.labels.filter((date) =>
          isWithinInterval(date, {
            start: subMonths(new Date(), 3),
            end: new Date(),
          }),
        );
        filteredData.datasets[0].data = data.datasets[0].data.filter((_, i) =>
          filteredData.labels.includes(data.labels[i]),
        );
        break;
      case '6months':
        filteredData.labels = data.labels.filter((date) =>
          isWithinInterval(date, {
            start: subMonths(new Date(), 6),
            end: new Date(),
          }),
        );
        filteredData.datasets[0].data = data.datasets[0].data.filter((_, i) =>
          filteredData.labels.includes(data.labels[i]),
        );
        break;
      case '9months':
        filteredData.labels = data.labels.filter((date) =>
          isWithinInterval(date, {
            start: subMonths(new Date(), 6),
            end: new Date(),
          }),
        );
        filteredData.datasets[0].data = data.datasets[0].data.filter((_, i) =>
          filteredData.labels.includes(data.labels[i]),
        );
        break;
      case '1year':
        filteredData.labels = data.labels.filter((date) =>
          isWithinInterval(date, {
            start: subYears(new Date(), 1),
            end: new Date(),
          }),
        );
        filteredData.datasets[0].data = data.datasets[0].data.filter((_, i) =>
          filteredData.labels.includes(data.labels[i]),
        );
        break;
    }

    return filteredData;
  };

  const chartData: ChartData = useMemo(() => {
    // Aggregate transactions by date
    const aggregatedByDate = transactions.reduce((acc, curr) => {
      const date = curr.date;
      const value =
        (curr.type === 'buy'
          ? curr.quantity * curr.pricePerCoin
          : -curr.quantity * curr.pricePerCoin) / 1000;
      acc[date] = (acc[date] || 0) + value;
      return acc;
    }, {});

    // Sort dates and calculate cumulative values
    const datesSorted = Object.keys(aggregatedByDate).sort();
    let cumulativeValue = 0;
    const values = datesSorted.map((date) => {
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

  const filteredData = useMemo(() => {
    return filterData(chartData, selectedFilter);
  }, [chartData, selectedFilter]);
  
  return (
    <View style={styles.view}>
      <Picker
        selectedValue={selectedFilter}
        onValueChange={(itemValue) => setSelectedFilter(itemValue)}
      >
        {dateFilters.map((filter) => (
          <Picker.Item
            key={filter.value}
            label={filter.label}
            value={filter.value}
          />
        ))}
      </Picker>
      <View style={styles.chartContainer}> 
      {filteredData.datasets[0].data &&
      filteredData.datasets[0].data.length > 0 ? (
        <PortfolioValueChart chartData={filteredData} />
      ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 8,
  },
  chartContainer: {
    height: 230,
    backgroundColor: 'black',
    borderRadius: 16,
    overflow: 'hidden',
  }
});

export default ChartScreen;
