module.exports = function(api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo', 'module:react-native-dotenv'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            components: './components',
            store: './utils/store.ts',
            screens: './screens',
            assets: './assets',
            types: './types',
            utils: './utils',
            constants: './constants',
          },
        },
      ],
    ],
  };
};
