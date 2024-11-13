// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Customize the Metro bundler to handle SVG files with react-native-svg-transformer
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts.push('svg');

// Add the transformer for SCSS files
config.transformer.babelTransformerPath = require.resolve('react-native-sass-transformer');
config.resolver.sourceExts.push('scss');

module.exports = config;
