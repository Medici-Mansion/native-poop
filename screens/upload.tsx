import { Pressable, Text, View } from 'react-native';
import WrapperView from '@/components/wrapper-view';

const UploadScreen = () => {
  return (
    <WrapperView cn="bg-black">
      <View style={{ flex: 1 }} className="flex items-center justify-center">
        <Text className="text-white">test</Text>
      </View>
      <View style={{ flex: 2 }} className="flex items-center justify-center">
        <View>
          <Pressable>
            <Text className="text-white">test</Text>
          </Pressable>
        </View>
      </View>
    </WrapperView>
  );
};

export default UploadScreen;
