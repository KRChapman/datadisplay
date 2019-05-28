var dotenv = require('dotenv');
var path = require('path');
// console.log("NODE_ENV=development", process.env.NODE_ENV);
// let env = process.env.ENVIRONMENT || 'dev'
if (process.env.NODE_ENV !== 'test'){
  var env = 'dev';
  dotenv.config({ path: path.resolve(__dirname, `./../config/.env.${env}`) });
}

// set ENVIRONMENT = test &&
const port = process.env.PORT || 5000;
const initializeDatabases = require('./db/mongodb');
const app = require('./app');
//NEEDED FOR MONGOOSE TO WORK IN THIS FILE EVEN THOUGH VARIABLE IS NOT USED






// console.log('process.env.JWT_SECRET', process.env.ENVIRONMENT);
// console.log('process.env.NODE_ENV', process.env.NODE_ENV);

// let env = process.env.ENVIRONMENT || 'dev'
// dotenv.config({ path: path.resolve(__dirname, `./../config/${env}.env`) });
console.log('process.env.JWT_SECRET', process.env.JWT_SECRET);



// app.listen(port, () => console.log(`Listening on port ${port}`));


// MONGODB
initializeDatabases().then(dbs => {
  // Initialize the application once database connections are ready.
  app(dbs).listen(port, () => console.log(`Listening on port ${port}`))
}).catch(err => {
  console.error('Failed to make all database connections!')
  console.error(err)
  process.exit(1)
})

