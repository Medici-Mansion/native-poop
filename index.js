/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { Router } from '@/router';
import { STORYBOOK_ENABLED } from '@env';
let AppEntryPoint = Router;

console.log(STORYBOOK_ENABLED);
if (STORYBOOK_ENABLED === 'true') {
  AppEntryPoint = require('./.storybook').default;
}

AppRegistry.registerComponent(appName, () => AppEntryPoint);
