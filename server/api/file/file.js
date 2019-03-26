const express = require('express'),
      router = express.Router();

const fs = require('fs');


module.exports = function() {

  router.get('/viewfile', (req, res) => {
   
    try {
      var notes = fs.readFileSync(__dirname + '/test-data.json');
      notes = JSON.parse(notes);

      let listOfSubjcts = [...new Set(notes.map(x => x.subject))]

      console.log('JSON.', listOfSubjcts);
      res.json(listOfSubjcts);

    } catch (e) {
      console.log('e', e);
    }
  })

  router.get('/viewfile/:subject', (req, res) => {
    let subject = req.params.subject;
    // syncranous version so need try catch incase of error
    // there is a asynchronous version readSync('/path', callback)
    try {
      var notes = fs.readFileSync(__dirname +'/test-data.json');
     notes = JSON.parse(notes);
   //   notes = JSON.stringify(notes);
    //  console.log('JSON.parse(notes)', notes);
    let data = notes.filter(ele => {
      return ele.subject === subject;
    })
      res.json(data);
    
    } catch (e) {
      console.log('e', e);
    }
  })
  
  router.post('/createfile', (req,res)=> {
   
   let incData = req.body;

    fs.readFile(__dirname + '/test-data.json', function (err, data) {
     
      var json = JSON.parse(data);
      let _id = Math.floor(Math.random() * Math.floor(999999))
      incData["_id"] = _id;
      let userData = [...json, incData ];
      console.log('userData', userData);
     // json.push('search result: ' + currentSearchResult);
      //json[incData.t] = incData;
      try {
        fs.writeFileSync(__dirname + '/test-data.json', JSON.stringify(userData));
        res.json(incData);
      } catch (error) {
        console.log('error', error);
      }

   
    
    })

  })

  router.post('/updatefile', (req, res) => {
    fs.readFile(__dirname + '/test-data.json', function (err, data) {
      const { _id, subject, title, listItems } = req.body;
      let newData = JSON.parse(data);

      let found = newData.findIndex(function (element,i) {
        return element._id = _id;
      });
      newData[found].subject = subject;
      newData[found].title = title;
      newData[found].listItems = listItems
    
      console.log('newData', newData);
      let dataforFile = JSON.stringify(newData);
      try {
        fs.writeFileSync(__dirname + '/test-data.json', dataforFile);
        res.json(newData[found]);
      } catch (error) {
        console.log('error', error);
      }
    });
  })

  router.get('/deletefile/:id', (req,res) => {

    let id = req.params.id;
    fs.readFile(__dirname + '/test-data.json', function (err, data) {

      let parsedData = JSON.parse(data);
      let index = parsedData.findIndex(ele => {
        return ele._id === id;
      })
      parsedData.splice(index, 1);
      console.log('delete', parsedData);
      try {
        fs.writeFileSync(__dirname + '/test-data.json', JSON.stringify(parsedData));
        res.json(parsedData);
      } catch (error) {
        console.log('error', error);
      }
    })
  });

  return router;
}
