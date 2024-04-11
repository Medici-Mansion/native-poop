import AsyncStorage from '@react-native-async-storage/async-storage';
import { view } from './storybook.requires';
import { init } from '../bootstrap';
import SplashScreen from 'react-native-splash-screen';

const StorybookUIRoot = view.getStorybookUI({
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  },
  shouldPersistSelection: true,
});

init();
SplashScreen.hide();
export default StorybookUIRoot;
