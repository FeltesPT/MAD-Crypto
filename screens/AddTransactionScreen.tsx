import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  InputAccessoryView,
  Keyboard,
  Text,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Menu, PaperProvider, TextInput, Button } from 'react-native-paper';
import { cryptocurrencies } from '../utils/utils';
import { useTransactions } from '../context/TransactionsContext';
import TypePicker from '../components/Transaction/TypePicker';

import { ThemeContext } from '../context/ThemeContext';

const AddTransactionScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const { colors } = useContext(ThemeContext);

  const initialTransaction: Transaction | undefined = route.params?.transaction;
  const initialCoin =
    route.params?.coin || route.params?.transaction.coin || '';
  const initialCoinValue =
    cryptocurrencies.find(
      (cryptocurrency) => cryptocurrency.label === initialCoin,
    )?.value || cryptocurrencies[0].value;

  const [showMenu, setShowMenu] = useState(false);

  const [selectedCoin, setSelectedCoin] = useState(initialCoinValue);
  const [quantity, setQuantity] = useState(
    initialTransaction?.quantity.toString() || '',
  );
  const [pricePerCoin, setPricePerCoin] = useState(
    initialTransaction?.pricePerCoin.toString() || '',
  );
  const [selectedType, setType] = useState(initialTransaction?.type || 'buy');

  const { addTransaction, editTransaction } = useTransactions();

  useEffect(() => {
    navigation.setOptions({
      title: initialTransaction ? 'Edit Transaction' : 'Add Transaction',
      headerStyle: {
        backgroundColor: colors.secondaryHeader,
      },
      headerTintColor: colors.text,
    });
  }, [navigation]);

  const handleAddTransaction = async () => {
    console.log(quantity, pricePerCoin);
    const quantityNum = parseFloat(quantity);
    const priceNum = parseFloat(pricePerCoin);

    const coin = cryptocurrencies.find(
      (cryptocurrency) => cryptocurrency.value === selectedCoin,
    );

    console.log(quantityNum, priceNum, coin, selectedType);

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
      id: initialTransaction?.id || Date.now().toString(),
      coin: coin.label,
      type: selectedType as 'buy' | 'sell',
      quantity: quantityNum,
      pricePerCoin: priceNum,
      date: initialTransaction?.date || formattedDate,
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
    <View style={[styles.main, { backgroundColor: colors.background }]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingHorizontal: 20,
          marginTop: 20,
        }}
      >
        <Button mode='contained' buttonColor={colors.buttonBackground} textColor={colors.buttonText} onPress={handleAddTransaction}>Save</Button>
      </View>
      <View style={styles.container}>
        <TextInput
          label='Quantity'
          value={quantity}
          onChangeText={setQuantity}
          keyboardType='numeric'
          inputAccessoryViewID={inputAccessoryViewID}
        />
        <TextInput
          label='Price Per Coin'
          value={pricePerCoin}
          onChangeText={setPricePerCoin}
          keyboardType='numeric'
          inputAccessoryViewID={inputAccessoryViewID}
        />

        {Platform.OS === 'ios' && <InputAccessoryView nativeID={inputAccessoryViewID}>
          <View style={styles.accessoryView}>
            <Button onPress={() => Keyboard.dismiss()}>Done</Button>
          </View>
        </InputAccessoryView>}
        <View style={styles.pickerContainer}>
          <PaperProvider>
            <TouchableOpacity
              onPress={() => setShowMenu(true)}
              style={{
                width: '100%',
                height: 50,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.secondaryHeader,
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: 'bold', color: colors.text }}
              >
                {selectedCoin}
              </Text>
            </TouchableOpacity>
            <Menu
              visible={showMenu}
              onDismiss={() => setShowMenu(false)}
              anchor={{
                x: 0,
                y: 0,
              }}
            >
              {cryptocurrencies.map((crypto) => (
                <Menu.Item
                  key={crypto.value}
                  title={crypto.label}
                  onPress={() => {
                    setSelectedCoin(crypto.value);
                    setShowMenu(false);
                  }}
                />
              ))}
            </Menu>
          </PaperProvider>
          <View style={styles.pickerView}>
            <Text style={[styles.pickerLabel, { color: colors.text }]}>
              Sell
            </Text>
            <TypePicker
              onTypeChange={(type) => setType(type)}
              selectedType={selectedType}
            />
            <Text style={[styles.pickerLabel, { color: colors.text }]}>
              Buy
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    gap: 20,
  },
  pickerView: {
    flexDirection: 'row',
    paddingTop: 10,
    alignItems: 'center',
    gap: 10,
  },
  pickerLabel: {
    fontSize: 20,
    fontWeight: 'bold',
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
