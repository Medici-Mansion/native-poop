import { Text, Pressable } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const SelectBreeds = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'black' }}>
      <Pressable>
        <Text className="text-white">awef</Text>
      </Pressable>
    </GestureHandlerRootView>
  );
};

export default SelectBreeds;
