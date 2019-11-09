const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'bookings' });


client.connect()
  .then(() => console.log('Connected!'))
  .catch((err) => console.error(err));


const query = 'INSERT INTO hotels (id, cleaning, initialPrice, name, services, taxes, unavailable_dates) VALUES (?, ?, ?, ?, ?, ?, ?)';
const params = ['1', 2, 19, 'JAMES HOUSE', 20, 30, '10-15-2019,10-15-2019'];
client.execute(query, params, { prepare: true });
