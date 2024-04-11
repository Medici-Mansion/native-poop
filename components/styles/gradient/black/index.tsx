import React, { PropsWithChildren } from 'react';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';

interface GradientBlackProps extends PropsWithChildren<LinearGradientProps> {}

const GradientBlack = ({ children, ...rest }: GradientBlackProps) => {
  const { colors, ...props } = rest;
  return (
    <LinearGradient
      colors={colors ?? ['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
      {...props}>
      {children}
    </LinearGradient>
  );
};

export default GradientBlack;
