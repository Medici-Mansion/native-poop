import React, { PropsWithChildren } from 'react';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';

interface GradientBlackProps extends PropsWithChildren<LinearGradientProps> {}

const GradientOrange = ({ children, ...rest }: GradientBlackProps) => {
  const { colors, ...props } = rest;
  return (
    <LinearGradient
      colors={colors ?? ['rgba(255,106,22,1)', 'rgba(255,223,111,1)']}
      {...props}>
      {children}
    </LinearGradient>
  );
};

export default GradientOrange;
