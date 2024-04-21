import { PropsWithChildren, Children } from 'react';
import { View } from 'react-native';

const SignupFunnel = ({
  children,
  step,
}: PropsWithChildren<{ step: number }>) => {
  const childList = Children.toArray(children)
    .slice(0, step + 1)
    .reverse();
  return <View className="space-y-5">{childList}</View>;
};

export default SignupFunnel;
