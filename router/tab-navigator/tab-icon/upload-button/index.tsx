import { PlusIcon } from '@/assets/icons';
import Icon from '@/components/icons';
import { AnimatedPressable } from '@/components/ui/animate-pressable';
import { useNavi } from '@/hooks/useNavi';
import { useRef, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Popover from 'react-native-popover-view';
import { Mode } from 'react-native-popover-view/dist/Types';

interface UploadModalButtonProps {
  focused: boolean;
  color: string;
  size: number;
}

const width = Dimensions.get('screen').width / 5;
export const UploadButton = (_: UploadModalButtonProps) => {
  const { navigation } = useNavi();
  const ref = useRef<TouchableOpacity>(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={{
          flex: 1,
          width,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        ref={ref}
        onPress={() => setOpen(true)}>
        <PlusIcon />
      </TouchableOpacity>
      <Popover
        animationConfig={{
          delay: 0,
          duration: 150,
        }}
        onRequestClose={() => setOpen(false)}
        mode={Mode.RN_MODAL}
        isVisible={open}
        from={ref}
        offset={3}
        popoverStyle={{
          borderRadius: 24,
          backgroundColor: '#121212',
        }}>
        <View
          className="p-5 bg-green-50"
          style={{
            backgroundColor: '#121212',
            borderRadius: 24,
            borderStyle: 'solid',
            borderColor: '#353434',
            borderWidth: 1,
            flex: 1,
          }}>
          <AnimatedPressable
            onPress={() => {
              setOpen(false);
              navigation.navigate('create-post', { type: 'toon' });
            }}
            style={{
              flex: 1,
              alignItems: 'center',
              padding: 24,
              flexDirection: 'row',
            }}>
            <Icon name="Write" color="white" style={{ marginRight: 16 }} />
            <Text
              style={{
                color: 'white',
                fontFamily: 'Pretendard',
                fontWeight: 'bold',
              }}>
              툰
            </Text>
          </AnimatedPressable>
          <View style={{ height: 1, backgroundColor: '#353434' }} />
          <AnimatedPressable
            onPress={() => {
              setOpen(false);
              navigation.navigate('create-post', { type: 'challenge' });
            }}
            style={{
              flex: 1,
              alignItems: 'center',
              padding: 24,
              flexDirection: 'row',
            }}>
            <Icon name="Challenge" color="white" style={{ marginRight: 16 }} />
            <Text
              style={{
                fontFamily: 'Pretendard',
                fontWeight: 'bold',
                color: 'white',
              }}>
              챌린지
            </Text>
          </AnimatedPressable>
        </View>
      </Popover>
    </>
  );
};
