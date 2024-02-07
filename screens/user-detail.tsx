import {View, Text, Pressable} from 'react-native';
import React from 'react';
import WrapperView from '@/components/wrapper-view';
import {useNavi} from '@/hooks/useNavi';

const UserDetail = () => {
  const navigation = useNavi();
  return (
    <WrapperView>
      <View>
        <Pressable onPress={() => navigation.goBack()}>
          <Text>UserDetail</Text>
        </Pressable>
      </View>
    </WrapperView>
  );
};

export default UserDetail;
