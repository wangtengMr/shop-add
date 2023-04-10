const { defineConfig } = require('@vue/cli-service');
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  configureWebpack: {
    plugins: [new WindiCSSWebpackPlugin()]
  }
});
