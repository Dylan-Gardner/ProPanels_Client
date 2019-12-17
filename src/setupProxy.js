const proxy = require('http-proxy-middleware');
const cors = require('cors');

module.exports = function(app) {
  app.use(cors());
  app.use(
    '/api',
    proxy({
      target: "http://localhost:3001",
      changeOrigin: true
    })
  );
}
