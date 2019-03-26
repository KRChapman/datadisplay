const express = require('express'),

      Mdb = require('./mdb/index'),
      file = require('./file/file'),
      login = require('./login/index')
module.exports = function(app,db) {
  // app and db passed in from app.js routesAPI() to .listen
  let mdb = Mdb(db);
  let files = file();
  let log = login();
  app.use('/file', files);
  app.use('/mdb', mdb);
  app.use('/users', log);
  
  app.use(function (err, req, res, next) {

    res.status(err.status || 500).send(err.message);

  });
   return app;
}