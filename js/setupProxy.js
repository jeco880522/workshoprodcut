const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/productos',
        createProxyMiddleware({
            target: 'https://github.com/jeco880522/workshoproduct',
            changeOrigin: true,
        })
    );
};