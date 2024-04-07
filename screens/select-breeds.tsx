import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useNavi } from '@/hooks/useNavi';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const SelectBreeds = () => {
  const { navigation } = useNavi();
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'black' }}>
      <Pressable>
        <Text className="text-white">awef</Text>
      </Pressable>
    </GestureHandlerRootView>
  );
};

export default SelectBreeds;
