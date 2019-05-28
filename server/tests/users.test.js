const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongooose = require('mongoose');
const app = require('./../app')();
const Users = require('./../models/mongoose/users');
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
  await Users.deleteMany();
 
    await new Users(userOne).save();

}


beforeEach(setupDatabase);
afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});
it('should signup new user', () => {
 
})


test('equal', ()=> {
 
  expect('a').toBe('a')
})


test('should signup user and return token', ()=>{
  return request(app)
        .post('/users/signup')
        .send({
          "username": 'hi',
          "password": 'aa'
        }).expect(200)
        //RETURN THE TOKEN NEXT
})

test('should ', async () => {

  let response = await request(app)
    .get('/users/a')
    .send({
      "username": 'hi',
      "password": 'aa'
    })
     .expect(200)

     console.log('response', response.body);
})



// test()