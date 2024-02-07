import React from 'react';
import {View} from 'react-native';

interface WrapperViewProps {
  children: React.ReactNode;
  cn?: string;
}

const WrapperView = ({children, cn}: WrapperViewProps) => {
  return (
    <View style={{flex: 1}} className={cn}>
      {children}
    </View>
  );
};

export default WrapperView;
