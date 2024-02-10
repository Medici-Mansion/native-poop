import {View, Text, Pressable} from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import {useNavi} from '@/hooks/useNavi';

const UserInfo = () => {
  const today = dayjs().format('YYYY-MM-DD');
  const {navigation} = useNavi();

  return (
    <View
      className="px-5 bg-slate-800 flex flex-row justify-between items-center"
      style={{flex: 1}}>
      <View className="bg-slate-300 rounded-full p-2">
        <Text className="text-black">awef</Text>
      </View>
      <View>
        <Text className="text-white">{'test user'}</Text>
      </View>
      <View>
        <Pressable
          onPress={() =>
            navigation.navigate('UserDetail', {
              id: 1,
              title: 'asdf',
            })
          }>
          <Text className="text-white">{today}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UserInfo;
