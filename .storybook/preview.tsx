import React from 'react';
import type { Preview } from '@storybook/react';
import { View } from 'react-native';
import { theme } from '../theme';

const preview: Preview = {
  decorators: [
    Story => (
      <View
        style={{ padding: 8, flex: 1, backgroundColor: theme.colors.black }}>
        <Story />
      </View>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
