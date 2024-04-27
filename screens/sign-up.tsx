import { z } from 'zod';
import { View, Text, Pressable, Keyboard } from 'react-native';
import React, {
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Field, Form } from 'houseform';
import DatePicker from 'react-native-date-picker';
import { Portal } from 'react-native-portalize';
import dayjs from 'dayjs';

import { SignupFormList } from '@/const';
import { SignupParam, Verify } from '@/types';

import { useNavi } from '@/hooks/useNavi';
import useSignup from '@/hooks/user/use-signup';
import useGetVerifyCode from '@/hooks/user/use-get-verify-code';
import useVerify from '@/hooks/user/use-verify';
import { Input, RadioButton, RadioContextProvider } from '@/components/ui';
import SignupFunnel from '@/components/signup-funnel';
import KeyboardTopButton from '@/components/keyboard-top-button';
import { BackHandler } from '@/assets/icons';

const Signup = () => {
  const validateHandlerRef = useRef<{ handlePress: () => void }>(null);
  const { navigation } = useNavi();
  const [selectPhoneOrRadio, setSelectPhoneOrRadio] = useState<Verify>(
    Verify.PHONE,
  );
  const [step, setStep] = useState(0);

  const [picker, setPicker] = useState(false);
  const genders = useMemo(
    () => [
      { label: '암컷', value: 'FEMALE' },
      { label: '수컷', value: 'MALE' },
      { label: '선택안함', value: 'NONE' },
    ],
    [],
  );

  const verify = useMemo(
    () => [
      { label: '휴대폰', value: 'phone' },
      { label: '이메일', value: 'email' },
    ],
    [],
  );

  const { mutateAsync: getVerifyCodeMutate } = useGetVerifyCode({
    onSuccess(data) {
      console.log(data, '<<< getVerifyCode Success');
    },
    onError(err) {
      console.log(err.message, '<<<< getverify');
    },
  });
  const { mutateAsync: signupMutate } = useSignup({
    onSuccess(data, variables) {
      if (variables.email || variables.phone) {
        console.log(variables, 'variables');
        console.log(selectPhoneOrRadio, '<<<< radio');
        getVerifyCodeMutate({
          type: selectPhoneOrRadio,
          vid: (selectPhoneOrRadio === Verify.EMAIL
            ? variables.email
            : variables.phone) as string,
        });
        data.data ? setStep(prev => prev + 1) : console.log(data);
      }
    },
    onError(err) {
      console.log(err, '<<<<<<<useSIgnupError');
    },
  });

  const { mutate: verifyCheckMutate } = useVerify({
    onSuccess(response) {
      const { data } = response || {};
      if (data) navigation.push('SuccessSignup');
    },
    onError: err => {
      console.log(err.message, '<<<<<< verify error');
    },
  });

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'black' }}>
      <Form
        onSubmit={value => {
          console.log(value);
        }}>
        {({ value: formValues }) => (
          <>
            <KeyboardAwareScrollView>
              <View className="py-8 space-y-4 px-8">
                <Pressable onPress={() => navigation.goBack()}>
                  <BackHandler />
                </Pressable>
                <Text className="text-white font-bold text-2xl pb-5">
                  {SignupFormList[step]?.title || ''}
                </Text>
                <View className="space-y-5">
                  <SignupFunnel step={step}>
                    <View>
                      <Field
                        name={'nickname'}
                        onChangeValidate={z
                          .string({
                            required_error: '이름을 입력해주세요!',
                          })
                          .min(5, {
                            message: '이름을 5글자 이상 입력해주세요!',
                          })}>
                        {({ value, setValue, errors, onBlur, validate }) => {
                          return (
                            <Input
                              value={value}
                              placeholderTextColor={'#5D5D5D'}
                              onChangeText={setValue}
                              error={errors[0]}
                              placeholder="이름"
                              label={'이름'}
                              onSubmitEditing={onBlur}
                              onBlur={() => {
                                validate('onChangeValidate');
                                validateHandlerRef.current?.handlePress();
                              }}
                              keyboardType={'name-phone-pad'}
                            />
                          );
                        }}
                      </Field>
                    </View>
                    <View>
                      <Field
                        name={'id'}
                        onChangeValidate={z
                          .string({
                            required_error: '아이디를 입력해주세요!',
                          })
                          .min(6, {
                            message: '아이디 6글자 이상 입력해주세요!',
                          })}>
                        {({ value, setValue, errors, onBlur, validate }) => {
                          return (
                            <Input
                              value={value}
                              placeholderTextColor={'#5D5D5D'}
                              onChangeText={setValue}
                              error={errors[0]}
                              placeholder="아이디"
                              label={'아이디'}
                              onSubmitEditing={onBlur}
                              onBlur={() => {
                                validate('onChangeValidate');
                                validateHandlerRef.current?.handlePress();
                              }}
                              keyboardType={'name-phone-pad'}
                            />
                          );
                        }}
                      </Field>
                    </View>
                    <View>
                      <Field
                        name={'password'}
                        onChangeValidate={z
                          .string({
                            required_error: '비밀번호를 입력해주세요!',
                          })
                          .min(5, {
                            message: '비밀번호를 입력해주세요',
                          })}>
                        {({ value, setValue, errors, onBlur, validate }) => {
                          return (
                            <Input
                              value={value}
                              placeholderTextColor={'#5D5D5D'}
                              onChangeText={setValue}
                              error={errors[0]}
                              placeholder="비밀번호"
                              label={'비밀번호'}
                              secureTextEntry
                              onSubmitEditing={onBlur}
                              onBlur={() => {
                                validate('onChangeValidate');
                                validateHandlerRef.current?.handlePress();
                              }}
                              keyboardType={'name-phone-pad'}
                            />
                          );
                        }}
                      </Field>
                    </View>
                    <View>
                      <Field
                        name={'birthday'}
                        onChangeValidate={z.string().min(1)}
                        onMountHint={z.string().min(1)}>
                        {({ value, setValue, onBlur, errors }) => (
                          <>
                            <Input
                              onOuterPressIn={() => setPicker(true)}
                              label={'생년월일'}
                              onPressIn={() => setPicker(true)}
                              value={value ?? ''}
                              onBlur={onBlur}
                              editable={false}
                              placeholder={'생년월일을 선택해주세요.'}
                              placeholderTextColor={'#5D5D5D'}
                              error={errors[0]}
                            />
                            <Portal>
                              {picker && (
                                <View className="absolute bottom-0 w-screen">
                                  <Pressable
                                    onPress={() => {
                                      setPicker(false);
                                      setStep(prev => prev + 1);
                                    }}>
                                    <Text className="bg-white text-black text-center py-3">
                                      확인
                                    </Text>
                                  </Pressable>
                                  <DatePicker
                                    className="bg-gray-200 w-full"
                                    date={value ? new Date(value) : new Date()}
                                    locale="ko"
                                    mode="date"
                                    androidVariant="iosClone"
                                    onDateChange={newDate =>
                                      setValue(
                                        dayjs(newDate).format('YYYY-MM-DD'),
                                      )
                                    }
                                    onConfirm={newDate => {
                                      setPicker(false);
                                      setValue(
                                        dayjs(newDate).format('YYYY-MM-DD'),
                                      );
                                    }}
                                    onCancel={() => {
                                      setPicker(false);
                                    }}
                                  />
                                </View>
                              )}
                            </Portal>
                          </>
                        )}
                      </Field>
                    </View>
                    <View>
                      <Field name="gender">
                        {({ value, setValue }) => (
                          <RadioContextProvider
                            onChangeValue={setValue}
                            defaultValue={value}
                            setStep={setStep}
                            step={step}>
                            <View className="flex flex-row">
                              {genders.map(gender => (
                                <RadioButton
                                  key={gender.value}
                                  label={gender.label}
                                  value={gender.value}
                                />
                              ))}
                            </View>
                          </RadioContextProvider>
                        )}
                      </Field>
                    </View>
                    <View>
                      <RadioContextProvider
                        onChangeValue={(value: unknown) =>
                          setSelectPhoneOrRadio(value as SetStateAction<Verify>)
                        }
                        defaultValue={selectPhoneOrRadio}>
                        <View className="flex flex-row">
                          {verify.map(select => (
                            <RadioButton
                              key={select.value}
                              label={select.label}
                              value={select.value}
                            />
                          ))}
                        </View>
                        {selectPhoneOrRadio === 'phone' ? (
                          <Field
                            name={'phone'}
                            onChangeValidate={z
                              .string({
                                required_error: '이름을 입력해주세요!',
                              })
                              .min(5, {
                                message: '이름을 5글자 이상 입력해주세요!',
                              })}>
                            {({ value, setValue, errors, validate }) => {
                              return (
                                <Input
                                  value={value}
                                  placeholderTextColor={'#5D5D5D'}
                                  onChangeText={setValue}
                                  error={errors[0]}
                                  placeholder="핸드폰 번호"
                                  onSubmitEditing={() => {
                                    validate('onChangeValidate');
                                    signupMutate(formValues as SignupParam);
                                  }}
                                  keyboardType={'phone-pad'}
                                />
                              );
                            }}
                          </Field>
                        ) : (
                          <Field
                            name={'email'}
                            onChangeValidate={z
                              .string({
                                required_error: '이름을 입력해주세요!',
                              })
                              .email()
                              .min(5, {
                                message: '이름을 5글자 이상 입력해주세요!',
                              })}>
                            {({ value, setValue, errors, validate }) => {
                              return (
                                <Input
                                  value={value}
                                  placeholderTextColor={'#5D5D5D'}
                                  onChangeText={setValue}
                                  error={errors[0]}
                                  placeholder="이메일"
                                  onSubmitEditing={() => {
                                    validate('onChangeValidate');
                                    signupMutate(formValues as SignupParam);
                                  }}
                                  keyboardType={'email-address'}
                                />
                              );
                            }}
                          </Field>
                        )}
                      </RadioContextProvider>
                    </View>
                    <View>
                      <Field
                        name={'code'}
                        onChangeValidate={z
                          .string({
                            required_error: '코드를 입력해주세요!',
                          })
                          .min(6, {
                            message: '코드를 입력해주세요!',
                          })}>
                        {({ value, setValue, errors, onBlur, validate }) => {
                          return (
                            <Input
                              value={value}
                              placeholderTextColor={'#5D5D5D'}
                              onChangeText={setValue}
                              error={errors[0]}
                              placeholder="인증번호"
                              label={'인증번호'}
                              onSubmitEditing={onBlur}
                              onBlur={() => {
                                validate('onChangeValidate');
                                verifyCheckMutate({
                                  code: value,
                                  type: selectPhoneOrRadio,
                                  vid:
                                    selectPhoneOrRadio === 'phone'
                                      ? formValues.phone
                                      : formValues.email,
                                });
                              }}
                              keyboardType={'name-phone-pad'}
                            />
                          );
                        }}
                      </Field>
                    </View>
                  </SignupFunnel>
                </View>
              </View>
            </KeyboardAwareScrollView>
            <KeyboardTopButton
              ref={validateHandlerRef}
              step={step}
              setStep={idx => setStep(idx)}
              show={keyboardVisible}
            />
          </>
        )}
      </Form>
    </GestureHandlerRootView>
  );
};

export default Signup;
