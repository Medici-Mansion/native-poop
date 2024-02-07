import {Pressable, Text, TextInput, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React from 'react';

const LoginScreen = () => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flex: 1, justifyContent: 'center'}}
      className="bg-rose-500">
      <View className="flex-1 justify-center p-3">
        <Pressable className="flex space-y-3 bg-blue-400">
          <Text>123</Text>
          <Text>123</Text>
          <Text>123</Text>
          <Text>123</Text>
          <Text>123</Text>
        </Pressable>
      </View>
      <View className="flex-1 p-3 space-y-2">
        <Text className="px-5">Id</Text>
        <TextInput
          placeholder="text input id"
          className="p-2 border rounded-full bg-slate-200"
        />
        <Text className="px-5">Password</Text>
        <TextInput
          placeholder="text input id"
          className="p-2 border rounded-full bg-slate-200"
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
