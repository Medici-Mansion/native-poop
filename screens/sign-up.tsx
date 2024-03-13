import React, {useState, useEffect} from 'react';
import dayjs from 'dayjs';
import {z} from 'zod';
import {
  Pressable,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Field, Form} from 'houseform';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BackHandler} from '@/assets/icons';
import {RadioButton} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

import {useNavi} from '@/hooks/useNavi';
import useGetVerify from '../hooks/use-get-verify';
import {SignupFormList} from '../const';

const SignUpScreen = () => {
  const {navigation} = useNavi();
  const {mutate: verifyMutate} = useGetVerify();
  const [step, setStep] = useState(0);
  const [radioValue, setRadioValue] = useState('');
  const [selectPhoneOrRadio, setSelectPhoneOrRadio] = useState('phone');
  const [birthFlag, setBirthFlag] = useState(false);
  const [picker, setPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [formValue, setFormValue] = useState({
    name: '',
    id: '',
    password: '',
    email: '',
    birthday: '',
    gender: '',
    phone: '',
  });

  const onPressEditing = async (
    callback: () => Promise<boolean>,
    value: {[name: string]: string},
  ) => {
    const isValid = await callback();
    if (!isValid) return;

    setFormValue(prev => ({...prev, ...value}));
    step !== 6 ? setStep(prev => prev + 1) : submit();
  };

  const submit = () => {
    return;
  };

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

  console.log(formValue, '<<<<<<');
  console.log(step, '<<< step');

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <KeyboardAwareScrollView>
        <View className="py-8 space-y-4 px-8">
          <Pressable onPress={() => navigation.goBack()}>
            <BackHandler />
          </Pressable>
          <Text className="text-white font-bold text-2xl">
            {SignupFormList[step].title || ''}
          </Text>
          {step === 6 && (
            <Form>
              {({isValid, submit}) => (
                <View>
                  <Field
                    name={SignupFormList[0].name}
                    onBlurValidate={z.string({
                      required_error: '아이디를 입력해주세요!',
                    })}>
                    {({value, setValue, onBlur, errors}) => {
                      return (
                        <View className="py-6">
                          <TextInput
                            value={value}
                            onBlur={onBlur}
                            onChangeText={text => setValue(text)}
                            placeholder={SignupFormList[6].placeholder}
                            placeholderTextColor={'#5D5D5D'}
                            keyboardType="number-pad"
                            className="rounded-xl bg-[#191919] text-white border border-white px-6 py-3"
                            onSubmitEditing={() =>
                              onPressEditing(submit, {id: value})
                            }
                          />
                          {errors.map(error => (
                            <Text key={error} className="text-white mt-3 ml-3">
                              {error}
                            </Text>
                          ))}
                        </View>
                      );
                    }}
                  </Field>
                </View>
              )}
            </Form>
          )}
          {step >= 5 && (
            <Form>
              {({submit}) => (
                <View>
                  {step > 5 && (
                    <Text className="text-[#5D5D5D]">
                      {SignupFormList[5].placeholder}
                    </Text>
                  )}
                  <RadioButton.Group
                    onValueChange={value => {
                      setSelectPhoneOrRadio(value);
                    }}
                    value={selectPhoneOrRadio}>
                    <View className="flex flex-row gap-14 py-5">
                      <View className="flex items-center">
                        <Text className="text-white">휴대폰</Text>
                        <RadioButton value="phone" color="white" />
                      </View>
                      <View className="flex items-center">
                        <Text className="text-white">이메일</Text>
                        <RadioButton value="email" color="white" />
                      </View>
                    </View>
                  </RadioButton.Group>
                  <Field
                    name={SignupFormList[3].name}
                    onBlurValidate={z.string()}>
                    {({value, setValue, onBlur, errors}) => {
                      return (
                        <View>
                          <TextInput
                            value={value}
                            onBlur={onBlur}
                            onChangeText={text => setValue(text)}
                            keyboardType={
                              selectPhoneOrRadio === 'phone'
                                ? 'phone-pad'
                                : 'email-address'
                            }
                            className="rounded-xl bg-[#191919] text-white border border-white px-6 py-3"
                            placeholder={
                              selectPhoneOrRadio === 'phone'
                                ? '휴대폰 번호'
                                : '이메일'
                            }
                            placeholderTextColor={'#5D5D5D'}
                            onSubmitEditing={() => {
                              selectPhoneOrRadio
                                ? onPressEditing(submit, {phone: value})
                                : onPressEditing(submit, {email: value});
                            }}
                          />
                          {errors.map(error => (
                            <Text key={error} className="text-white mt-3 ml-3">
                              {error}
                            </Text>
                          ))}
                        </View>
                      );
                    }}
                  </Field>
                </View>
              )}
            </Form>
          )}
          {step >= 4 && (
            <View>
              {step > 4 && (
                <Text className="text-[#5D5D5D]">
                  {SignupFormList[4].placeholder}
                </Text>
              )}
              <RadioButton.Group
                onValueChange={value => {
                  setRadioValue(value);
                  setFormValue(prev => ({...prev, gender: value}));
                  setStep(prev => prev + 1);
                }}
                value={radioValue}>
                <View className="flex flex-row gap-14 py-6 ">
                  <View className="flex items-center">
                    <Text className="text-white">여성</Text>
                    <RadioButton value="FEMALE" color="white" />
                  </View>
                  <View className="flex items-center">
                    <Text className="text-white">남성</Text>
                    <RadioButton value="MALE" color="white" />
                  </View>
                  <View className="flex items-center">
                    <Text className="text-white">선택안함</Text>
                    <RadioButton value="NONE" color="white" />
                  </View>
                </View>
              </RadioButton.Group>
            </View>
          )}
          {step >= 3 && (
            <Form>
              {({isValid, submit}) => (
                <View>
                  {step > 3 && (
                    <Text className="text-[#5D5D5D]">
                      {SignupFormList[3].placeholder}
                    </Text>
                  )}
                  <Field
                    name={SignupFormList[3].name}
                    onBlurValidate={z.string()}>
                    {({value, setValue, onBlur, errors}) => {
                      return (
                        <Pressable
                          className="py-6"
                          onPress={() => setPicker(true)}>
                          <TextInput
                            onPressIn={() => setPicker(true)}
                            value={
                              birthFlag
                                ? dayjs(date).format('YYYY-MM-DD')
                                : SignupFormList[3].placeholder
                            }
                            onBlur={onBlur}
                            editable={false}
                            onChangeText={text => setValue(text)}
                            placeholder={SignupFormList[3].placeholder}
                            placeholderTextColor={'#5D5D5D'}
                            className={`rounded-xl bg-[#191919] border border-white px-6 py-3 ${
                              birthFlag ? 'text-white' : 'text-[#5D5D5D]'
                            }`}
                          />
                          {errors.map(error => (
                            <Text key={error} className="text-white mt-3 ml-3">
                              {error}
                            </Text>
                          ))}
                        </Pressable>
                      );
                    }}
                  </Field>
                </View>
              )}
            </Form>
          )}
          {step >= 2 && (
            <Form>
              {({isValid, submit}) => (
                <View>
                  {step > 2 && (
                    <Text className="text-[#5D5D5D]">
                      {SignupFormList[2].placeholder}
                    </Text>
                  )}
                  <Field
                    name={SignupFormList[2].name}
                    onBlurValidate={z
                      .string({
                        required_error: '아이디를 입력해주세요!',
                      })
                      .min(6, {
                        message: '6글자 이상을 입력해주세요',
                      })}>
                    {({value, setValue, onBlur, errors}) => {
                      return (
                        <View className="py-6">
                          <TextInput
                            value={value}
                            onBlur={onBlur}
                            secureTextEntry
                            onChangeText={text => setValue(text)}
                            placeholder={SignupFormList[2].placeholder}
                            placeholderTextColor={'#5D5D5D'}
                            className="rounded-xl bg-[#191919] text-white border border-white px-6 py-3"
                            onSubmitEditing={() =>
                              onPressEditing(submit, {password: value})
                            }
                          />
                          {errors.map(error => (
                            <Text key={error} className="text-white mt-3 ml-3">
                              {error}
                            </Text>
                          ))}
                        </View>
                      );
                    }}
                  </Field>
                </View>
              )}
            </Form>
          )}
          {step >= 1 && (
            <Form>
              {({isValid, submit}) => (
                <View>
                  {step > 1 && (
                    <Text className="text-[#5D5D5D]">
                      {SignupFormList[1].placeholder}
                    </Text>
                  )}
                  <Field
                    name={SignupFormList[0].name}
                    onBlurValidate={z.string({
                      required_error: '아이디를 입력해주세요!',
                    })}>
                    {({value, setValue, onBlur, errors}) => {
                      return (
                        <View className="py-6">
                          <TextInput
                            value={value}
                            onBlur={onBlur}
                            onChangeText={text => setValue(text)}
                            placeholder={SignupFormList[1].placeholder}
                            placeholderTextColor={'#5D5D5D'}
                            className="rounded-xl bg-[#191919] text-white border border-white px-6 py-3"
                            onSubmitEditing={() =>
                              onPressEditing(submit, {id: value})
                            }
                          />
                          {errors.map(error => (
                            <Text key={error} className="text-white mt-3 ml-3">
                              {error}
                            </Text>
                          ))}
                        </View>
                      );
                    }}
                  </Field>
                </View>
              )}
            </Form>
          )}
          {step >= 0 && (
            <Form>
              {({isValid, submit}) => (
                <View>
                  {step > 0 && (
                    <Text className="text-[#5D5D5D]">
                      {SignupFormList[0].placeholder}
                    </Text>
                  )}
                  <Field
                    name={SignupFormList[0].name}
                    onBlurValidate={z
                      .string({
                        required_error: '이름을 입력해주세요!',
                      })
                      .min(5, {
                        message: '5글자 이상을 입력해주세요',
                      })}>
                    {({value, setValue, onBlur, errors}) => {
                      return (
                        <View className="py-4">
                          <TextInput
                            value={value}
                            onBlur={onBlur}
                            onChangeText={text => setValue(text)}
                            placeholder={SignupFormList[0].placeholder}
                            placeholderTextColor={'#5D5D5D'}
                            className="rounded-xl bg-[#191919] text-white border border-white px-6 py-3"
                            onSubmitEditing={() =>
                              onPressEditing(submit, {name: value})
                            }
                          />
                          {errors.map(error => (
                            <Text
                              key={error}
                              className="text-red-500 mt-3 ml-3">
                              {error}
                            </Text>
                          ))}
                        </View>
                      );
                    }}
                  </Field>
                </View>
              )}
            </Form>
          )}
        </View>
      </KeyboardAwareScrollView>
      {keyboardVisible && (
        <KeyboardAvoidingView
          behavior="height"
          style={{
            width: Dimensions.get('window').width,
          }}>
          <Pressable
            className="bg-white py-3"
            onPress={() => {
              if (step === 6) {
                console.log('123');
              }
            }}>
            <Text className="text-center font-bold text-black">
              {step === 6 ? '인증번호 요청' : '확인'}
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      )}
      {picker && (
        <>
          <Pressable
            onPress={() => {
              setPicker(false);
              setBirthFlag(true);
              setStep(prev => prev + 1);
              setFormValue(prev => ({
                ...prev,
                birthday: dayjs(date).format('YYYY-MM-DD'),
              }));
            }}>
            <Text className="bg-white text-black text-center py-3">확인</Text>
          </Pressable>
          <DatePicker
            className="bg-gray-200 w-full"
            date={date}
            locale="ko"
            mode="date"
            androidVariant="iosClone"
            onDateChange={setDate}
            onConfirm={date => {
              setPicker(false);
              setDate(date);
            }}
            onCancel={() => {
              setPicker(false);
            }}
          />
        </>
      )}
    </GestureHandlerRootView>
  );
};

export default SignUpScreen;
