module.exports = api => {
  api.cache(false);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      'nativewind/babel',
      'react-native-paper/babel',
      'react-native-reanimated/plugin',
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          blacklist: null, // DEPRECATED
          whitelist: null, // DEPRECATED
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            '@/components': './components',
            '@/screens': './screens',
            '@/hooks': './hooks',
            '@/apis': './apis',
            '@/provider': './provider',
            '@/store': './store',
            '@/assets': './assets',
            '@/types': './types',
          },
        },
      ],
    ],
  };
};
