import { cn } from '@/lib/utils';
import React from 'react';
import { Text, View, ViewProps } from 'react-native';

interface NumberBoxProps extends ViewProps {
  pressed?: boolean;
  number?: string;
}
const NumberBox = ({ number, pressed, ...viewProps }: NumberBoxProps) => {
  return (
    <View
      {...viewProps}
      className={cn(
        'w-5 h-5 border-2 border-white rounded-full',
        'items-center justify-center',
        pressed ? 'bg-white' : 'bg-white/40',
      )}>
      {pressed && number ? <Text>{number}</Text> : null}
    </View>
  );
};

export default NumberBox;
