import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import React from 'react';

import { useNavi } from '@/hooks/useNavi';

import WrapperView from '@/components/wrapper-view';

const UserDetail = () => {
  const { navigation } = useNavi();

  return (
    <WrapperView cn="bg-[#191919]">
      <Pressable style={{ flex: 1 }} onPress={() => navigation.goBack()}>
        <View className="flex items-center justify-center">
          <Image
            source={require('../assets/images/launch_screen.png')}
            className="w-full h-full"
          />
        </View>
      </Pressable>
      <View style={{ flex: 2 }}>
        <ScrollView className="flex bg-slate-900 space-y-5">
          <View>
            <Text className="text-white">123</Text>
          </View>
          <View>
            <Text className="text-white">123</Text>
          </View>
          <View>
            <Text className="text-white">123</Text>
          </View>
          <View>
            <Text className="text-white">123</Text>
          </View>
          <View>
            <Text className="text-white">123</Text>
          </View>
          <View>
            <Text className="text-white">123</Text>
          </View>
          <View>
            <Text className="text-white">123</Text>
          </View>
          <View>
            <Text className="text-white">123</Text>
          </View>
          <View>
            <Text className="text-white">123</Text>
          </View>
          <View>
            <Text className="text-white">123</Text>
          </View>
          <View>
            <Text className="text-white">123</Text>
          </View>
          <View>
            <Text className="text-white">123</Text>
          </View>
          <View>
            <Text className="text-white">123</Text>
          </View>
          <View>
            <Text className="text-white">123</Text>
          </View>
          <View>
            <Text className="text-white">12313513513</Text>
          </View>
        </ScrollView>
      </View>
    </WrapperView>
  );
};

export default UserDetail;
