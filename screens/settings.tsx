import {Pressable, Text, Dimensions} from 'react-native';
import WrapperView from '@/components/wrapper-view';
import {useUserStore} from '@/store/user-store';
import {
  Canvas,
  Blur,
  Image,
  useAnimatedImageValue,
} from '@shopify/react-native-skia';

const Settings = () => {
  const {logout} = useUserStore();
  const windowWidth = Dimensions.get('window').width;

  const dog = useAnimatedImageValue(require('../assets/images/profile.png'));
  return (
    <WrapperView>
      <Pressable
        className="bg-[#191919] items-center"
        style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
        <Text className="text-white">Logout</Text>
      </Pressable>
      <Canvas
        style={{
          flex: 9,
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Image image={dog} width={windowWidth} height={200} fit={'contain'} />
      </Canvas>
    </WrapperView>
  );
};

export default Settings;
