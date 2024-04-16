import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useNavi } from '@/hooks/useNavi';
import { GenderIcon, NotificationIcon } from '@/assets/icons';
import ImagePicker from 'react-native-image-crop-picker';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/apis';

const UserInfo = () => {
  const { navigation } = useNavi();

  const { data } = useQuery({
    queryKey: ['profile', 'latest'],
    queryFn: api.getLatestProfile,
    select(response) {
      return response.data;
    },
  });

  const openPicker = () => {
    ImagePicker.openPicker({
      multiple: true,
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  return (
    <View
      className="flex flex-row bg-black justify-between px-5 py-5"
      style={{ flex: 1 }}>
      {data ? (
        <View className=" lex flex-row items-center gap-3">
          {data?.avatarUrl && (
            <View className="rounded-full overflow-hidden">
              <Image source={{ uri: data.avatarUrl }} className="w-12 h-12" />
            </View>
          )}
          <View className="flex flex-row items-center justify-center">
            <Text className="text-white text-md">{data?.name}</Text>
            <GenderIcon gender={data.gender} />
          </View>
          <Pressable
            onPress={() =>
              navigation.navigate('UserDetail', {
                id: 1,
                title: 'asdf',
              })
            }>
            <Text style={styles.follow}>팔로우</Text>
          </Pressable>
        </View>
      ) : null}
      <Pressable
        className="bg-black flex items-center justify-center"
        onPress={() => openPicker()}>
        <NotificationIcon />
      </Pressable>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  follow: {
    borderWidth: 1,
    borderColor: 'gray',
    color: 'gray',
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 12,
  },
});
