const axios = require('axios');
const SubjectData = require('./models/mongodb/index.js');
const express = require('express');
const initializeDatabases = require('./db/mongodb');
const routesAPI = require('./api/routes');
var bodyParser = require('body-parser');
//console.log("s",mdb);
const app = express();
const port = process.env.PORT || 5000;

const mongoose = require('./db/mongoose');
const Users = require('./models/mongoose/users')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  //  res.redirect('/api/hello');
  // let a = production();
  // console.log("db", a);
  Users.create({ username: 'small' }, function (err, small) {

   // if (err) return handleError(err);
    if (err) console.log('create errerr', err);

    console.log('hello', small);
  });
  
});


app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});



// app.listen(port, () => console.log(`Listening on port ${port}`));


// MONGODB
initializeDatabases().then(dbs => {
  // Initialize the application once database connections are ready.
  routesAPI(app, dbs).listen(port, () => console.log(`Listening on port ${port}`))
}).catch(err => {
  console.error('Failed to make all database connections!')
  console.error(err)
  process.exit(1)
})

const jwt = require('jsonwebtoken');


// const myFunction = async () => {
//  const token = jwt.sign({}, "string")
// }

// myFunction();