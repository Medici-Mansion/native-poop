import { api } from '@/apis';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { GetMyProfiles } from '@/types/server/profile';
import { Field, Form } from 'houseform';
import { RadioContextProvider } from '@/components/ui/radio-button/radio-button-group';
import { RadioButtonItem } from '@/components/ui/radio-button/radio-button';
import Icon from '@/components/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedPressable } from '@/components/ui/animate-pressable';
import { useNavi } from '@/hooks/useNavi';

export const SelectProfile = () => {
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { navigation } = useNavi();
  const { mutate } = useMutation({
    mutationKey: ['login', 'profile'],
    mutationFn: api.loginProfile,
    async onSuccess() {
      const latestProfileResponse = await api.getLatestProfile();
      queryClient.setQueryData(['profile', 'latest'], latestProfileResponse);
      navigation.replace('shell');
    },
  });
  const { data } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const res = await api.getMyProfileList();
      return res.data;
    },
  });

  const onValid = useCallback(
    ({ profileId }: { profileId: string }) => {
      console.log(profileId);
      mutate(profileId);
    },
    [mutate],
  );

  return (
    <Form onSubmit={onValid}>
      {({ submit, isDirty }) => (
        <View
          className="bg-black flex-1 px-4 justify-end"
          style={{
            paddingTop: headerHeight + 18,
            paddingBottom: insets.bottom,
          }}>
          <Text className="text-head-sb24 text-white mb-16">
            프로필을 선택해주세요
          </Text>
          <Field name="profileId">
            {({ setValue, value }) => (
              <RadioContextProvider onChangeValue={setValue}>
                <FlatList
                  data={data}
                  renderItem={profile => (
                    <RadioButtonItem
                      className="rounded-3xl h-[84] bg-gray-500 justify-center p-6"
                      value={profile.item.id}>
                      <AvatarButton
                        profile={profile.item}
                        active={value === profile.item.id}
                      />
                    </RadioButtonItem>
                  )}
                />
              </RadioContextProvider>
            )}
          </Field>
          <AnimatedPressable onPress={submit} className="ml-auto">
            <Icon name={isDirty ? 'ArrowActive' : 'ArrowInactive'} />
          </AnimatedPressable>
        </View>
      )}
    </Form>
  );
};

interface AvatarButtonProps {
  profile: GetMyProfiles;
  active?: boolean;
}

function AvatarButton({ profile, active }: AvatarButtonProps) {
  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center space-x-4">
        <Image
          source={{
            uri: profile.avatarUrl || '',
          }}
          className="w-9 h-9 rounded-full"
        />
        <Text className="text-white text-head-sb14">{profile.name}</Text>
      </View>
      <Icon
        name={active ? 'CheckActive' : 'CheckInactive'}
        color={active ? 'white' : 'gray'}
      />
    </View>
  );
}
