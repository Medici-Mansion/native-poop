import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UploadImage } from './screens/upload-image';
import { EditImage } from './screens/edit-image';
import { useRoute } from '@react-navigation/native';
import { useNavi } from '@/hooks/useNavi';
import { AnimatedPressable } from '@/components/ui/animate-pressable';
import Icon from '@/components/icons';

const UploadStack = createNativeStackNavigator();

export const UploadStackScreen = () => {
  const route = useRoute();

  return (
    <UploadStack.Navigator
      screenOptions={{
        animation: 'ios',
        headerTitle: '',
        headerTransparent: true,
        headerLeft: BackButton,
      }}
      initialRouteName="upload-image">
      {/* 이미지등록, 편집 */}
      <UploadStack.Group>
        <UploadStack.Screen
          initialParams={route.params}
          name="upload-image"
          component={UploadImage}
        />
        <UploadStack.Screen
          initialParams={route.params}
          name="edit-image"
          component={EditImage}
        />
      </UploadStack.Group>
    </UploadStack.Navigator>
  );
};

const BackButton = () => {
  const { navigation } = useNavi();
  return (
    <AnimatedPressable onPress={navigation.goBack}>
      <Icon name="ChavronLeft" color="white" />
    </AnimatedPressable>
  );
};
