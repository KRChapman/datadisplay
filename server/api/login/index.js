const express = require('express'),
  router = express.Router(),
  Users = require('./../../models/mongoose/users')


module.exports = function(){


  router.post('/signup', function(req,res){
   let user =  new Users({
      username: req.body.username,
      password: req.body.password
    });
    console.log('req.body', req.body);
    user.save().catch(e => {
      console.log('e', e);
    });
    res.send(user);
  })


  router.post('/login', async function (req, res) {
    
    try {
      const user = await Users.findByCredentials(req.body.password, req.body.username)
     
      res.send(user);
    } catch (error) {
      console.log('useruser', error.message);
      res.status(400).send();
    }
  })


  return router;
}