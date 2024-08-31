module.exports = {
  //presets: ['module:@react-native/babel-preset'],
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          '@': './src', // src 경로에 대한 별칭 설정
          //'@env': './env.d.ts', // @env 모듈에 대한 경로 설정
        },
      },
    ],
  ],
};
