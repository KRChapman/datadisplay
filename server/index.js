const axios = require('axios');

const express = require('express');


const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  //  res.redirect('/api/hello');
  console.log('hello');
});


app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
