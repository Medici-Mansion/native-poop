import React from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const buttonVariatns = cva(
  'flex justify-center items-center py-4 mx-auto bg-white w-full',
  {
    variants: {
      variant: {
        single: '',
        horizontal: '',
        vertical: '',
      },

      size: {
        s: '',
        md: 'rounded-2xl',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'single',
      size: 'md',
    },
    compoundVariants: [
      {
        variant: 'horizontal',
        size: 'md',
      },
    ],
  },
);

interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonVariatns> {
  label: string;
  secondary?: ButtonProps & { label: string };
}

export const Button = ({
  variant,
  size,
  label,
  secondary,
  ...props
}: ButtonProps) => {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    opacity.value = withSpring(0.8);
    scale.value = withSpring(0.98, {
      damping: 10,
    });
  };

  const handlePressOut = () => {
    opacity.value = withSpring(1);
    scale.value = withSpring(1);
  };
  return (
    <View className="space-y-4">
      <AnimatedPressable
        {...props}
        style={[{ opacity, transform: [{ scale }] }, props.style]}
        onPressIn={event => {
          handlePressIn();
          props.onPressIn && props.onPressIn(event);
        }}
        onPressOut={event => {
          handlePressOut();
          props.onPressOut && props.onPressOut(event);
        }}
        className={cn(
          buttonVariatns({ variant, size }),
          props.disabled && 'bg-gray-300',
        )}>
        <Text className="text-body-b14">{label}</Text>
      </AnimatedPressable>
      {variant === 'vertical' && (
        <Pressable {...secondary} className={cn('mx-auto')}>
          <Text className="text-gray-200 text-body-b12">
            {secondary?.label}
          </Text>
        </Pressable>
      )}
    </View>
  );
};
