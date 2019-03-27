const express = require('express');
const initializeDatabases = require('./db/mongodb');
const routesAPI = require('./api/routes');
var bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const mongoose = require('./db/mongoose');
const Users = require('./models/mongoose/users');

// app.use((req,res, next) =>{
//   console.log('req.method req.path', req.method, req.path);
//   next();
// })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
console.log('Users', Users);
  Users.create({ username: 'small', password: 'hi' }, function (err, small) {

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

