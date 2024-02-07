import {Button, Text, View} from 'react-native';
import {useNavi} from '@/hooks/useNavi';

const PeedScreen = () => {
  const navigation = useNavi();
  return (
    <View className="bg-black flex-1 flex items-center justify-center">
      <Text className="text-white">PeedScreen</Text>
      <Button title="back button" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default PeedScreen;
