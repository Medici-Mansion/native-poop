import { View, Text } from 'react-native';
import React from 'react';

interface PeedProps {
  id: number;
  title: string;
}

const Peed = ({ id, title }: PeedProps) => {
  return (
    <View className="border border-white items-center pb-2 m-5 py-20">
      <Text className="text-white">{id}</Text>
      <Text className="text-white">{title}</Text>
    </View>
  );
};

export default Peed;
