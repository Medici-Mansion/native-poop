import {
  Pressable,
  Text,
  View,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {useNavi} from '@/hooks/useNavi';
import WrapperView from '@/components/wrapper-view';

const UploadScreen = () => {
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <WrapperView cn="bg-black">
      <View style={{flex: 1}} className="flex items-center justify-center">
        <Text className="text-white">test</Text>
      </View>
      <View style={{flex: 2}} className="flex items-center justify-center">
        <View>
          <Pressable onPress={() => requestCameraPermission()}>
            <Text className="text-white">test</Text>
          </Pressable>
        </View>
      </View>
    </WrapperView>
  );
};

export default UploadScreen;
