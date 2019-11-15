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
            store: './components/StoreProvider/store.ts',
            screens: './screens',
            constants: './constants',
          },
        },
      ],
    ],
  };
};
