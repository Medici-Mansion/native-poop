import React, {useEffect} from 'react';
import {View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';

export default function LoadingScreen() {
  const offset = useSharedValue(200);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));

  useEffect(() => {
    offset.value = withRepeat(
      withTiming(-offset.value, {duration: 1500}),
      -1,
      true,
    );
  }, [offset]);

  return (
    <View className="flex items-center justify-center h-full">
      <Animated.View
        style={animatedStyles}
        className="h-20 w-20 bg-rose-500 rounded-2xl"
      />
    </View>
  );
}
