import { View, ScrollView } from 'react-native';
import React from 'react';
import UserInfo from '@/components/user-info';

const PeedList = () => {
  return (
    <View style={{ flex: 1 }}>
      <UserInfo />
      <View className="bg-black text-white" style={{ flex: 9 }}>
        <ScrollView />
      </View>
    </View>
  );
};

export default PeedList;
