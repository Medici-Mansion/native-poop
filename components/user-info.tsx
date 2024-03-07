import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useNavi} from '@/hooks/useNavi';
import {GenderIcon, NotificationIcon} from '@/assets/icons';
import ImagePicker from 'react-native-image-crop-picker';

const UserInfo = () => {
  const [gender, setGender] = useState(true);
  const {navigation} = useNavi();

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
      style={{flex: 1}}>
      <View className=" lex flex-row items-center gap-3">
        <View className="rounded-full">
          <Image
            source={require('../assets/images/profile.png')}
            className="w-12 h-12"
          />
        </View>
        <View className="flex flex-row items-center justify-center">
          <Text className="text-white text-md">{'꼼데'}</Text>
          <GenderIcon gender={gender} />
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
