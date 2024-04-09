import { Picker } from '@react-native-picker/picker'
import React from 'react'

const TypePicker = ({selectedType, onTypeChange}) => {
  const transactionTypes = ['buy','sell']
  return (
    <Picker
        selectedValue={selectedType}
        onValueChange={(itemValue, itemIndex) => onTypeChange(itemValue)}
      >
        {transactionTypes.map((type) => (
          <Picker.Item
            key={type}
            label={type.charAt(0).toUpperCase() + type.slice(1)}
            value={type}
          />
        ))}
      </Picker>
  )
}

export default TypePicker