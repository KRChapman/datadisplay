const axios = require('axios');

const express = require('express');
const initializeDatabases = require('./db/mongodb');
const routesAPI = require('./api/routes');
var bodyParser = require('body-parser');
//console.log("s",mdb);
const app = express();
const port = process.env.PORT || 5000;