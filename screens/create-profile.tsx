import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
import useProfileStore from '@/store/use-profile';
import { useNavi } from '@/hooks/useNavi';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import useGetBreedds from '@/hooks/useGetBreeds';
import useDebounce from '@/hooks/useDebounce';
import SearchBreeds from '@/components/select-breeds';
import ConsonantCarousel from '@/components/consonant-carousel';
import { useImageStore } from '@/store/use-image';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

import * as z from 'zod';
// import { RadioButton } from 'react-native-paper';
import { Gender } from '@/types';
import { RadioContextProvider } from '@/components/ui/radio-button/radio-button-group';
import { RadioButton } from '@/components/ui/radio-button/radio.button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '@/components/ui';

const PAGE_WIDTH = 35;
const PAGE_HEIGHT = 50;

const CreateProfile = () => {
  const r = useRef<ICarouselInstance>(null);
  const { breed } = useProfileStore();
  const { navigation } = useNavi();
  const width = Dimensions.get('window').width;
  const [picker, setPicker] = useState(false);
  const [isBreedsVisible, setIsBreedsVisible] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [searchKey, setSearchKey] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [birthFlag, setBirthFlag] = useState(false);
  const searchValue = useDebounce(searchInput, 500);
  const { data: breeds } = useGetBreedds(searchKey, searchValue);
  const { hideBottomSheet, ref, showBottomSheet, snapPoints } =
    useBottomSheet('95%');
  const { image } = useImageStore();
  const [formValue, setFormValue] = useState({
    name: '',
    birthday: '',
  });

  const onValid = v => {
    if (!formValue.birthday || !formValue.birthday || !breed.id) {
      console.log('field required');
      return;
    }

    const param = {
      ...formValue,
      breedId: breed.id || '',
    };

    console.log(param, '<<<<<< param');
  };

  useEffect(() => {
    if (image) {
      console.log(image, '<<<image');
      CameraRoll.iosGetImageDataById(image).then(res => {
        console.log(res);
      });
    }
  }, [image]);
  return (
    <GestureHandlerRootView>
      <Form onSubmit={onValid}>
        {({ submit, isValid }) => (
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
              <Button
                disabled={!isValid}
                title={`${isValid}`}
                color="white"
                onPress={submit}
              />
            </View>
            <View className="flex items-center justify-center py-16">
              <Pressable
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
                      uri: image,
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
                    .min(2, { message: '2글자 이상' })}>
                  {({ value, setValue, onBlur, errors }) => {
                    return (
                      <Input
                        label={ProfileFormList[0].title}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={setValue}
                        placeholder={'이름'}
                        placeholderTextColor={'#5D5D5D'}
                        returnKeyType="done"
                        returnKeyLabel="입력하기"
                        error={errors[0]}
                      />
                    );
                  }}
                </Field>
              </View>
              <Pressable onPress={() => setPicker(true)}>
                <Field name={'birthday'} onChangeValidate={z.string().min(1)}>
                  {({ value, setValue, onBlur, errors }) => {
                    const v = birthFlag ? dayjs(date).format('YYYY-MM-DD') : '';
                    if (value !== v) {
                      setValue(v);
                    }
                    return (
                      <Input
                        label={ProfileFormList[1].title}
                        onPressIn={() => setPicker(true)}
                        value={date ? dayjs(date).format('YYYY-MM-DD') : ''}
                        onBlur={onBlur}
                        editable={false}
                        placeholder={ProfileFormList[1].placeholder}
                        placeholderTextColor={'#5D5D5D'}
                        error={errors[0]}
                      />
                    );
                  }}
                </Field>
              </Pressable>
              <View>
                <Field name="breed">
                  {({ value, setValue }) => (
                    <Pressable
                      className="flex"
                      onPress={() => {
                        setIsBreedsVisible(true);
                        showBottomSheet();
                      }}>
                      <Text className="text-[#959595] text-[12px]">견종</Text>
                      <TextInput
                        className="text-white border border-[#1C1C1C] px-5 py-3 rounded-2xl text-[12px]"
                        placeholder="견종 선택"
                        editable={false}
                        value={breed.name || ''}
                        placeholderTextColor={'#5D5D5D'}
                      />
                    </Pressable>
                  )}
                </Field>
              </View>
              <Field name="gender">
                {({ value, setValue }) => (
                  <RadioContextProvider>
                    <View className="flex flex-row">
                      <RadioButton />
                      <RadioButton />
                      <RadioButton />
                    </View>
                  </RadioContextProvider>
                )}
              </Field>
            </View>

            {isBreedsVisible && (
              <BottomSheet
                ref={ref}
                // index={}
                detached
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                backgroundStyle={{ backgroundColor: '#121212' }}
                handleIndicatorStyle={{ backgroundColor: 'white' }}>
                <BottomSheetView style={{ flex: 1 }}>
                  <View className="py-4">
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
                  </View>
                  <SearchBreeds
                    breeds={breeds || {}}
                    hideBottomSheet={hideBottomSheet}
                  />
                </BottomSheetView>
              </BottomSheet>
            )}
            {picker && (
              <View className="absolute bottom-0 w-screen">
                <Pressable
                  onPress={() => {
                    setPicker(false);
                    setBirthFlag(true);
                    setFormValue(prev => ({
                      ...prev,
                      birthday: dayjs(date).format('YYYY-MM-DD'),
                    }));
                  }}>
                  <Text className="bg-white text-black text-center py-3">
                    확인
                  </Text>
                </Pressable>
                <DatePicker
                  className="bg-gray-200 w-full"
                  date={date ? date : new Date()}
                  locale="ko"
                  mode="date"
                  androidVariant="iosClone"
                  onDateChange={setDate}
                  onConfirm={newDate => {
                    setPicker(false);
                    setDate(newDate);
                  }}
                  onCancel={() => {
                    setPicker(false);
                  }}
                />
              </View>
            )}
          </SafeAreaView>
        )}
      </Form>
    </GestureHandlerRootView>
  );
};

export default CreateProfile;
