import {View, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import UserInfo from '@/components/user-info';
import Peed from '@/components/peed';

const PeedList = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <UserInfo />
      <View className="bg-black text-white" style={{flex: 9}}>
        <ScrollView></ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PeedList;
