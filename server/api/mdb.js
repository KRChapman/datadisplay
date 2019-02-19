// const express = require('express'),
//   router = express.Router();




module.exports = function (app, dbs) {
  let userData = "userData"
  app.post('/createMDB', (req, res) => {
  //  console.log("reqreq", req.body);
    dbs.production.collection(userData).insertOne(req.body,(err, docs) => {
      if (err) {
        console.log(err)
        res.error(err)
      } else {
        res.json(docs.ops[0])
      }
    })
  })

  app.get('/viewMDB', (req, res) => {
    console.log('/viewMDB', req.params.user);
    let username = req.params.user;
    dbs.production.collection(userData).distinct("user").then((docs) => {
      //  console.log("docs", docs);
      res.json(docs);
    }).catch(error => {
      console.log("errvewMDB", error);
    })
  })

  app.get('/viewMDB/:user', (req,res) =>{
    console.log('/viewMDB',req.params.user);
    let username = req.params.user;
    dbs.production.collection(userData).find({ user: username }).toArray().then((docs) =>{

        res.json(docs);
  
    }).catch(error =>{
      console.log("errvewMDB", error);
    })
  })


  return app
}