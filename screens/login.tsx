import {Text, TextInput, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React from 'react';

const LoginScreen = () => {
  return (
    <KeyboardAwareScrollView className="flex flex-col" style={{flex: 1}}>
      <View className="flex flex-col bg-rose-500">
        <View className="p-3 space-y-2">
          <Text className="px-5">Id</Text>
          <TextInput
            placeholder="text input id"
            className="p-2 border rounded-full bg-slate-200"
          />
        </View>
        <View className="p-3 space-y-2 ">
          <Text className="px-5">Password</Text>
          <TextInput
            placeholder="text input id"
            className="p-2 border rounded-full bg-slate-200"
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
