const axios = require('axios');
const UserData = require('./models/mongodb/index.js');
const express = require('express');
const initializeDatabases = require('./db/mongodb');
const routesAPI = require('./api/mdb');
var bodyParser = require('body-parser');
//console.log("s",mdb);
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  //  res.redirect('/api/hello');
  // let a = production();
  // console.log("db", a);

  console.log('hello');
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