const express = require('express'),
      router = express.Router();
const {ObjectID} = require('mongodb');
let mdbController = require('./mdbController');
  const auth = require('./../../middleware/auth');

module.exports = function (dbs) {
  mdbController = mdbController(dbs);

  let subjectData = "subjectData"
  router.post('/createMDB', (req, res) => {
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

   // view subjects for subject button selection
  router.get('/viewMDB', auth, mdbController.getAllSubjects)

    // view data for each subject in card
  router.get('/viewMDB/:subject', mdbController.getIndividualSubjectData)

  router.get('/deleteMDB/:id', (req, res) =>{
    let id = req.params.id;
   // "_id"
    dbs.production.collection(subjectData).deleteOne({ _id: ObjectID(id)  });

  })

  router.post('/updateMDB',(req, res) => {

    const {_id, subject, title, listItems} = req.body;
    dbs.production.collection(subjectData).findOneAndUpdate({ _id: ObjectID(_id) }, 
    { $set: { subject: subject, title: title, listItems: listItems }
      }, { returnOriginal: false})
    .then((doc) => {
      res.json(doc.value);

    }) 
  })



 
 return router;
} 