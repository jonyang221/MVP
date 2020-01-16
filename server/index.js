const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const db = require('../database/db.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/getList', (req, res) => {

  db.getInventory((err, results) => {
    if (err) {
      console.log('error occurred', err);
    } else {
      res.status(200).send(results).end();
    }
  });
});

app.post('/', (req, res) => {
  let details = req.body;

  db.addSneaker(details, (err, results) => {
    if (err) {
      console.log('error occurred', err);
      res.status(400).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.put('/', (req, res) => {
  let details = req.body;
  console.log(details);
  db.updateSneaker(details, (err, results) => {
    if (err) {
      console.log('error occurred', err);
      res.status(400).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.delete('/', (req, res) => {
  let details = req.body;
  console.log('Server delete request body', req.body);
  db.deleteSneaker(details, (err, results) => {
    if (err) {
      console.log('error occurred', err);
      res.status(400).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});


app.use(express.static('client/dist'));
app.listen(PORT, console.log(`Server started on port ${PORT} @ ${Date().toString().substring(0,24)}`));
db.mongoose.connect('mongodb://localhost/sneakerList', console.log('Sneakers database connected'));

