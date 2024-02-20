import {Pressable, Text, View} from 'react-native';
import WrapperView from '@/components/wrapper-view';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {useState, useEffect} from 'react';

const UploadScreen = () => {
  const {hasPermission, requestPermission} = useCameraPermission();

  const [active, setActive] = useState(false);

  const device = useCameraDevice('back');
  if (device == null) return <Text>No Camera Device</Text>;

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 2000);
  }, [hasPermission]);

  return (
    <WrapperView cn="bg-black">
      <View style={{flex: 1}} className="flex items-center justify-center">
        <Text className="text-white">test</Text>
      </View>
      <View style={{flex: 2}} className="flex items-center justify-center">
        <View>
          <Pressable onPress={() => requestPermission()}>
            <Text className="text-white">test</Text>
          </Pressable>
        </View>
      </View>
      {device && hasPermission && (
        <Camera style={{flex: 1}} device={device} isActive={active} />
      )}
    </WrapperView>
  );
};

export default UploadScreen;
