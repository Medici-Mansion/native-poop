import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  Text,
  View,
  StyleSheet,
  TextInput,
  Keyboard,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetView,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';

import {useBottomSheet} from '@/hooks/useBottomSheet';
import {useNavi} from '@/hooks/useNavi';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = () => {
  const [visible, setVisible] = useState(true);
  const {hideBottomSheet, ref, showBottomSheet, snapPoints} = useBottomSheet();

  const {navigation} = useNavi();
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

  return (
    <GestureHandlerRootView style={styles.container}>
      <Pressable onPress={() => Keyboard.dismiss()} style={styles.logoWrapper}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logoImage}
        />
      </Pressable>
      <View style={{flex: 6}} className="flex px-4 space-y-4">
        <Controller
          control={control}
          rules={{required: true}}
          name="id"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              className="text-white border border-[#1C1C1C] px-5 py-3 rounded-2xl bg-[#1C1C1C] text-[12px] mb-4"
              placeholder="아이디, 핸드폰 번호, 이메일"
              placeholderTextColor={'#5D5D5D'}
              onFocus={() => setVisible(false)}
              onBlur={() => {
                onBlur();
                setVisible(true);
              }}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          rules={{required: true}}
          name="password"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              className="text-white border border-[#1C1C1C] px-5 py-3 rounded-2xl bg-[#1C1C1C] text-[12px]"
              placeholder="비밀번호"
              onChangeText={onChange}
              placeholderTextColor={'#5D5D5D'}
              onFocus={() => setVisible(false)}
              onBlur={() => {
                onBlur();
                setVisible(true);
              }}
              value={value}
              secureTextEntry
            />
          )}
        />
        <Pressable>
          <View className="rounded-2xl bg-white py-4">
            <Text className="text-black text-center font-bold">로그인</Text>
          </View>
          <Text className="text-white text-center py-5 text-[12px] font-bold">
            비밀번호를 잊으셨나요?
          </Text>
        </Pressable>
      </View>
      {visible && (
        <Pressable onPress={showBottomSheet} className="px-4">
          <View className="flex flex-row justify-center border border-[#5D5D5D] rounded-2xl mb-5">
            <Text className="text-white font-bold py-4">회원가입</Text>
          </View>
        </Pressable>
      )}
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{backgroundColor: '#121212'}}
        handleIndicatorStyle={{backgroundColor: 'white'}}>
        <BottomSheetView>
          <View className="px-4">
            <View className="flex justify-center py-16">
              <Text className="text-white font-bold text-[18px]">
                풉을 시작하려면 동의가 필요해요
              </Text>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  logoWrapper: {
    flex: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    objectFit: 'contain',
    width: Dimensions.get('window').width * 0.25,
  },
});

export default LoginScreen;
