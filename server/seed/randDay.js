const moment = require('moment');

const dateArray = [];

const generateDate = () => {
  const randNumber = Math.ceil(Math.random() * 12);
  const daysInMonth = moment().month(moment().month() + randNumber).daysInMonth();
  const day = moment().date();
  let randDay;

  if (randNumber === 0) {
    randDay = Math.ceil(Math.random() * (daysInMonth - day) + day);
  } else {
    randDay = Math.ceil(Math.random() * daysInMonth);
  }


  const randYear = moment().month(moment().month() + randNumber).format('YYYY');
  const randMonth = moment().month(moment().month() + randNumber).format('M');

  return `${randMonth}-${randDay}-${randYear}`;
};


const generateArray = async () => {
  let dates = '';
  const randomDate = Math.floor(Math.random() * 50 + 25);
  for (let i = 0; i < randomDate; i++) {
    dates += i !== randomDate - 1 ? `${generateDate()},` : `${generateDate()}`;
  }
  await dateArray.push(dates);
};


module.exports.generateDate = generateDate;
module.exports.dateArray = dateArray;
module.exports.generateArray = generateArray;
