import { api } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Text, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
export const SelectProfile = () => {
  const headerHeight = useHeaderHeight();
  const { data } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const res = await api.getMyProfileList();
      return res.data;
    },
  });
  return (
    <View className="bg-black flex-1" style={{ paddingTop: headerHeight }}>
      {data?.map(profile => (
        <View key={profile.id}>
          <Text className="text-white">{profile.name}</Text>
        </View>
      ))}
    </View>
  );
};
