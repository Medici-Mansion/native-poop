import { api } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  PressableProps,
  Text,
  View,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { GetMyProfiles } from '@/types/server/profile';
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
    <View
      className="bg-black flex-1 px-4"
      style={{ paddingTop: headerHeight + 18 }}>
      <Text className="text-head-sb24 text-white mb-16">
        프로필을 선택해주세요
      </Text>
      <FlatList
        data={data}
        renderItem={profile => <AvatarButton profile={profile.item} />}
      />
    </View>
  );
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AvatarButtonProps extends PressableProps {
  profile: GetMyProfiles;
}

function AvatarButton({ profile, ...props }: AvatarButtonProps) {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    opacity.value = withSpring(0.8);
    scale.value = withSpring(0.98, {
      damping: 10,
    });
  };

  const handlePressOut = () => {
    opacity.value = withSpring(1);
    scale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      key={profile.id}
      style={[{ opacity, transform: [{ scale }] }, props.style]}
      onPressIn={event => {
        handlePressIn();
        props.onPressIn && props.onPressIn(event);
      }}
      onPressOut={event => {
        handlePressOut();
        props.onPressOut && props.onPressOut(event);
      }}
      className="rounded-3xl h-[84] bg-gray-500 justify-center p-6">
      <View className="flex-row items-center space-x-4">
        <Image
          source={{
            uri: profile.avatarUrl || '',
          }}
          className="w-9 h-9 rounded-full"
        />
        <Text className="text-white text-head-sb14">{profile.name}</Text>
      </View>
    </AnimatedPressable>
  );
}
