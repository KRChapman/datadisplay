var mongoose = require('mongoose');
const dbName = 'mdbMessAround';
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/${dbName}`, 
  { useNewUrlParser: true, useCreateIndex: true, }, function (error) {
  if (error) {
    console.log("error", error);
  }
}, )
// mongoose.connect('mongodb://localhost:27017/VotingApp');

module.exports = { mongoose };