import {Button, ScrollView, Text, View} from 'react-native';
import dayjs from 'dayjs';
import {useNavi} from '../hooks/useNavi';
import React, {useEffect, useState} from 'react';
import LoadingScreen from './loading';
import {arr} from '../mok';

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavi();
  const today = dayjs().format('YYYY-MM-DD');

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <View style={{flex: 1}}>
      <View
        className="p-5 bg-black flex flex-row justify-between items-center"
        style={{flex: 1}}>
        <View className="bg-slate-300 rounded-full p-2">
          <Text className="text-black">awef</Text>
        </View>
        <View>
          <Text className="text-white">{'test user'}</Text>
        </View>
        <View>
          <Text className="text-white">{today}</Text>
        </View>
      </View>
      <View className="bg-black text-white" style={{flex: 9}}>
        <ScrollView>
          {arr.map(item => {
            return (
              <View>
                <Text className="text-white p-5">{item.title}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
