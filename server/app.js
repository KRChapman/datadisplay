const express = require('express');

      bodyParser = require('body-parser'),

      app = express(),
      Mdb = require('./api/mdb/index'),
      file = require('./api/file/file'),
      user = require('./api/users/index');
require('./db/mongoose');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
 // console.log('Users', Users);

  res.send({ h: "hi" });
});


app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

module.exports = function (db) {

  // db passed in from index.js to .listen
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