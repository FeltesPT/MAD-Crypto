import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Button,
  InputAccessoryView,
  Keyboard,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { cryptocurrencies } from '../utils/utils';
import { useTransactions } from '../context/TransactionsContext';
import TypePicker from '../components/Transaction/TypePicker';

const AddTransactionScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const initialTransaction = route.params?.transaction;
  const initialCoin = route.params?.coin || route.params?.transaction.coin || '';
  const initialCoinValue =
    cryptocurrencies.find(
      (cryptocurrency) => cryptocurrency.label === initialCoin,
    )?.value || cryptocurrencies[0].value;

  const [selectedCoin, setSelectedCoin] = useState(initialCoinValue);
  const [quantity, setQuantity] = useState(initialTransaction?.quantity.toString() || '');
  const [pricePerCoin, setPricePerCoin] = useState(initialTransaction?.pricePerCoin.toString() || '');
  const [selectedType, setType] = useState(initialTransaction?.type || 'buy');

  const { addTransaction, editTransaction } = useTransactions();

  const handleAddTransaction = async () => {
    const quantityNum = parseFloat(quantity);
    const priceNum = parseFloat(pricePerCoin);

    const coin = cryptocurrencies.find(
      (cryptocurrency) => cryptocurrency.value === selectedCoin,
    );

    if (
      !coin ||
      !quantityNum ||
      quantityNum <= 0 ||
      !priceNum ||
      priceNum <= 0
    ) {
      Alert.alert(
        'Error',
        'Quantity and price per coin must be greater than 0.',
      );
      return;
    }

    const currentDate = new Date();

    // Format date as YYYY-MM-DD
    const formattedDate = currentDate.toISOString().split('T')[0];

    const newTransaction: Transaction = {
      id: initialTransaction.id || Date.now().toString(),
      coin: coin.label,
      type: selectedType as 'buy' | 'sell',
      quantity: quantityNum,
      pricePerCoin: priceNum,
      date: initialTransaction.date || formattedDate,
    };

    let response: TransactionResponse;
    if (initialTransaction) {
      response = await editTransaction(newTransaction);
    } else {
      response = await addTransaction(newTransaction);
    }

    if (response.statusCode === 200) {
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
          <Picker.Item
            key={crypto.value}
            label={crypto.label}
            value={crypto.value}
          />
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
      <TypePicker onTypeChange={(type) => setType(type)} selectedType={selectedType} />
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
