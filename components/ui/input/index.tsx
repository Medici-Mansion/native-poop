import { mergeRefs } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { theme } from '@/theme';
import { RefObject, forwardRef, useRef } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  Platform,
} from 'react-native';
import Animated, {
  CurvedTransition,
  FadeIn,
  FadeOut,
  useAnimatedProps,
} from 'react-native-reanimated';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  onOuterPressIn?: (event: GestureResponderEvent) => void;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, hint, disabled, onOuterPressIn, ...props }, ref) => {
    const bgColor = error ? theme.colors.system.red : 'transparent';
    const animatedStyles = useAnimatedProps(() => {
      return {
        borderColor: bgColor,
      };
    });

    const innerRef = useRef<TextInput | null>(null);

    return (
      <Pressable
        disabled={disabled}
        className="space-y-3 relative"
        onPressIn={event => {
          onOuterPressIn && onOuterPressIn(event);
          (ref as RefObject<TextInput>)?.current?.focus();
        }}>
        {label && <Text className="text-body-b12 text-gray-200">{label}</Text>}
        <Animated.View
          style={[animatedStyles]}
          className={cn(
            'rounded-xl bg-gray-500 border px-6',
            Platform.OS === 'ios' && 'py-4',
          )}>
          <TextInput
            ref={mergeRefs(innerRef, ref)}
            placeholderTextColor={theme.colors.gray[300]}
            {...props}
            autoCorrect={false}
            spellCheck={false}
            clearButtonMode="while-editing"
            className="text-body-m14 text-white"
          />
        </Animated.View>
        {hint ? (
          <Animated.Text
            entering={FadeIn.duration(100).springify().mass(0.3)}
            exiting={FadeOut.duration(100).springify().mass(0.3)}
            layout={CurvedTransition.duration(100).delay(120)}
            key={hint}
            className="text-white">
            {hint}
          </Animated.Text>
        ) : (
          error && (
            <Animated.Text
              entering={FadeIn.duration(100).springify().mass(0.3)}
              exiting={FadeOut.duration(100).springify().mass(0.3)}
              layout={CurvedTransition.duration(100).delay(120)}
              key={error}
              className="text-system-red">
              {error}
            </Animated.Text>
          )
        )}
      </Pressable>
    );
  },
);
