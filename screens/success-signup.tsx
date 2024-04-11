import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useUserStore } from '@/store/user-store';
import { useNavi } from '@/hooks/useNavi';

const SuccessSignup = () => {
  const { navigation } = useNavi();
  const { login } = useUserStore();
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View
        className="flex items-center justify-center gap-y-3"
        style={{ flex: 4 }}>
        <Text className="text-white font-bold text-[24px]">
          풉에 오신걸 환영해요!
        </Text>
        <Text className="text-white font-bold text-[24px]">
          반려견 프로필을 완성해보세요
        </Text>
        <Text className="text-[#959595] text-sm">
          반려견이 없다면 '나중에'를 클릭해주세요.
        </Text>
      </View>
      <View style={{ flex: 6 }} className="flex flex-col justify-end py-6">
        <View className="px-4">
          <View className="flex justify-center gap-y-2">
            <Pressable
              className="bg-white py-4 flex items-center justify-center rounded-2xl"
              onPress={() => navigation.push('CreateProfile')}>
              <Text className="text-black font-bold">반려견 프로필 만들기</Text>
            </Pressable>
            <Pressable onPress={login}>
              <Text className="text-[#959595] text-center">나중에</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SuccessSignup;
