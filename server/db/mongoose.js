var mongoose = require('mongoose');



let url;
if (process.env.NODE_ENV === 'test'){
   url = process.env.MONGODB_URL;
}
else{
  const dbName = process.env.MONGODB_DB || 'mdbMessAround';
   url = process.env.MONGODB_URI || `mongodb://localhost:27017/`
  url = url + dbName;
}

console.log('process.env.JWT_SECRETAAAASSSSSS', process.env.MONGODB_DB );
mongoose.Promise = global.Promise;
// let urlConst = `mongodb://localhost:27017/mdbMessAround`
mongoose.connect(url, 
  { useNewUrlParser: true, useCreateIndex: true, }, function (error) {
  if (error) {
    console.log("error", error);
  }
}, )
// mongoose.connect('mongodb://localhost:27017/VotingApp');

//module.exports = { mongoose };