import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UploadImage } from './screens/upload-image';
import { EditImage } from './screens/edit-image';
import {
  NavigationHelpers,
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RootStackParam } from '@/hooks/useNavi';
import { AnimatedPressable } from '@/components/ui/animate-pressable';
import Icon from '@/components/icons';
import { Form, useFormContext } from 'houseform';
import {
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
  View,
} from 'react-native';
import Video from 'react-native-video';
import {
  BottomTabNavigationEventMap,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { useLayoutEffect } from 'react';

const UploadStack = createNativeStackNavigator();

const UploadBottomTab = createBottomTabNavigator();

const UplaodAndEditStack = createNativeStackNavigator();

const UploadMainStack = () => {
  const route = useRoute<RouteProp<Pick<RootStackParam, 'create-post'>>>();

  return (
    <UploadStack.Navigator
      screenOptions={{
        animation: 'ios',
        headerTitle: '',
        headerTransparent: true,
        headerShown: false,
      }}
      initialRouteName="image">
      {/* 이미지등록, 편집 */}
      <UploadStack.Group screenOptions={{}}>
        <UploadStack.Screen
          initialParams={route.params}
          name="image"
          component={UploadBottomScreen}
        />
      </UploadStack.Group>
    </UploadStack.Navigator>
  );
};

export const UploadStackScreen = () => {
  return (
    <View className="flex-1 relative">
      <Form>{() => <UploadMainStack />}</Form>
    </View>
  );
};

export interface UploadTabBarProps {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const UploadTabBar = ({ navigation }: UploadTabBarProps) => {
  const {
    value: { images },
  } = useFormContext<UploadToonParam>();

  useLayoutEffect(() => {
    LayoutAnimation.configureNext({
      duration: 500,
      create: {
        type: 'spring',
        property: 'opacity',
        duration: 350,
        springDamping: 700,
      },
      update: {
        type: 'spring',
        springDamping: 700,
      },
      delete: {
        type: 'spring',
        property: 'opacity',
        duration: 350,
        springDamping: 700,
      },
    });
  }, [images]);
  return (
    <View className="p-4 bg-transparent-80 flex-row justify-between">
      <View className="flex-row space-x-2">
        {images?.map(image => {
          return image.type === 'image' ? (
            <Image
              key={image.id}
              source={{ uri: image.uri }}
              className="w-8 h-8 rounded-md"
            />
          ) : (
            <Video
              key={image.id}
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
              }}
              muted
              allowsExternalPlayback={false}
              resizeMode="cover"
              source={{
                uri: image.uri,
              }}
            />
          );
        })}
      </View>
      <AnimatedPressable onPress={() => navigation.navigate('edit-image')}>
        <Icon name="ArrowActive" />
      </AnimatedPressable>
    </View>
  );
};

type ImageMeta = {
  id: string;
  type: 'image';
  uri: string;
};

type VideoMeta = {
  id: string;
  type: 'video';
  uri: string;
  duration: number;
};

export interface UploadToonParam {
  images: (ImageMeta | VideoMeta)[];
  type: 'toon' | 'challenge';
}

const UploadAndEditScreen = () => {
  const route = useRoute();
  return (
    <UplaodAndEditStack.Navigator
      screenOptions={{
        headerTransparent: true,
        title: '',
        headerLeft: BackButton,
      }}>
      <UplaodAndEditStack.Screen
        initialParams={route.params}
        name="upload-image"
        component={UploadImage}
      />
      <UplaodAndEditStack.Screen
        initialParams={route.params}
        name="edit-image"
        component={EditImage}
      />
    </UplaodAndEditStack.Navigator>
  );
};

const UploadBottomScreen = () => {
  const route = useRoute();
  return (
    <UploadBottomTab.Navigator
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBar={({ navigation }) => {
        return <UploadTabBar navigation={navigation} />;
      }}
      initialRouteName="upload-and-edit"
      screenOptions={{
        headerShown: false,
      }}>
      <UploadBottomTab.Screen
        initialParams={route.params}
        name="upload-and-edit"
        component={UploadAndEditScreen}
      />
    </UploadBottomTab.Navigator>
  );
};

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <AnimatedPressable onPress={navigation.goBack}>
      <Icon name="ChavronLeft" color="white" />
    </AnimatedPressable>
  );
};
