import {View, Text} from 'react-native';
import React from 'react';

interface PeedProps {
  id: number;
  title: string;
}

const Peed = ({id, title}: PeedProps) => {
  return (
    <View className="p-5 space-y-3">
      <Text className="text-white">{id}</Text>
      <Text className="text-white">{title}</Text>
    </View>
  );
};

export default Peed;
