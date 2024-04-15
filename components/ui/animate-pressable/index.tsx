import React, { PropsWithChildren } from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
const AnimatedPressableWrapper = Animated.createAnimatedComponent(Pressable);

interface AnimatedPressableProps extends PressableProps {}

export const AnimatedPressable = (
  props: PropsWithChildren<AnimatedPressableProps>,
) => {
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
    <AnimatedPressableWrapper
      onPress={props.onPress}
      style={[{ opacity, transform: [{ scale }] }, props.style]}
      onPressIn={event => {
        handlePressIn();
        props.onPressIn && props.onPressIn(event);
      }}
      onPressOut={event => {
        handlePressOut();
        props.onPressOut && props.onPressOut(event);
      }}>
      {props.children}
    </AnimatedPressableWrapper>
  );
};
