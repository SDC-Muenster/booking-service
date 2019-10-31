const mongoose = require('mongoose');

const connect = mongoose.connect('mongodb://localhost/booking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const hotelSchema = mongoose.Schema({
  id: Number,
  name: String,
  initialPrice: Number,
  cleaning: Number,
  service: Number,
  taxes: Number,
  unavailable_dates: Array,
  price_per_guest: Object,
});

const userSchema = mongoose.Schema({
  name: String,
  booked_hotels: [{ hotel: hotelSchema, totalPrice: Number }],
});

const Hotel = mongoose.model('Hotel', hotelSchema);
const User = mongoose.model('User', userSchema);

const getHouses = (callback) => {
  Hotel.find({}, (err, docs) => {
    callback(err, docs);
  });
};

const getHouseById = (id, callback) => {
  Hotel.find({ id }, (err, docs) => {
    callback(err, docs);
  });
};

const getUsers = (callback) => {
  User.find({}, (err, docs) => {
    callback(err, docs);
  });
};

// right now, we're just posting the dates that are unavailable when someone books a house since there's currently no authentication


const saveHouse = (id, name, initialPrice, cleaning, service, taxes, unavailableDates, pricePerGuest) => {
  const hotel = new Hotel({
    id, name, initialPrice, cleaning, service, taxes, unavailable_dates: unavailableDates, price_per_guest: pricePerGuest,
  });

  hotel.save((err) => {
    if (!err) {
      // eslint-disable-next-line
      console.log('success');
    } else {
      console.log('failed');
    }
  });
};

const saveUser = (name) => {
  const user = new User({ name, booked_hotels: [] });

  user.save((err) => {
    if (!err) {
      console.log('saved new user without hotel');
    }
  });
};

const saveHotelToUser = (userName, houseName, totalPrice) => {
  Hotel.find({ name: houseName }, (err, docs) => {
    if (!err) {
      console.log('success');
    }
    User.updateOne({ name: userName }, { $push: { booked_hotels: { hotel: docs, totalPrice } } }, (err, res) => {
      if (!err) {
        console.log('success');
      }
    });
  });
};


const deleteHouse = (id, callback) => {
  Hotel.deleteMany({ id }, (err, result) => {
    if (err) {
      callback(err);
    }

    console.log('Succesful Deletion', result);
    callback(null);
  });
};


const updateHouse = (id, { name, initialPrice, cleaning, service, taxes, price_per_guest, unavailable_dates }, callback) => {
  //omitUndefined set to true, so if some of the values are undefined, then keep what is already stored in database
  Hotel.update({id}, {name, initialPrice, cleaning, service, taxes, price_per_guest, unavailable_dates}, { omitUndefined: true }, (err, result) => {
    if (err) {
      callback(err, null);
    }
    console.log('Document updated', result);
    callback(null, result);
  })
}

module.exports.getUsers = getUsers;
module.exports.saveHotelToUser = saveHotelToUser;
module.exports.saveUser = saveUser;
module.exports.getHouses = getHouses;
module.exports.getHouseById = getHouseById;
module.exports.saveHouse = saveHouse;
module.exports.deleteHouse = deleteHouse;
module.exports.updateHouse = updateHouse;

// changed
