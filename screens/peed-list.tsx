import { View, ScrollView, StatusBar } from 'react-native';
import React from 'react';
import UserInfo from '@/components/user-info';
import { useSafeAreaStyle } from '@/hooks/useSafeAreaStyle';

const PeedList = () => {
  const { paddingTop, paddingBottom } = useSafeAreaStyle();
  return (
    <View style={{ flex: 1, paddingTop, paddingBottom }} className="bg-black">
      <StatusBar animated barStyle="light-content" />
      <UserInfo />
      <View className=" text-white" style={{ flex: 9 }}>
        <ScrollView />
      </View>
    </View>
  );
};

export default PeedList;
