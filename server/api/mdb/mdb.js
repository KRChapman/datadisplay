// const express = require('express'),
//   router = express.Router();

const {ObjectID} = require('mongodb');


module.exports = function (app, dbs) {
  let subjectData = "subjectData"
  app.post('/createMDB', (req, res) => {
  //  console.log("reqreq", req.body);
    dbs.production.collection(subjectData).insertOne(req.body,(err, docs) => {
      if (err) {
        console.log(err)
        res.error(err)
      } else {
        res.json(docs.ops[0])
      }
    })
  })

  app.get('/viewMDB', (req, res) => {

    let subjectname = req.params.subject;
    dbs.production.collection(subjectData).distinct("subject").then((docs) => {

      res.json(docs);
    }).catch(error => {
      console.log("errvewMDB", error);
    })
  })

  app.get('/viewMDB/:subject', (req,res) =>{

    let subjectname = req.params.subject;
    dbs.production.collection(subjectData).find({ subject: subjectname }).toArray().then((docs) =>{

        res.json(docs);
  
    }).catch(error =>{
      console.log("errvewMDB", error);
    })
  })

  app.get('/delete/:id', (req, res) =>{
    let id = req.params.id;
   // "_id"
    dbs.production.collection(subjectData).deleteOne({ _id: ObjectID(id)  });

  })

  app.post('/updatefile',(req, res) => {
    console.log("req.body", req.body);
    const {_id, subject, title, listItems} = req.body;
    dbs.production.collection(subjectData).findOneAndUpdate({ _id: ObjectID(_id) }, 
    { $set: { subject: subject, title: title, listItems: listItems }
      }, { returnOriginal: false})
    .then((doc) => {
      res.json(doc.value);
      console.log('docdoc', doc );
    }) 
  })

  return app
}