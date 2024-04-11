import { theme } from '@/theme';
import { useRef } from 'react';
import { Pressable, Text, TextInput, TextInputProps } from 'react-native';
import Animated, {
  CurvedTransition,
  FadeIn,
  FadeOut,
  useAnimatedProps,
} from 'react-native-reanimated';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, ...props }: InputProps) => {
  const ref = useRef<TextInput>(null);
  const bgColor = error ? theme.colors.system.red : 'transparent';
  const animatedStyles = useAnimatedProps(() => {
    return {
      borderColor: bgColor,
    };
  });

  return (
    <Pressable
      className="space-y-4 relative"
      onPressIn={() => ref.current?.focus()}>
      {label && <Text className="text-body-b12 text-gray-200">{label}</Text>}
      <Animated.View
        style={[animatedStyles]}
        className={'rounded-3xl bg-gray-500 border px-6 py-6'}>
        <TextInput
          ref={ref}
          placeholderTextColor={theme.colors.gray[300]}
          {...props}
          className="text-body-m14 text-white"
        />
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
    </Pressable>
  );
};