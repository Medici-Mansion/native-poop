import { useContext } from 'react';
import { RadioContext } from './radio-button-group';
import { Text, View } from 'react-native';

export const RadioButton = () => {
  const radioContext = useContext(RadioContext);

  if (!radioContext) throw new Error('Radioㅊontext must be declared');
  return (
    <View>
      <Text style={{ color: 'white' }} />
    </View>
  );
};
