import React, { useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Field, Form } from 'houseform';
import { ProfileFormList, consonantsList } from '../const';
import {
  hasAndroidPermission,
  hasIOSPermission,
} from '../permission/permission';

import { CloseIcon, PhotoIcon } from '@/assets/icons';
import { useNavi } from '@/hooks/useNavi';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import useGetBreedds from '@/hooks/useGetBreeds';
import useDebounce from '@/hooks/useDebounce';
import SearchBreeds from '@/components/select-breeds';
import ConsonantCarousel from '@/components/consonant-carousel';
import { useImageStore } from '@/store/use-image';

import * as z from 'zod';
import { RadioContextProvider } from '@/components/ui/radio-button/radio-button-group';
import { RadioButton } from '@/components/ui/radio-button/radio-button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '@/components/ui';
import useCreateProfile from '@/hooks/profile/useCreateProfile';
import { Portal } from 'react-native-portalize';
import { cn } from '@/lib/utils';
import { AnimatedPressable } from '@/components/ui/animate-pressable';
import { useQueryClient } from '@tanstack/react-query';

const PAGE_WIDTH = 35;
const PAGE_HEIGHT = 50;

const schema = z.object({
  birthday: z.string(),
  breed: z.object({
    avatar: z.string(),
    id: z.string(),
    name: z.string(),
    nameEN: z.string(),
  }),
  gender: z.string(),
  name: z.string(),
});

const CreateProfile = () => {
  const r = useRef<ICarouselInstance>(null);
  const queryClient = useQueryClient();

  const { mutate: createProfileMutate, isPending: createPending } =
    useCreateProfile({
      onSuccess: async data => {
        // TODO: 프로필 생성 성공으로 홈화면으로 이동
        if (data.data) {
          await queryClient.invalidateQueries({
            exact: true,
            queryKey: ['check', 'login'],
          });
          await queryClient.invalidateQueries({
            exact: true,
            queryKey: ['profiles'],
          });
          // mutate(profileList.data[0].id);
        }
      },
      onError: err => {
        console.log({ err });
        console.log(err.response?.data);
      },
    });
  const { navigation } = useNavi();
  const width = Dimensions.get('window').width;
  const [picker, setPicker] = useState(false);
  const [isBreedsVisible, setIsBreedsVisible] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const searchValue = useDebounce(searchInput, 500);

  const genders = useMemo(
    () => [
      { label: '암컷', value: 'FEMALE' },
      { label: '수컷', value: 'MALE' },
      { label: '선택안함', value: 'NONE' },
    ],
    [],
  );
  const { data: breeds } = useGetBreedds(searchKey, searchValue);
  const { hideBottomSheet, ref, showBottomSheet, snapPoints } =
    useBottomSheet('95%');

  const { image } = useImageStore();

  const onValid = (value: z.infer<typeof schema>) => {
    const { birthday, breed, gender, name } = value;
    if (!image || !birthday || !gender || !breed.id || !name) {
      console.log('field required');
      return;
    }
    const formData = new FormData();
    formData.append('avatar', {
      name: image.filename,
      type: 'image/jpeg',
      uri: image.uri,
    });
    formData.append('birthday', birthday);
    formData.append('breedId', breed.id);
    formData.append('gender', gender);
    formData.append('name', name);

    createProfileMutate(formData);
  };

  const isPending = createPending;

  return (
    <Form onSubmit={onValid}>
      {({ submit, isValid, value: formValue, getFieldValue }) => {
        const isAllFieldValid =
          Object.keys(formValue).every(key => getFieldValue(key)?.value) &&
          !!image;
        return (
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: 'black',
              paddingHorizontal: 12,
            }}>
            <View className="flex flex-row justify-between items-center">
              <Pressable onPress={() => navigation.push('Login')}>
                <CloseIcon size={25} />
              </Pressable>
              <AnimatedPressable
                disabled={isPending || !isAllFieldValid || !isValid}
                onPress={submit}>
                <Text
                  className={cn(
                    'text-body-b16 text-white font-bold',
                    (!isAllFieldValid || !isValid) && 'text-gray-200',
                  )}>
                  등록
                </Text>
              </AnimatedPressable>
            </View>
            <View className="flex items-center justify-center py-16">
              <Pressable
                disabled={isPending}
                className="rounded-full bg-[#1C1C1C] w-24 h-24 items-center justify-center overflow-hidden relative"
                onPress={async () => {
                  let permission = false;
                  switch (Platform.OS) {
                    case 'ios':
                      permission = await hasIOSPermission();
                      break;
                    case 'android':
                      permission = await hasAndroidPermission();
                      break;
                  }
                  if (permission) {
                    navigation.push('SelectPhoto');
                  }
                }}>
                {image && (
                  <Image
                    source={{
                      uri: image.uri,
                    }}
                    className="object-cover -z-10"
                    style={{ width: 100, height: 100 }}
                  />
                )}
                <PhotoIcon className="absolute " />
              </Pressable>
            </View>
            <View className="flex space-y-8">
              <View>
                <Field
                  name={ProfileFormList[0].name}
                  onChangeValidate={z
                    .string()
                    .min(2, { message: '2글자 이상' })}
                  onMountHint={z.string().min(2, { message: '2글자 이상' })}>
                  {({ value, setValue, onBlur, errors, hints }) => {
                    return (
                      <Input
                        disabled={isPending}
                        label={ProfileFormList[0].title}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={text => {
                          setValue(text);
                        }}
                        placeholder={'이름'}
                        placeholderTextColor={'#5D5D5D'}
                        returnKeyType="done"
                        returnKeyLabel="입력하기"
                        hint={hints[0]}
                        error={errors[0]}
                      />
                    );
                  }}
                </Field>
              </View>
              <Pressable disabled={isPending}>
                <Field
                  name={'birthday'}
                  onChangeValidate={z.string().min(1)}
                  onMountHint={z.string().min(1)}>
                  {({ value, setValue, onBlur, errors }) => (
                    <>
                      <Input
                        disabled={isPending}
                        onOuterPressIn={() => setPicker(true)}
                        label={ProfileFormList[1].title}
                        onPressIn={() => setPicker(true)}
                        value={value ?? ''}
                        onBlur={onBlur}
                        editable={false}
                        placeholder={ProfileFormList[1].placeholder}
                        placeholderTextColor={'#5D5D5D'}
                        error={errors[0]}
                      />
                      <Portal>
                        {picker && (
                          <View className="absolute bottom-0 w-screen">
                            <Pressable
                              disabled={isPending}
                              onPress={() => {
                                setPicker(false);
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
                                setValue(dayjs(newDate).format('YYYY-MM-DD'))
                              }
                              onConfirm={newDate => {
                                setPicker(false);
                                setValue(dayjs(newDate).format('YYYY-MM-DD'));
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
              </Pressable>
              <View>
                <Field name="breed">
                  {({ value, setValue }) => (
                    <>
                      <Input
                        disabled={isPending}
                        onOuterPressIn={() => {
                          setIsBreedsVisible(true);
                          showBottomSheet();
                        }}
                        onPressIn={() => {
                          setIsBreedsVisible(true);
                          showBottomSheet();
                        }}
                        label="견종"
                        placeholder="견종 선택"
                        placeholderTextColor={'#5D5D5D'}
                        editable={false}
                        value={value.name || ''}
                      />
                      <Portal>
                        {isBreedsVisible && (
                          <BottomSheet
                            ref={ref}
                            // index={}
                            detached
                            snapPoints={snapPoints}
                            enablePanDownToClose={true}
                            backgroundStyle={{ backgroundColor: '#121212' }}
                            handleIndicatorStyle={{
                              backgroundColor: 'white',
                            }}>
                            <BottomSheetView style={{ flex: 1 }}>
                              <ScrollView className="py-4">
                                <TextInput
                                  className="text-white border border-[#1C1C1C] px-5 py-3 rounded-2xl bg-[#1C1C1C] text-[12px]"
                                  placeholder="검색어를 입력하세요"
                                  placeholderTextColor={'#5D5D5D'}
                                  onChangeText={text => setSearchInput(text)}
                                />
                                <Carousel
                                  ref={r}
                                  loop={false}
                                  style={{
                                    width: width,
                                    height: PAGE_HEIGHT,
                                    alignItems: 'center',
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#1C1C1C',
                                  }}
                                  data={consonantsList}
                                  width={PAGE_WIDTH}
                                  height={PAGE_HEIGHT}
                                  renderItem={({ item, animationValue }) => {
                                    return (
                                      <ConsonantCarousel
                                        animationValue={animationValue}
                                        label={item.value}
                                        onPress={() => {
                                          r.current?.scrollTo({
                                            count: animationValue.value,
                                            animated: true,
                                          });
                                          setSearchKey(item.value);
                                        }}
                                      />
                                    );
                                  }}
                                />
                              </ScrollView>
                              <SearchBreeds
                                breeds={breeds || {}}
                                hideBottomSheet={hideBottomSheet}
                                onSelect={setValue}
                              />
                            </BottomSheetView>
                          </BottomSheet>
                        )}
                      </Portal>
                    </>
                  )}
                </Field>
              </View>
              <Field name="gender">
                {({ value, setValue }) => (
                  <RadioContextProvider
                    onChangeValue={setValue}
                    defaultValue={value}>
                    <View className="flex flex-row py-5">
                      {genders.map(gender => (
                        <RadioButton
                          disabled={isPending}
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
          </SafeAreaView>
        );
      }}
    </Form>
  );
};

export default CreateProfile;
