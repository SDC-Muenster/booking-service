const express = require('express');

const app = express();
const port = 3006;

const parser = require('body-parser');
const models = require('../db/index.js');

// const db = require('../db');
// const db = require('../cassandra');


app.use(parser.json());
app.use(express.static(`${__dirname}/../public`));


app.get('/api/houses/:id', (req, res) => {
  models.getHouseById(req.params.id, (err, results) => {
    try {
      results.rows[0].unavailable_dates = results.rows[0].unavailable_dates.split(',');
      res.send(results);
    } catch (err) {
      console.error(err);
    }
  });
});


app.post('/api/houses', (req, res) => {
  models.insertHouse(req.body, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Successful');
    }
  });
});


app.delete('/api/houses/:id', (req, res) => {
  models.deleteHouse(req.params.id, (err) => {
    if (err) {
      res.send('Error occured deleting id');
    }
    res.status(202).end();
  });
});

app.put('/api/houses/:id', (req, res) => {
  models.updateHouse(req.params.id, req.body, (err, results) => {
    if (err) {
      res.status(500).send('Error updating user');
    }
    res.status(201).end();
  });
});

app.listen(port, () => { console.log(`Listening on port ${port}!`); });

// changed
