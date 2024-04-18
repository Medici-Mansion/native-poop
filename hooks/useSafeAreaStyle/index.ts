import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useSafeAreaStyle = () => {
  const insets = useSafeAreaInsets();

  return {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };
};
