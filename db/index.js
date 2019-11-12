const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'james',
  host: 'localhost',
  database: 'bookings',
  password: '123',
  port: '5432',
});

const client = new Client();


const getHouseById = (id, callback) => {
  pool.query(`SELECT * FROM hotels where id = ${id}`, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const insertHouse = ({
  name, initialPrice, cleaning, services, taxes, unavailable_dates,
}, callback) => {
  pool.query('INSERT INTO hotels (name, initialPrice, cleaning, services, taxes, unavailable_dates) VALUES ($1, $2, $3, $4, $5, $6)', [name, initialPrice, cleaning, services, taxes, unavailable_dates], (err, results) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      console.log(results);
      callback(null, results);
    }
  });
};


const updateHouse = (id, {
  name, initialPrice, cleaning, services, taxes, unavailable_dates,
}, callback) => {
  pool.query('UPDATE hotels set name = $1, initialPrice = $2, cleaning = $3, services = $4, taxes = $5, unavailable_dates = $6 where id = $7', [name, initialPrice, cleaning, services, taxes, unavailable_dates, id], (err, results) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const deleteHouse = (id, callback) => {
  pool.query('DELETE FROM hotels WHERE id = $1', [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  getHouseById,
  insertHouse,
  updateHouse,
  deleteHouse,
};
