// Import the `createProxyMiddleware()` function from the `http-proxy-middleware` package
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  // Define the proxy configuration for the server
  '/api': {
    target: 'http://localhost:3000', // Set the target server
    changeOrigin: true, // Set the "changeOrigin" option to true
    onProxyReq(proxyReq) {
      // Add the CORS headers to the server's response
      proxyReq.setHeader('Access-Control-Allow-Origin', '*');
      proxyReq.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      proxyReq.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    },
  },
};
