const express = require('express');

const app = express();
const port = 3006;

const parser = require('body-parser');
const models = require('./models/index.js');


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
