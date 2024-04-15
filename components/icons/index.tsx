import React from 'react';
import { SvgProps } from 'react-native-svg';
import * as Icons from '@/assets/icons/svgs';

type IconProps = SvgProps & {
  name: keyof typeof Icons;
  size?: number;
  onPress?: () => void;
};
const Icon = ({ name, size, onPress, ...rest }: IconProps) => {
  const SvgIcon = Icons[name];

  const width = size;
  const height = size;

  const sizeProps = {
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  return <SvgIcon {...rest} {...sizeProps} onPress={onPress} />;
};

export default Icon;
