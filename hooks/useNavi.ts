import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

type RootStackParam = {
  Home: undefined;
  Peed: undefined;
  Settings: undefined;
  UserDetail: undefined;
  SignUp: undefined;
};

export const useNavi = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  return navigation;
};
