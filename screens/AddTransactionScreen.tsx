import React, { useState } from 'react';
import { View, StyleSheet, Button, InputAccessoryView, Keyboard, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { cryptocurrencies } from '../utils/utils';
import { useTransactions } from '../context/TransactionsContext';

const AddTransactionScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const initialCoin = route.params?.coin;
  const initialCoinValue = cryptocurrencies.find((cryptocurrency) => cryptocurrency.label === initialCoin)?.value || cryptocurrencies[0].value;

  const [selectedCoin, setSelectedCoin] = useState(initialCoinValue);
  const [quantity, setQuantity] = useState('');
  const [pricePerCoin, setPricePerCoin] = useState('');

  const { addTransaction } = useTransactions();

  const handleAddTransaction = async () => {
    const quantityNum = parseFloat(quantity);
    const priceNum = parseFloat(pricePerCoin);

    if (!quantityNum || quantityNum <= 0 || !priceNum || priceNum <= 0) {
      Alert.alert('Error', 'Quantity and price per coin must be greater than 0.');
      return;
    }

    const currentDate = new Date();

    // Format date as YYYY-MM-DD
    const formattedDate = currentDate.toISOString().split('T')[0];

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      coin: cryptocurrencies.find((cryptocurrency) => cryptocurrency.label === initialCoin).label,
      type: 'buy',
      quantity: parseFloat(quantity),
      pricePerCoin: parseFloat(pricePerCoin),
      date: formattedDate,
    };
  
    const response = await addTransaction(newTransaction); 

    if (response.statusCode=== 200) {
      return navigation.goBack();
    }

    Alert.alert('Error', 'Transaction failed to add.');

  };

  const inputAccessoryViewID = 'accessoryViewId';

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedCoin}
        onValueChange={(itemValue, itemIndex) => setSelectedCoin(itemValue)}
      >
        {cryptocurrencies.map((crypto) => (
          <Picker.Item key={crypto.value} label={crypto.label} value={crypto.value} />
        ))}
      </Picker>
      <PaperTextInput
        label='Quantity'
        value={quantity}
        onChangeText={setQuantity}
        keyboardType='numeric'
        inputAccessoryViewID={inputAccessoryViewID}
      />
      <PaperTextInput
        label='Price Per Coin'
        value={pricePerCoin}
        onChangeText={setPricePerCoin}
        keyboardType='numeric'
        inputAccessoryViewID={inputAccessoryViewID}
      />
      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <View style={styles.accessoryView}>
          <Button onPress={() => Keyboard.dismiss()} title='Done' />
        </View>
      </InputAccessoryView>
      <Button title='Add Transaction' onPress={handleAddTransaction} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  accessoryView: {
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 30,
  },
});

export default AddTransactionScreen;
