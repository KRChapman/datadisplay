const express = require('express'),

      Mdb = require('./mdb/index'),
      file = require('./file/file'),
      user = require('./users/index');
module.exports = function(app,db) {
  // app and db passed in from app.js routesAPI() to .listen
  let mdb = Mdb(db);
  let files = file();
  let users = user();
  app.use('/file', files);
  app.use('/mdb', mdb);
  app.use('/users', users);
  
  app.use(function (err, req, res, next) {

    res.status(err.status || 500).send(err.message);

  });
   return app;
}