import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
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

const PAGE_WIDTH = 35;
const PAGE_HEIGHT = 50;

const CreateProfile = () => {
  const r = useRef<ICarouselInstance>(null);
  const { breed } = useProfileStore();
  const { navigation } = useNavi();
  const width = Dimensions.get('window').width;
  const [picker, setPicker] = useState(false);
  const [isBreedsVisible, setIsBreedsVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [searchKey, setSearchKey] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [birthFlag, setBirthFlag] = useState(false);
  const searchValue = useDebounce(searchInput, 500);
  const { data: breeds, isLoading } = useGetBreedds(searchKey, searchValue);
  const { hideBottomSheet, ref, showBottomSheet, snapPoints } =
    useBottomSheet('95%');
  const { image } = useImageStore();
  const [formValue, setFormValue] = useState({
    name: '',
    birthday: '',
  });

  const submit = () => {
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

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 12,
      }}>
      <View
        className="flex flex-row justify-between items-center py-3"
        style={{ flex: 1 }}>
        <Pressable onPress={() => navigation.push('Login')}>
          <CloseIcon size={25} />
        </Pressable>
        <Pressable onPress={submit}>
          <Text className="text-[16px] text-[#959595]">등록</Text>
        </Pressable>
      </View>
      <View className="flex items-center justify-center" style={{ flex: 2 }}>
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
      <View style={{ flex: 5, paddingVertical: 5 }} className="space-y-5">
        <Form
          onSubmit={name => {
            setFormValue(prev => ({ ...prev, ...name }));
          }}>
          {({ isValid, submit }) => (
            <View>
              <Field name={ProfileFormList[0].name}>
                {({ value, setValue, onBlur, errors }) => {
                  return (
                    <View className="py-6">
                      <TextInput
                        value={value}
                        onBlur={() => {
                          onBlur();
                          isValid && submit();
                        }}
                        onChangeText={text => setValue(text)}
                        placeholder={'이름'}
                        placeholderTextColor={'#5D5D5D'}
                        keyboardType="number-pad"
                        className="rounded-xl bg-[#191919] text-white border-white px-6 py-3"
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
        <View>
          <Form>
            {({ isValid, submit }) => (
              <View>
                <Text className="text-[#5D5D5D]">
                  {ProfileFormList[1].placeholder}
                </Text>
                <Field name={ProfileFormList[1].name}>
                  {({ value, setValue, onBlur, errors }) => {
                    return (
                      <Pressable
                        className="py-6"
                        onPress={() => setPicker(true)}>
                        <TextInput
                          onPressIn={() => setPicker(true)}
                          value={
                            birthFlag
                              ? dayjs(date).format('YYYY-MM-DD')
                              : ProfileFormList[1].placeholder
                          }
                          onBlur={() => {
                            onBlur();
                            isValid && submit();
                          }}
                          editable={false}
                          onChangeText={text => setValue(text)}
                          placeholder={ProfileFormList[1].placeholder}
                          placeholderTextColor={'#5D5D5D'}
                          className={`rounded-xl bg-[#191919] border-white px-6 py-3 ${
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
        </View>
        <View>
          <Pressable
            className="flex gap-y-3"
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
        </View>
      </View>
      {picker && (
        <>
          <Pressable
            onPress={() => {
              setPicker(false);
              setBirthFlag(true);
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
      {isBreedsVisible && (
        <BottomSheet
          ref={ref}
          index={-1}
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
    </GestureHandlerRootView>
  );
};

export default CreateProfile;
