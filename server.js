const express = require('express');
const path = require('path');
const app = express();
const proxy = require('http-proxy-middleware');
const cors = require('cors');
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(cors());
var target = "";
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

app.listen(process.env.PORT || 3000);