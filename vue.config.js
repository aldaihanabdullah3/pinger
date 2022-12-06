// Import the `proxy.config.js` file
const proxyConfig = require('./proxy.config.js');
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: { proxy: proxyConfig},
})
