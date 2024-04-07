import { Pressable, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CloseIcon, PhotoIcon } from '@/assets/icons';
import { useNavi } from '@/hooks/useNavi';
import { hasAndroidPermission } from '../permission/permission';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import dayjs from 'dayjs';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import SearchBreeds from '@/components/select-breeds';

const CreateProfile = () => {
  const { navigation } = useNavi();
  const { hideBottomSheet, ref, showBottomSheet, snapPoints } =
    useBottomSheet('95%');

  const [date, setDate] = useState(new Date());
  const [picker, setPicker] = useState(false);
  const [isBreedsVisible, setIsBreedsVisible] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      birthday: '',
      breeds: '',
    },
  });

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
        <Text className="text-[16px] text-[#959595]">등록</Text>
      </View>
      <View className="flex items-center justify-center" style={{ flex: 2 }}>
        <Pressable
          className="p-10 rounded-full bg-[#1C1C1C]"
          onPress={() => hasAndroidPermission(navigation)}>
          <PhotoIcon />
        </Pressable>
      </View>
      <View style={{ flex: 5, paddingVertical: 5 }} className="space-y-5">
        <View>
          <Controller
            control={control}
            rules={{ required: true }}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="flex gap-y-3">
                <Text className="text-[#959595] text-[12px]">반려견 이름</Text>
                <TextInput
                  className="text-white border border-[#1C1C1C] px-5 py-3 rounded-2xl bg-[#1C1C1C] text-[12px]"
                  placeholder="비밀번호"
                  onChangeText={onChange}
                  placeholderTextColor={'#5D5D5D'}
                  onBlur={() => {
                    onBlur();
                  }}
                  value={value}
                  secureTextEntry
                />
              </View>
            )}
          />
        </View>
        <View>
          <Controller
            control={control}
            rules={{ required: true }}
            name="birthday"
            render={({ field: { onChange, onBlur, value } }) => (
              <Pressable
                className="flex gap-y-3"
                onPress={() => setPicker(true)}>
                <Text className="text-[#959595] text-[12px]">
                  반려견 생년월일
                </Text>
                <TextInput
                  className="text-white border border-[#1C1C1C] px-5 py-3 rounded-2xl bg-[#1C1C1C] text-[12px]"
                  placeholder="생년월일"
                  onChangeText={onChange}
                  editable={false}
                  placeholderTextColor={'#5D5D5D'}
                  onBlur={() => {
                    onBlur();
                  }}
                  value={value}
                />
              </Pressable>
            )}
          />
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
        <>
          <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            style={{ flex: 1 }}
            backgroundStyle={{ backgroundColor: '#121212' }}
            handleIndicatorStyle={{ backgroundColor: 'white' }}>
            <BottomSheetView>
              <SearchBreeds />
            </BottomSheetView>
          </BottomSheet>
        </>
      )}
    </GestureHandlerRootView>
  );
};

export default CreateProfile;
