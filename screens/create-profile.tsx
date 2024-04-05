import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CloseIcon, PhotoIcon } from '@/assets/icons';

const CreateProfile = () => {
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 12,
      }}>
      <View
        className="flex flex-row justify-between items-center py-3"
        style={{ flex: 1 }}>
        <Pressable>
          <CloseIcon size={25} />
        </Pressable>
        <Text className="text-[16px] text-[#959595]">등록</Text>
      </View>
      <View className="flex items-center justify-center" style={{ flex: 2 }}>
        <Pressable className="p-10 rounded-full bg-[#1C1C1C]">
          <PhotoIcon />
        </Pressable>
      </View>
      <View className="flex flex-row justify-between" style={{ flex: 5 }}>
        <Pressable>
          <CloseIcon size={25} />
        </Pressable>
        <Text className="text-[16px] text-[#959595]">등록</Text>
      </View>
    </GestureHandlerRootView>
  );
};

export default CreateProfile;
