import { theme } from '@/theme';
import {
  Text,
  TextInput,
  TextInputProps,
  View,
  NativeModules,
} from 'react-native';
import Animated, {
  CurvedTransition,
  FadeIn,
  FadeOut,
  useAnimatedProps,
} from 'react-native-reanimated';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, ...props }: InputProps) => {
  const bgColor = error ? theme.colors.system.red : 'transparent';
  const animatedStyles = useAnimatedProps(() => {
    return {
      borderColor: bgColor,
    };
  });

  return (
    <View className="space-y-4 relative">
      {label && <Text className="text-body-b12 text-[#959595]">{label}</Text>}
      <Animated.View
        style={[animatedStyles]}
        className={'rounded-xl bg-[#191919] border px-6'}>
        <TextInput {...props} className="text-body-m14 text-white" />
      </Animated.View>
      {error && (
        <Animated.Text
          entering={FadeIn.duration(100).springify().mass(0.3)}
          exiting={FadeOut.duration(100).springify().mass(0.3)}
          layout={CurvedTransition.duration(100).delay(120)}
          key={error}
          className="text-system-red">
          {error}
        </Animated.Text>
      )}
    </View>
  );
};
