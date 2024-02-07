import React from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm, Controller} from 'react-hook-form';

import {useUserStore} from '@/store/user-store';
import {useNavi} from '@/hooks/useNavi';

const SignUpScreen = () => {
  const {login, logout} = useUserStore();
  const navigation = useNavi();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const onSubmit = (data: {id: string; password: string}) => {
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#191919',
      }}>
      <View className="justify-center" style={{flex: 3}}>
        <Pressable className="flex space-y-3 justify-center items-center">
          <Text className="text-white">디자인 필요</Text>
        </Pressable>
      </View>
      <View className="p-5" style={{flex: 4}}>
        <View className="space-y-2">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="아이디"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="p-2 border rounded-md bg-black text-white"
                placeholderTextColor={'gray'}
                selectionColor={'white'}
              />
            )}
            name="id"
          />
          {errors.id && <Text className="text-white">This is required.</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="비밀번호"
                className="p-2 mt-2 border rounded-md bg-black text-white"
                placeholderTextColor={'gray'}
                selectionColor={'white'}
                secureTextEntry
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text className="text-white">This is required.</Text>
          )}
        </View>
        <View className="space-y-2 mt-5">
          <Pressable
            className="bg-white rounded-md py-4 flex items-center"
            onPress={handleSubmit(onSubmit)}>
            <Text>가입하기</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;
