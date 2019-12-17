const proxy = require('http-proxy-middleware');
const cors = require('cors');

module.exports = function(app) {
  app.use(cors());
  var taregt = "";
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    target = "http://localhost:3001"
  } else {
    target = "https://productivity-panel-api.herokuapp.com";
}
  app.use(
    '/api',
    proxy({
      target: target,
      changeOrigin: true
    })
  );
}
