const faker = require('faker');


const generateDate = () => {
  const randomNumberOfDates = Math.floor(Math.random() * 50 + 25);
  let dates = '';
  for (let i = 0; i < randomNumberOfDates; i++) {
    const randomDate = JSON.stringify(faker.date.soon(100)).slice(0, 11);
    const dateString = `${randomDate.slice(6, 8)}-${randomDate.slice(10, 12)}-${randomDate.slice(1, 5)}`;
    dates += i !== randomNumberOfDates - 1 ? `${dateString},` : `${dateString}`;
  }
  return dates;
};


// console.log(generateDate());

module.exports = {
  generateDate,
};
