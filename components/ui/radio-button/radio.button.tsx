import React, { useContext } from 'react';
import { RadioContext } from './radio-button-group';
import { CheckBox } from '@rneui/themed';

export const RadioButton = ({
  value,
  label,
}: {
  value: string;
  label: string;
}) => {
  const radioContext = useContext(RadioContext);

  if (!radioContext) throw new Error('Radioㅊontext must be declared');
  return (
    <CheckBox
      checked={radioContext.selected === value}
      onPress={() => radioContext.setSelected(value)}
      iconType="material-community"
      checkedIcon="radiobox-marked"
      uncheckedIcon="radiobox-blank"
      checkedColor="#5D5D5D"
      title={label}
      containerStyle={{ backgroundColor: 'black' }}
    />
  );
};
