const express = require('express');

const app = express();
const port = 3006;

const parser = require('body-parser');
const models = require('./models/index.js');

// const db = require('../db');
// const db = require('../cassandra');


app.use(parser.json());
app.use(express.static(`${__dirname}/../public`));

app.get('/api/houses', (req, res) => {
  models.getHouses((err, results) => {
    try {
      res.send(results);
    } catch (err) {
      console.error(err);
    }
  });
});

app.use('/api/test/:id', async (req, res) => {
  const { id } = req.params.id;
  const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  res.send(rows[0]);
});

app.get('/api/houses/:id', (req, res) => {
  models.getHouseById(req.params.id, (err, results) => {
    try {
      res.send(results);
    } catch (err) {
      console.error(err);
    }
  });
});

app.get('/api/users', (req, res) => {
  models.getUsers((err, results) => {
    try {
      res.send(results);
    } catch (err) {
      console.error(err);
    }
  });
});

app.post('/api/houses', (req, res) => {
  models.saveHouse(req.body.id, req.body.name, req.body.initialPrice, req.body.cleaning, req.body.service, req.body.taxes, req.body.availableDates, req.body.pricePerGuest);
  res.end('Worked');
});

app.post('/api/users', (req, res) => {
  models.saveUser(req.body.name);
  res.end('Worked');
});

app.put('/api/users/:house', (req, res) => {
  models.saveHotelToUser(req.body.name, req.params.house, req.body.totalPrice);
  res.end('worked');
});

app.listen(port, () => { console.log(`Listening on port ${port}!`); });

// changed
