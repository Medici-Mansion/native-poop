import React, { PropsWithChildren, useContext } from 'react';
import { RadioContext } from './radio-button-group';
import { CheckBox } from '@rneui/themed';
import { PressableProps } from 'react-native';
import { AnimatedPressable } from '../animate-pressable';

export const RadioButton = ({
  value,
  label,
  disabled,
}: {
  value: string;
  label: string;
  disabled?: boolean;
}) => {
  const radioContext = useContext(RadioContext);

  if (!radioContext) throw new Error('Radiocontext must be declared');
  return (
    <CheckBox
      disabled={disabled}
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

interface RadioButtonItemProps extends PressableProps {
  value: unknown;
}

export const RadioButtonItem = ({
  children,
  value,
  ...props
}: PropsWithChildren<RadioButtonItemProps>) => {
  const radioContext = useContext(RadioContext);
  if (!radioContext) throw new Error('Radiocontext must be declared');

  return (
    <AnimatedPressable
      {...props}
      onPress={() => radioContext.setSelected(value)}
      onPressIn={event => {
        props.onPressIn && props.onPressIn(event);
      }}
      onPressOut={event => {
        props.onPressOut && props.onPressOut(event);
      }}>
      {children}
    </AnimatedPressable>
  );
};
