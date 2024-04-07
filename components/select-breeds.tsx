import { View, Text, TextInput, ScrollView, Dimensions } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { consonantsList } from '../const';
import type { ICarouselInstance } from 'react-native-reanimated-carousel';

import Carousel from 'react-native-reanimated-carousel';
import ConsonantCarousel from './consonant-carousel';

const PAGE_WIDTH = 60;
const PAGE_HEIGHT = 40;

const SearchBreeds = () => {
  const r = useRef<ICarouselInstance>(null);
  const width = Dimensions.get('window').width;
  const [searchKey, setSearchKey] = useState('');
  const [carouselValue, setCarouselValue] = useState('');

  return (
    <KeyboardAwareScrollView className="px-4 space-y-2 flex flex-col h-full bg-[#121212]">
      <ScrollView style={{ flex: 1 }} className="py-4">
        <TextInput
          className="text-white border border-[#1C1C1C] px-5 py-3 rounded-2xl bg-[#1C1C1C] text-[12px]"
          placeholder="검색어를 입력하세요"
          placeholderTextColor={'#5D5D5D'}
          onChangeText={text => setSearchKey(text)}
        />
      </ScrollView>
      <View style={{ flex: 9 }}>
        <Carousel
          ref={r}
          style={{
            width: width,
            height: PAGE_HEIGHT,
            justifyContent: 'center',
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
                  setCarouselValue(item.value);
                }}
              />
            );
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SearchBreeds;
