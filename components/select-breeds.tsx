import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Breed, BreedsGroupedByConsonant } from '@/types';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import useProfileStore from '@/store/use-profile';

interface SearchBreedsProps {
  breeds: BreedsGroupedByConsonant;
  hideBottomSheet: () => void;
}

const SearchBreeds = ({ breeds, hideBottomSheet }: SearchBreedsProps) => {
  const { setBreed } = useProfileStore();
  const selectHandler = (breed: Breed) => {
    setBreed(breed);
    hideBottomSheet();
  };

  return (
    <ScrollView className="px-4">
      {breeds &&
        Object.entries(breeds).map((item, idx) => {
          const [breed, breedItems] = item || [];
          return (
            <View className="py-5 space-y-2" key={idx}>
              <Text className="text-white text-2xl">{breed}</Text>
              <View className="gap-y-10 last:pb-5">
                {breedItems?.map(item => {
                  return (
                    <Pressable
                      key={item.id}
                      onPress={() => selectHandler(item)}
                      className="flex flex-row items-center gap-x-5">
                      <Image
                        source={{ uri: item.avatar || '' }}
                        className="w-10 h-10 rounded-full"
                      />
                      <Text className="text-white">{item.name || ''}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}
    </ScrollView>
  );
};

export default SearchBreeds;
