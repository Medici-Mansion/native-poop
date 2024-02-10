import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParam = {
  Home: undefined;
  Peed: undefined;
  Settings: undefined;
  UserDetail: {id: number; title: string};
  SignUp: undefined;
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
