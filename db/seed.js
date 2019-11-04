const faker = require('faker');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();
const fs = require('fs');
const generator = require('../server/seed/randDay.js');

const seed = () => {
  const name = `${faker.lorem.word()} House`;

  // const pricePerGuest = {};
  // let dates = '';
  // const randomDate = Math.floor(Math.random() * 50 + 25);
  // for (let i = 0; i < randomDate; i++) {
  //   dates += i !== randomDate - 1 ? `${generator.generateDate()},` : `${generator.generateDate()}`;
  // }

  // pricePerGuest.adult = (Math.floor(Math.random() * 200) + 50);
  // pricePerGuest.child = (Math.floor(Math.random() * 200) + 50);
  // pricePerGuest.infant = Math.floor(Math.random() * 75);
  const initialPrice = Math.floor(Math.random() * 300 + 100);
  const cleaning = Math.floor(Math.random() * 50);
  const services = Math.floor(Math.random() * 50);
  const taxes = Math.floor(Math.random() * 70);

  generator.generateArray();

  return {
    name, initialPrice, cleaning, services, taxes, unavailable_dates: generator.dateArray.pop(),
  };
};

writer.pipe(fs.createWriteStream(`${__dirname}/house.csv`));

let i = 10000000;
function write() {
  let ok = true;
  do {
    i -= 1;
    if (i === 0) {
      writer.write(seed());
      console.log('done writing');
      writer.end();
      console.timeEnd('write');
    } else {
      ok = writer.write(seed());
    }
  } while (i > 0 && ok);
  if (i > 0) {
    writer.once('drain', write);
  }
}
console.time('write');
write();
// seed();
