import React from 'react'
import { Picker } from '@react-native-picker/picker'
import { Switch } from 'react-native-paper'

const TypePicker = ({selectedType, onTypeChange}) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(selectedType === 'buy')
  return (
    <Switch value={isSwitchOn} onValueChange={() => {
      setIsSwitchOn(!isSwitchOn)
      onTypeChange(!isSwitchOn? 'buy' :'sell')
    }} />
  )
}

export default TypePicker