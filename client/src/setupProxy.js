// https://stackoverflow.com/questions/52605997/when-specified-proxy-in-package-json-must-be-a-string
const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/file/**',
    { target: 'http://localhost:5000/' }
  ));
  app.use(proxy('/mdb/**',
    { target: 'http://localhost:5000/' }
  ));
  app.use(proxy('/users/**',
    { target: 'http://localhost:5000/' }
  ));
}