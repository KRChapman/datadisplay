const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongooose = require('mongoose');
const database = require('../db/mongodb');
const app = require('../app')(database);

const User = require('../models/mongoose/users');
// var dotenv = require('dotenv').config();


// dotenv.config();
const userOneId = new mongooose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  username: "Mike",
  password: "56what",
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
  }]
}
const setupDatabase = async () => {
 // await User.deleteMany();
  await new User(userOne).save();
}


beforeEach(setupDatabase)

it('should display subjects', ()=> {
  return request(app)
    .get('/viewMDB')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200);
})


// it('should should return docs', ()=> {
//   return request(app)
//   .get('/viewMDB/default')
//   .expect(200);
// })