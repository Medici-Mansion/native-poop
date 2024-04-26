import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  Text,
  View,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import { useBottomSheet } from '@/hooks/useBottomSheet';
import { useNavi } from '@/hooks/useNavi';
import useLogin from '@/hooks/user/use-login';

import { TERMS, Token } from '../const';
import { CheckIcon, RightArrow } from '../assets/icons';
import { Button, Input } from '@/components/ui';
import { Field, Form, FormInstance } from 'houseform';
import { z } from 'zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@/apis';
import { useQueryClient } from '@tanstack/react-query';
import { useSafeAreaStyle } from '@/hooks/useSafeAreaStyle';
import { useRefs } from '@/hooks/useRefs';
import { AnimatedPressable } from '@/components/ui/animate-pressable';

const LoginScreen = () => {
  const insets = useSafeAreaStyle();
  const { idRef, passwordRef } = useRefs(['id', 'password']);
  const { mutateAsync, isPending } = useLogin();
  const { hideBottomSheet, ref, showBottomSheet, snapPoints } =
    useBottomSheet('50%');
  const queryClient = useQueryClient();

  const { navigation } = useNavi();
  const onSubmit = async (
    data: { id: string; password: string },
    form: FormInstance<{ id: string; password: string }>,
  ) => {
    Keyboard.dismiss();
    form.recomputeErrors();

    await mutateAsync(data, {
      async onSuccess({ accessToken }) {
        await Promise.allSettled([
          AsyncStorage.setItem(Token.ACT, accessToken),
        ]);
        api.injectInterceptor({ accessToken });

        const response = await api.getMyProfileList();

        /**
         * @description 생성한 프로필이 하나도 없을 경우
         */

        if (!response.data.length) {
          return navigation.replace('CreateProfile');
        }

        queryClient.setQueryData(['profiles'], response.data, {
          updatedAt: new Date().getTime(),
        });

        /**
         * @TODO
         * @description 프로필 목록이 존재할 경우
         */
        queryClient.invalidateQueries({
          queryKey: ['check', 'login'],
          refetchType: 'all',
        });
        return;
      },
      onError({ response, isAxiosError }) {
        if (isAxiosError) {
          /**
           * @TODO 서버에서 커스텀 에러타입 제작 후 변경
           * @description 프로필 목록이 존재할 경우
           */
          response?.data?.error?.message &&
            form
              .getFieldValue('id')
              ?.setErrors([response?.data?.error?.message]);
        }
      },
    });
  };
  return (
    <GestureHandlerRootView style={[styles.container, insets]}>
      <Pressable onPress={() => Keyboard.dismiss()} style={styles.logoWrapper}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logoImage}
        />
      </Pressable>
      <View style={{ flex: 6 }} className="flex px-4 space-y-4">
        <Form onSubmit={onSubmit}>
          {({ submit }) => (
            <View className="space-y-4">
              <View>
                <Field
                  name="id"
                  onSubmitValidate={z
                    .string()
                    .min(6, { message: '아이디 6자 이상' })}>
                  {({ onBlur, value, setValue, errors }) => (
                    <Input
                      ref={idRef}
                      autoComplete="off"
                      autoCapitalize="none"
                      returnKeyType="next"
                      onBlur={onBlur}
                      placeholder="아이디, 핸드폰 번호, 이메일"
                      placeholderTextColor={'#5D5D5D'}
                      onChangeText={setValue}
                      value={value}
                      error={errors[0]}
                      onSubmitEditing={() => {
                        passwordRef?.current?.focus();
                      }}
                    />
                  )}
                </Field>
              </View>
              <View>
                <Field
                  name="password"
                  onSubmitValidate={z
                    .string()
                    .min(1, { message: '비밀번호 필수' })}>
                  {({ onBlur, value, setValue, errors }) => (
                    <Input
                      ref={passwordRef}
                      placeholder="비밀번호"
                      onBlur={onBlur}
                      onChangeText={setValue}
                      placeholderTextColor={'#5D5D5D'}
                      value={value}
                      secureTextEntry
                      error={errors[0]}
                      onSubmitEditing={submit}
                      returnKeyType="join"
                    />
                  )}
                </Field>
              </View>

              <Button disabled={isPending} label="로그인" onPress={submit} />
            </View>
          )}
        </Form>
        <Text className="text-white text-center py-5 text-[12px] font-bold">
          비밀번호를 잊으셨나요?
        </Text>
      </View>
      <AnimatedPressable
        disabled={isPending}
        onPress={showBottomSheet}
        className="px-4">
        <View className="flex flex-row justify-center border border-[#5D5D5D] rounded-2xl mb-5">
          <Text className="text-white font-bold py-4">회원가입</Text>
        </View>
      </AnimatedPressable>

      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: '#121212' }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}>
        <BottomSheetView>
          <View className="px-4 space-y-2 flex flex-col justify-evenly h-full">
            <View className="flex justify-center py-6 ">
              <Text className="text-white font-bold text-[18px]">
                풉을 시작하려면 동의가 필요해요
              </Text>
            </View>
            <View className="space-y-6">
              {TERMS.map(item => {
                return (
                  <View
                    className="pt-2 flex flex-row justify-between items-center"
                    key={item.id}>
                    <View className="flex flex-row items-center">
                      <CheckIcon />
                      <Text className="text-white ml-2 text-[12px]">
                        {item.title}
                      </Text>
                    </View>
                    <Pressable className="pr-2">
                      <RightArrow />
                    </Pressable>
                  </View>
                );
              })}
            </View>
            <View className="pb-3">
              <Pressable
                className="bg-white py-3 rounded-2xl flex items-center justify-center"
                onPress={() => {
                  navigation.navigate('SignUp');
                  hideBottomSheet();
                }}>
                <Text className="text-black font-bold text-center">
                  동의하고 계속
                </Text>
              </Pressable>
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
