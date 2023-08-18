const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/users',
    createProxyMiddleware({
      target: 'http://10.0.132.252:8000',
      changeOrigin: false,
    })
  );
};