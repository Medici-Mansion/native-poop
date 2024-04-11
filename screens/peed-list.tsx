import { View, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import UserInfo from '@/components/user-info';

const PeedList = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <UserInfo />
      <View className="bg-black text-white" style={{ flex: 9 }}>
        <ScrollView />
      </View>
    </SafeAreaView>
  );
};

export default PeedList;
