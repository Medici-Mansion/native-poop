import {View, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import UserInfo from '@/components/user-info';
import {arr} from '../mok';
import Peed from '@/components/peed';
import useHealth from '@/hooks/useHealth';

const PeedList = () => {
  const {data} = useHealth();

  console.log(data);
  return (
    <SafeAreaView style={{flex: 1}}>
      <UserInfo />
      <View className="bg-black text-white" style={{flex: 9}}>
        <ScrollView>
          {arr.map((item: any) => {
            return (
              <View key={item.id}>
                <Peed id={item.id} title={item.title} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PeedList;
