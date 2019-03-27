const express = require('express'),
  router = express.Router(),
  Users = require('./../../models/mongoose/users');



module.exports = function(){


  router.post('/signup',  function(req,res){
    
    let user =  new Users({
      username: req.body.username,
      password: req.body.password
    });

    // chain with promise not using async await    
     user.save().then((u) => {
    // return user the get token


      return u.generateAuthToken();
    }, e =>{
      console.log('eooo', e);
    }).then(token => {      
      res.send({user,token});
     }).catch(e => {
       console.log('signupee', e);
      res.status(400).send(e)
     });
 
    
  })


  router.post('/login', async function (req, res) {
    
    try {
      const user = await Users.findByCredentials(req.body.password, req.body.username)
      const token = await user.generateAuthToken();
      res.send({user, token});
    } catch (error) {
      console.log('useruser', error.message);
      res.status(400).send();
    }
  })


  return router;
}