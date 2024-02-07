import {Pressable, Text, View} from 'react-native';
import WrapperView from '@/components/wrapper-view';
import {useUserStore} from '@/store/user-store';

const Settings = () => {
  const {logout} = useUserStore();
  return (
    <WrapperView cn="bg-rose-500">
      <Pressable
        className="bg-[#191919] p-5 flex items-center"
        onPress={() => logout()}>
        <Text className="text-white">Logout</Text>
      </Pressable>
    </WrapperView>
  );
};

export default Settings;
