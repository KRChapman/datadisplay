const express = require('express'),
  router = express.Router(),
  auth = require('./../../middleware/auth');
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

  router.get('/a', (req,res)=> {
   // console.log('req.body', req.body);
    res.send(req.body);
  })

  router.post('/login', async function (req, res) {
    
    try {
      const user = await Users.findByCredentials(req.body.password, req.body.username)
      const token = await user.generateAuthToken();
      res.send({ user: user.getPublicProfile(), token});
    } catch (error) {
      console.log('useruser', error.message);
      res.status(400).send();
    }
  })
   // return user from auth
  router.post('/logout', auth, async function (req, res) {

    try {
      req.user.tokens = req.user.tokens.filter((t) => {
        // only leave tokens from other  devices/ logins in returned array
        return t.token !== req.token;
      })
      await req.user.save();
      res.send();
    } catch (error) {
      console.log('token', error.message);
      res.status(500).send();
    }
  })
                      // return user from auth
  router.post('/logoutall', auth, async function (req, res) {
//.length 
    try {
       req.user.tokens= []
   //   req.user.tokens.length  = 0;
      await req.user.save();
      res.send();
    } catch (error) {
      console.log('token', error.message);
      res.status(500).send();
    }
  })



  return router;
}