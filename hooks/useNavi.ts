import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ReactNode } from 'react';

export type RootStackParam = {
  Home: undefined;
  Search: undefined;
  Upload: undefined;
  Setting: undefined;
  UserDetail: { id: number; title: string };
  SignUp: undefined;
  Login: undefined;
  CreateProfile: undefined;
  SuccessSignup: undefined;
  SelectPhoto: undefined;
  SelectBreeds: undefined;
  'select-profile': undefined;
};

export const useNavi = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const route = useRoute();
  const routeParam = route.params as RootStackParam[keyof RootStackParam];
  return {
    navigation,
    routeParam,
  };
};
